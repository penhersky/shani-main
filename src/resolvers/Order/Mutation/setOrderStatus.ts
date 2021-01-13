import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

import { Context } from '../../../types/resolver';

const setOrderStatus = (status: string) => async (
  _: any,
  { id }: any,
  context: Context,
) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(id);

      const result = identity(user, order, 'customer');
      if (result) return result;

      await order?.updateOne({ status });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export const setOrderStatusToClosed = setOrderStatus('closed');
export const setOrderStatusToCanceled = setOrderStatus('canceled');
