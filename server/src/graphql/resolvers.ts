import { IResolvers } from "apollo-server-express";
import { Database } from "../lib/types";
import { ObjectId } from "mongodb";
export const resolvers: IResolvers = {
  Query: {
    listings: async (_root: undefined, _args: {}, { db }: { db: Database }) => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ) => {
      //   for (let i = 0; i < listings.length; i++) {
      //     if (listings[i].id === id) {
      //       return listings.splice(i, 1)[0];
      //     }
      //   }
      //   throw new Error("Failed to delete listing");
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(),
      });
    if(!deleteResult) {
        throw new Error('failed to delete listing')
    }
      return deleteResult.value
    },
  },
};
