import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    addOrder(order: OrderInput!): Result! # -
    updateOrder(id: ID!, order: OrderInput!): Result! # -
    setOrderVisible(id: ID!): Result! # -
    # order status
    setOrderStatusToDone(id: ID!): Result! # -
    setOrderStatusToClosed(id: ID!): Result! # -
    setOrderStatusToCanceled(id: ID!): Result! # -
    #
    setOrderPerformer(id: ID!): Result! # -
    cancelOrderPerformer(id: ID!): Result! # -
    deleteOrder(id: ID!, order: OrderInput!): Result! # -
  }
`;
