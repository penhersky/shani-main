import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const getOrder = async (_: any, { id }: any, context: Context) =>
  cather(
    async () => {
      const order = await Order.findById(id);
      if (!order || order.deleted)
        return {
          result: 'ERROR',
          status: 44,
        };

      return {
        result: 'SUCCESS',
        order,
        status: 10,
      };
    },
    context,
    auth,
  );

export default getOrder;
