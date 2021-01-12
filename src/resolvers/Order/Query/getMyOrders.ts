import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const getMyOrders = async (_: any, { pagination }: any, context: Context) =>
  cather(
    async (user: any) => {
      const orders = await Order.paginate(
        { $or: [{ performer: user.id }, { customer: user.id }] },
        {
          limit: pagination.limit,
          page: pagination.page,
          sort: { [pagination.sortKey]: pagination?.sort === 'ASC' ? 1 : -1 },
        },
      );

      return {
        result: 'SUCCESS',
        totalItems: orders.totalDocs,
        page: orders.page,
        limit: orders.limit,
        totalPages: orders.totalPages,
        orders: orders.docs,
      };
    },
    context,
    auth,
  );

export default getMyOrders;
