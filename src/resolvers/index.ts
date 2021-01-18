import category from './Category';
import { UserType } from './User';
import order from './Order';
import request from './Request';
import comment from './Comments';
import rating from './Rating';

export default {
  Query: {
    ...category.Query,
    ...request.Query,
    ...comment.Query,
    ...rating.Query,
    ...order.Query,
  },
  Mutation: {
    ...category.Mutation,
    ...request.Mutation,
    ...comment.Mutation,
    ...rating.Mutation,
    ...order.Mutation,
  },
  Category: category.CategoryType,
  Request: request.RequestType,
  Comment: comment.CommentType,
  Rating: rating.RatingType,
  Order: order.OrderType,
  User: UserType,
};
