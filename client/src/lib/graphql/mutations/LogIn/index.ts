import { gql } from "apollo-boost";

export const LOG_In = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
