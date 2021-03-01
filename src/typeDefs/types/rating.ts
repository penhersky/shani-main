import { gql } from 'apollo-server-express';

export default gql`
  type GroupAverage {
    score: Int
    count: Int
  }

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
    group: [GroupAverage]
  }

  extend type Query {
    getMyAverage: RatingRes! @cacheControl(maxAge: 5000)
    getUserAverage(id: ID!): RatingRes! @cacheControl(maxAge: 5000)
    getMyRatings(id: ID!, paginate: Paginate): Ratings!
      @cacheControl(maxAge: 5000)
    getUserRatings(paginate: Paginate): Ratings! @cacheControl(maxAge: 5000)
  }
  extend type Mutation {
    addRatingFromPerformer(score: Float!, order: ID!): Result!
    addRatingFromCustomer(score: Float!, order: ID!): Result!
  }
`;
