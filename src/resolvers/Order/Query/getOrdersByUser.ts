import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const getOrdersByUser = async (
  _: any,
  { id, pagination }: any,
  context: Context,
) =>
  cather(
    async () => {
      const orders = await Order.paginate(
        {
          $or: [{ performer: id }, { customer: id }],
          deleted: false,
        },
        {
          limit: pagination.limit,
          page: pagination.page,
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

export default getOrdersByUser;
