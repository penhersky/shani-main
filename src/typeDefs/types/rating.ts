import { gql } from 'apollo-server-express';

export default gql`
  type Rating {
    id: ID!
    owner: User!
    order: Order!
    user: User!
    score: Float!
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

  type RatingRes {
    score: Float!
    count: Int!
  }

  extend type Query {
    getMyAverage: RatingRes!
    getUserAverage(id: ID!): RatingRes!
    getMyRatings(id: ID!, paginate: Paginate): Ratings!
    getUserRatings(paginate: Paginate): Ratings!
  }
  extend type Mutation {
    addRatingFromPerformer(score: Float!, order: ID!): Result!
    addRatingFromCustomer(score: Float!, order: ID!): Result!
  }
`;
