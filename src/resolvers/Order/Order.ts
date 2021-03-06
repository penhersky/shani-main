import { Request, Comment, OrderImage } from '../../models';
import cather from '../../wrappers/typeCather';
import authUser from '../../lib/checkAuth';

import categories from '../Category/Resolve';
import { findCustomer, findPerformer } from '../User/resolve';
import rating from '../Rating/Resolve';

export default {
  categories,
  requests: async (root: any, args: any, context: any) =>
    cather(
      async (auth: any) => {
        if (auth.id === root.customer)
          return Request.countDocuments({ order: root.id });
        return Request.countDocuments({ order: root.id, visible: true });
      },
      context,
      authUser,
    ),
  comments: async (root: any, args: any, context: any) =>
    cather(
      async (auth: any) => {
        if (auth.id === root.customer)
          return Comment.countDocuments({ order: root.id });
        return Comment.countDocuments({ order: root.id, visible: true });
      },
      context,
      authUser,
    ),
  images: async (root: any, args: any, context: any) =>
    cather(async () => OrderImage.find({ order: root.id }), context, authUser),
  customer: findCustomer,
  customerRating: rating('customer'),
  performer: findPerformer,
  performerRating: rating('performer'),
};
