import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    getOrdersByCategory(id: ID!): Orders! # -
    getOrdersByUser(id: ID!): Orders! # -
    searchOrders(text: String!): Orders! # -
    getMyOrders(pagination: Paginate): Orders!
  }
`;
