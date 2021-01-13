import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createOrder(order: OrderInput!): OrderResult!
    updateOrder(id: ID!, order: OrderInput!): Result!
    setOrderVisible(id: ID!): Result! # -
    # order status
    setOrderStatusToDone(id: ID!): Result! # -
    setOrderStatusToClosed(id: ID!): Result! # -
    setOrderStatusToCanceled(id: ID!): Result! # -
    # performer
    setOrderPerformer(id: ID!): Result! # -
    cancelOrderPerformer(id: ID!): Result! # -
    deleteOrder(id: ID!): Result! # -
    #
    setOrderCommented(id: ID!): Result!
  }
`;
