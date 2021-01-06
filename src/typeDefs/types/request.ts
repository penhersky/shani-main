import { gql } from 'apollo-server-express';

export default gql`
  type Request {
    id: ID!
    user: User
    order: Order
    text: String
    price: String
    time: String
    visible: Boolean
    canceled: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateRequest {
    userId: String!
    orderId: String!
    text: String!
    price: String
    time: String
  }
  input CreatePerformerRequest {
    text: String!
    price: String
    time: String
    visible: Boolean
    canceled: Boolean
  }
  input UpdateRequest {
    text: String!
    price: String!
    time: String
    visible: Boolean
    canceled: Boolean
  }
  type Requests {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    requests: [Request]
  }

  extend type Query {
    getRequestByOrder(id: ID!): Requests! # -
    getMyRequest: Requests! # -
    _getRequests(paginate: Paginate!): Requests! # -
    _getRequest(id: ID!): Request! # -
  }
  extend type Mutation {
    createRequest(orderId: ID!, request: CreatePerformerRequest!): Request! # -
    cancelRequest(id: ID!): Result! # - only customer
    setVisibleRequest(id: ID!): Result! # - only owner
    deleteRequest(id: ID!): Result! # - only owner
    _addRequest(request: CreateRequest!): Request! # -
    _deleteRequests(idArr: [ID!]!): Result! # -
    _updateRequest(id: ID!, request: UpdateRequest!): Request! # -
  }
`;