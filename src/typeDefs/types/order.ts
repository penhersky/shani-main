import { gql } from 'apollo-server-express';

export default gql`
  type OrderLocation {
    name: String
    lat: String
    lng: String
  }

  input InputOrderLocation {
    name: String
    lat: String
    lng: String
  }

  type Order {
    id: ID!
    name: String!
    description: String
    price: String
    categories: [Category] @cacheControl(maxAge: 60000)
    comments: [Comment] @cacheControl(maxAge: 60000)
    requests: [Request] @cacheControl(maxAge: 60000)
    customer: User! @cacheControl(maxAge: 3600000)
    customerRating: Rating
    performer: User @cacheControl(maxAge: 1000)
    performerRating: Rating
    status: String
    time: String
    from: String
    to: String
    locationType: String
    location: OrderLocation
    visible: Boolean
    allowComments: Boolean
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
    location: InputOrderLocation
    allowComments: Boolean
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
    location: InputOrderLocation
    allowComments: Boolean
    visible: Boolean
    deleted: Boolean
  }
  input OrderInput {
    name: String!
    description: String
    price: String
    categories: [ID]!
    time: String
    from: String
    to: String
    locationType: String
    location: InputOrderLocation
    visible: Boolean
    allowComments: Boolean
  }
  type Orders {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    orders: [Order]
  }

  type OrderResult {
    result: result!
    status: Int
    order: Order
  }

  extend type Query {
    _getOrders(paginate: Paginate!): Orders!
    _getOrdersByTimeInterval: [Order]!
    _getOrder(id: ID!): Order!
  }
  extend type Mutation {
    _addOrder(id: ID!, order: CreateOrder!): Order!
    _deleteOrders(idArr: [ID!]!): Result!
    _updateOrder(id: ID!, order: UpdateOrder!): Category!
  }
`;
