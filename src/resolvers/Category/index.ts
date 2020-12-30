import { Category } from '../../models';
import { getManyPaginated, getOne } from '../../lib/templates/get';
import update from '../../lib/templates/update';
import add from '../../lib/templates/add';
import { deleteMany } from '../../lib/templates/delete';

export default {
  Mutation: {
    _addCategory: add(Category, 'category'),
    _deleteCategories: deleteMany(Category, 'categories'),
    _updateCategory: update(Category, 'category'),
  },
  Query: {
    _getCategories: getManyPaginated(Category, 'categories'),
    _getCategory: getOne(Category),
  },
};
