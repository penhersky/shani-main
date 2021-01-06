import category from './Category';
import { UserType } from './User';
import order from './Order';

export default {
  Query: {
    ...category.Query,
    ...order.Query,
  },
  Mutation: {
    ...category.Mutation,
    ...order.Mutation,
  },
  Category: category.CategoryType,
  Order: order.OrderType,
  User: UserType,
};
