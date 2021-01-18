import { gql } from 'apollo-server-express';

export default gql`
  type Rating {
    id: ID!
    owner: User!
    order: Order!
    user: User!
    score: Int!
    visible: Boolean
    createdAt: String
    updatedAt: String
  }

  type Ratings {
    result: result
    totalItems: Int
    page: Int
    limit: Int
    totalPages: Int
    ratings: [Rating]
  }

  extend type Query {
    getMyRatings(id: ID!, pagination: Paginate): Ratings!
    getUserRatings(pagination: Paginate): Ratings!
  }
  extend type Mutation {
    addRatingFromPerformer(score: Int!, order: ID!): Result!
    addRatingFromCustomer(score: Int!, order: ID!): Result!
  }
`;
