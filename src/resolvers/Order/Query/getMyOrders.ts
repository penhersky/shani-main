import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import { paginatedWidthSort } from '../../../lib/templates';

import { Context } from '../../../types/resolver';

const getMyOrders = async (_: any, { pagination }: any, context: Context) =>
  cather(
    async (user: any) => {
      return paginatedWidthSort(pagination, Order, 'orders', {
        $or: [{ performer: user.id }, { customer: user.id }],
        deleted: false,
      });
    },
    context,
    auth,
  );

export default getMyOrders;
