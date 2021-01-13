import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createOrder(order: OrderInput!): OrderResult!
    updateOrder(id: ID!, order: OrderInput!): Result!
    setOrderVisible(id: ID!): Result!
    # order status
    setOrderStatusToDone(id: ID!): Result! # performer
    setOrderStatusToInProcessing(id: ID!): Result! # performer
    setOrderStatusToClosed(id: ID!): Result!
    setOrderStatusToCanceled(id: ID!): Result!
    #
    setOrderPerformer(id: ID!, performer: ID!): Result!
    cancelOrderPerformer(id: ID!): Result!
    deleteOrder(id: ID!): Result!
    #
    setOrderCommented(id: ID!): Result!
  }
`;
