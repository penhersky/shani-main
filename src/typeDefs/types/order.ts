import { gql } from 'apollo-server-express';

export default gql`
  type OrderLocation {
    name: String
    lat: String
    lng: String
  }

  input inputOrderLocation {
    name: String
    lat: String
    lng: String
  }

  type Order {
    id: ID!
    name: String!
    description: String
    price: String
    categories: [Category]
    comments: [Comment]
    requests: [Request]! # -
    customer: User!
    performer: User
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: OrderLocation
    visible: Boolean
    deleted: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateOrder {
    name: String!
    description: String
    price: String
    categories: [ID]
    customer: ID!
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: inputOrderLocation
    visible: Boolean
    deleted: Boolean
  }
  input UpdateOrder {
    name: String!
    description: String
    price: String
    categories: [ID]
    customer: ID!
    performer: ID
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: inputOrderLocation
    visible: Boolean
    deleted: Boolean
  }
  input OrderInput {
    name: String!
    description: String
    price: String
    categories: [ID]
    customer: ID!
    performer: ID
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: inputOrderLocation
    visible: Boolean
  }
  type Orders {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    orders: [Order]
  }

  extend type Query {
    _getOrders(paginate: Paginate!): Orders! # -
    _getOrder(id: ID!): Order! # -
  }
  extend type Mutation {
    _addOrder(id: ID!, order: CreateOrder!): Order! # -
    _deleteOrders(idArr: [ID!]!): Result! # -
    _updateOrder(id: ID!, order: UpdateOrder!): Category! # -
  }
`;
