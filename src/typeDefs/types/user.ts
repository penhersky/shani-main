import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    type: userType
    firstName: String
    lastName: String
    middleName: String
    categories: [Category]
    image: String
  }
`;
