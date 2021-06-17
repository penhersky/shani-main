import { gql } from 'apollo-server-express';

export default gql`
  type Result {
    result: result!
    message: String
    status: Int
    redirectTo: String
  }
  type FormResult {
    result: result!
    status: Int!
    message: String
    redirectTo: String
    value: String
    fields: [String]
  }
`;
