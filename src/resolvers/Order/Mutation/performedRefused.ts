import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const setOrderPerformer = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(id);

      const result = identity(user, order, 'performer');
      if (result) return result;

      await order?.updateOne({ performer: null, status: 'created' });

      sendOne(
        context.io,
        context.storage,
        events.order.refused_performer,
        String(order?.customer),
        {
          order: {
            id: order?.id,
            name: order?.name,
          },
        },
      );

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default setOrderPerformer;
