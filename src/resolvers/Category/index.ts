import { Category } from '../../models';

import {
  getManyPaginated,
  deleteMany,
  getOne,
  add,
  update,
} from '../../lib/templates';

import CategoryType from './Category';
import {
  getCategories,
  getCategoriesByParentId,
  getMainCategories,
} from './Query';

export default {
  Mutation: {
    _addCategory: add(Category, 'category'),
    _deleteCategories: deleteMany(Category, 'categories'),
    _updateCategory: update(Category, 'category'),
  },
  Query: {
    getCategories,
    getMainCategories,
    getCategoriesByParentId,
    _getCategories: getManyPaginated(Category, 'categories'),
    _getCategory: getOne(Category),
  },
  CategoryType,
};
