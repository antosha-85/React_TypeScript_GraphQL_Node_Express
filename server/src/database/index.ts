import { MongoClient } from "mongodb";
import {Database, User, Listing, Booking} from '../lib/types'

const url = `mongodb+srv://${process.env.USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}.mongodb.net`;
export const connectDatabase = async ():Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("main");
  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>(`${process.env.DB_NAME}`),
    users: db.collection<User>('users'),
  };
};
