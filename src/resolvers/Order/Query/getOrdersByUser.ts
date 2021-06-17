import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import { paginated } from '../../../lib/templates';

import { Context } from '../../../types/resolver';

const getOrdersByUser = async (
  _: any,
  { id, pagination }: any,
  context: Context,
) =>
  cather(
    async () => {
      return paginated(pagination, Order, 'orders', {
        $or: [{ performer: id }, { customer: id }],
        deleted: false,
      });
    },
    context,
    auth,
  );

export default getOrdersByUser;
