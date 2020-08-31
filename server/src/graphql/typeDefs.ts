import { gql } from "apollo-server-express";

export const typeDefs = gql`
  # person who's viewing our site, only didRequest is optional because we can see information without being logged in
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: boolean
    didRequest: boolean!
  }
  # create a new input object to contain a required code
  input LogInInput {
    code: String!
  }

  type Query {
    authUrl: String!
  }
  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`;
