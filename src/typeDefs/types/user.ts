import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    type: userType
    categories: [Category]
    image: String
    deleted: Boolean
  }
`;
