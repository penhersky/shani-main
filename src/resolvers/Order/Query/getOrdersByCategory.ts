import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const getOrdersByCategory = async (
  _: any,
  { id, text, pagination }: any,
  context: Context,
) =>
  cather(
    async () => {
      const search = text ? { $text: { $search: text } } : {};
      const orders = await Order.paginate(
        {
          categories: id,
          ...search,
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

export default getOrdersByCategory;
