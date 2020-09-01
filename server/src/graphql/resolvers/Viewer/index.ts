import crypto from "crypto";
import { IResolvers } from "apollo-server-express";
import { Google } from "../../../lib/api";
import { Viewer, Database, User } from "../../../lib/types";
import { LogInArgs } from "./types";

const logInViaGoodle = async (
  code: string,
  token: string,
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);
  if (!user) {
    throw new Error("Google login error");
  }
  //get list of Names/Photos/Emails
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;
  //get user display name from the first user
  const userName = userNamesList ? userNamesList[0].displayName : null;
  //get user Id
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;
  //get user Avatar
  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
  //get user's email
  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;
  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }
  const updateRes = await db.users.findOneAndUpdate({
    _id: userId,
    }, { $set: {
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      token,
    }},
    {returnOriginal: false})

    let viewer = updateRes.value

    if(!viewer) {
      const insertResult = await db.users.insertOne({
        _id: userId,
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
        income: 0,
        bookings: [],
        listings: []
      })
      viewer = insertResult.ops[0]
    }
    return viewer
};
export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (err) {
        throw new Error(`Failed to query Google Auth Url: ${err}`);
      }
    },
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db }: { db: Database }
    ):Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");
        const viewer: User | undefined = code
          ? await logInViaGoodle(code, token, db)
          : undefined;
        if (!viewer) {
          return { didRequest: true };
        }
        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (err) {
        throw new Error(`Failed to login: ${err}`);
      }
    },
    logOut: () => {
      return "Mutation.logOut";
    },
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
