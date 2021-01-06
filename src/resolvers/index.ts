import category from './Category';
import { UserType } from './User';
import order from './Order';
import request from './Request';
import comment from './Comments';

export default {
  Query: {
    ...category.Query,
    ...request.Query,
    ...comment.Query,
    ...order.Query,
  },
  Mutation: {
    ...category.Mutation,
    ...request.Mutation,
    ...comment.Mutation,
    ...order.Mutation,
  },
  Category: category.CategoryType,
  Request: request.RequestType,
  Comment: comment.CommentType,
  Order: order.OrderType,
  User: UserType,
};
