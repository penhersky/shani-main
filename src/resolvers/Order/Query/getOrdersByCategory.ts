import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import { paginated } from '../../../lib/templates';

import { Context } from '../../../types/resolver';

const getOrdersByCategory = async (
  _: any,
  { id, text, pagination }: any,
  context: Context,
) =>
  cather(
    async () => {
      const search = text ? { $text: { $search: text } } : {};
      return paginated(pagination, Order, 'orders', {
        categories: id,
        ...search,
        deleted: false,
      });
    },
    context,
    auth,
  );

export default getOrdersByCategory;
