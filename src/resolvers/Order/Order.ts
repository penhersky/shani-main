import { Request, Comment } from '../../models';
import cather from '../../wrappers/typeCather';

import categories from '../Category/Resolve';
import user from '../User/resolve';

export default {
  categories,
  requests: async (root: any) =>
    cather(async () => Request.find({ order: root.id })),
  comments: async (root: any) =>
    cather(async () => Comment.find({ order: root.id })),
  customer: user('customer'),
  performer: user('performer'),
};
