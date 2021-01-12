import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: ID!
    user: User @cacheControl(maxAge: 3600000)
    order: Order @cacheControl(maxAge: 3600000)
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
    orderId: ID!
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
    getCommentsByOrder(id: ID!, paginate: Paginate!): Comments!
      @cacheControl(maxAge: 1000)
    getMyComments(paginate: Paginate!): Comments! @cacheControl(maxAge: 60000)
    _getComments(paginate: Paginate!): Comments!
    _getComment(id: ID!): Comment!
  }
  extend type Mutation {
    createComment(comment: InputComment!): Result!
    setVisibleComment(id: ID!): Result!
    deleteComment(id: ID!): Result!
    _addComment(comment: CreateComment!): Comment!
    _deleteComments(idArr: [ID!]!): Result!
    _updateComment(id: ID!, comment: UpdateComment!): Comment!
  }
`;
