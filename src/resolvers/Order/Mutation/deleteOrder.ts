import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const deleteOrder = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(id);

      const result = identity(user, order, 'customer');
      if (result) return result;

      await order?.updateOne({ delete: true });

      if (order?.performer)
        sendOne(
          context.io,
          context.storage,
          events.order.delete,
          String(order.customer),
          {
            order: {
              id: order?.id,
              name: order?.name,
            },
          },
        );

      return {
        status: 25,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default deleteOrder;
