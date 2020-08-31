import { IResolvers } from "apollo-server-express";
import { Google } from "../../../lib/api";
import { Viewer } from "../../../lib/types";
import { LogInArgs} from './types'
export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: ():string => {
      try {
        return Google.authUrl;
      } catch (err) {
        throw new Error(`Failed to query Google Auth Url: ${err}`);
      }
    },
  },
  Mutation: {
    logIn: (_root: undefined, {input}: LogInArgs) => {
      return "Mutation.logIn";
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
