import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: ID!
    user: User # -
    order: Order # -
    text: String
    visible: Boolean
    createdAt: String
    updatedAt: String
  }
  input CreateComment {
    user: ID!
    order: ID!
    text: String!
    visible: Boolean
  }
  input UpdateComment {
    text: String!
    visible: Boolean
  }

  input InputComment {
    order: ID!
    text: String!
  }
  type Comments {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    comments: [Comment]
  }

  extend type Query {
    getCommentsByOrder(id: ID!): Comments! # -
    getMyComments: Comments! # -
    _getComments(paginate: Paginate!): Comments! # -
    _getComment(id: ID!): Comment! # -
  }
  extend type Mutation {
    _addComment(comment: CreateComment!): Comment! # -
    _deleteComment(idArr: [ID!]!): Result! # -
    _updateComment(id: ID!, comment: UpdateComment!): Comment! # -
  }
`;
