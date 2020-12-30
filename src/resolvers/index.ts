import category from './Category';

export default {
  Query: {
    ...category.Query,
  },
  Mutation: {
    ...category.Mutation,
  },
  Category: category.CategoryType,
};
