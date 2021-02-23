import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getOrdersByCategory(
      id: ID!
      text: String!
      pagination: Pagination!
    ): Orders!
    getOrdersByUser(id: ID!, pagination: Pagination!): Orders!
    getMyOrders(pagination: Paginate!): Orders!
  }
`;
