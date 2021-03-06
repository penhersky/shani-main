import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createOrder(order: OrderInput!, images: [InputOrderImage]): OrderResult!
    updateOrder(id: ID!, order: OrderInput!): Result!
    setOrderVisible(id: ID!): Result!
    # order status
    setOrderStatus(id: ID!, status: String!): Result!
    #
    setOrderPerformer(id: ID!, performer: ID!): Result!
    cancelOrderPerformer(id: ID!): Result!
    performedRefused(id: ID!): Result! # performer
    deleteOrder(id: ID!): Result!
    #
    setOrderCommented(id: ID!): Result!
  }
`;
