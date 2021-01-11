import { Request, Comment } from '../../models';
import cather from '../../wrappers/typeCather';
import authUser from '../../lib/checkAuth';

import categories from '../Category/Resolve';
import user from '../User/resolve';

export default {
  categories,
  requests: async (root: any, args: any, context: any) =>
    cather(
      async (auth: any) => {
        if (auth.id === root.customer) return Request.find({ order: root.id });
        return Request.find({ order: root.id, visible: true });
      },
      context,
      authUser,
    ),
  comments: async (root: any, args: any, context: any) =>
    cather(
      async () => async (auth: any) => {
        if (auth.id === root.customer) return Comment.find({ order: root.id });
        return Comment.find({ order: root.id, visible: true });
      },
      context,
      authUser,
    ),
  customer: user('customer'),
  performer: user('performer'),
};
