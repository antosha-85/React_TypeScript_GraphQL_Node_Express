import { MongoClient } from "mongodb";
// require("dotenv").config();

const user = "antosha-85";
const userPassword = 'password';
const cluster = "cluster0.sekew";
const dbName = 'test_listings'
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net`;
export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("main");
  return {
    listings: db.collection("test_listings"),
  };
};
