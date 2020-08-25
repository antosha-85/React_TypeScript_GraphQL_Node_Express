import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";
import { ObjectId } from "mongodb";


export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      // throw new Error('Error')
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      // throw new Error('failed to delete!')
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteResult.value) {
        throw new Error("failed to delete listing");
      }
      return deleteResult.value;
    },
  },
  Listing: {
    title: (listing: Listing) => listing.title,
    image: (listing: Listing) => listing.image,
    id: (listing: Listing): string => listing._id.toString(),
  },
};
