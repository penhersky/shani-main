import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    id: ID!
    name: String!
    requests: Request! # -
    description: string
    price: String
    categories: [Category]
    customer: User!
    performer: User
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: {
      name: String
      lat: String
      lng: String
    }
    visible: Boolean
    deleted: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateOrder {
    name: String!
    description: string
    price: String
    categories: [ID]
    customer: ID!
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: {
      name: String
      lat: String
      lng: String
    }
    visible: Boolean
    deleted: Boolean
  }
  input UpdateOrder {
    name: String!
    description: string
    price: String
    categories: [ID]
    customer: ID!
    performer: UD
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: {
      name: String
      lat: String
      lng: String
    }
    visible: Boolean
    deleted: Boolean
  }
  input OrderInput {
    name: String!
    description: string
    price: String
    categories: [ID]
    customer: ID!
    performer: UD
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: {
      name: String
      lat: String
      lng: String
    }
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
