import category from './Category';
import { UserType } from './User';

export default {
  Query: {
    ...category.Query,
  },
  Mutation: {
    ...category.Mutation,
  },
  Category: category.CategoryType,
  User: UserType,
};
