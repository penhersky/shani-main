import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    id: ID!
    name: String!
    requests: Request! # -
    visible: Boolean
    deleted: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateOrder {
    name: String!
  }
  input UpdateOrder {
    name: String!
    visible: Boolean
  }
  type Orders {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    orders: [Orders]
  }

  extend type Query {
    getOrdersByCategory(id: ID!): ID!
    _getOrders(paginate: Paginate!): Orders! # -
    _getOrder(id: ID!): Order! # -
  }
  extend type Mutation {
    _addOrder(id: ID!, order: CreateOrder!): Order! # -
    _deleteOrders(idArr: [ID!]!): Result! # -
    _updateOrder(id: ID!, order: UpdateOrder!): Category! # -
  }
`;
