import { Request, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const cancelRequest = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const request = await Request.findById(id);
      if (!request)
        return {
          result: 'ERROR',
          status: 44,
        };
      const order = await Order.findById(request.order);
      if (!order || order.customer !== user.id)
        return {
          status: 401,
          result: 'ERROR',
        };

      await request.updateOne({
        canceled: true,
      });

      sendOne(
        context.io,
        context.storage,
        events.order.canceled_performer,
        String(request.user),
        {
          order: { id: order.id, name: order.name },
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

export default cancelRequest;
