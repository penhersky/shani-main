import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType } from '../../../lib/constants';

import { Context } from '../../../types/resolver';

const updateOrder = async (_: any, { id, order }: any, context: Context) =>
  cather(
    async (user: any) => {
      const findOrder = await Order.findById(id);

      const result = identity(user, order, userType.customer);
      if (result) return result;

      findOrder?.updateOne({ ...order });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default updateOrder;
