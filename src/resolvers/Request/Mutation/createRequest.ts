import { Request, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const creteRequest = async (
  _: any,
  { orderId, request }: any,
  context: Context,
) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(orderId);
      if (!order)
        return {
          status: 40,
          result: 'ERROR',
        };

      if (user.type !== 'performer')
        return {
          status: 401,
          result: 'ERROR',
        };

      const newRequest = await Request.create({
        user: user.id,
        order: order.id,
        text: request.text,
        price: request.price,
        time: request.time,
      });

      sendOne(
        context.io,
        context.storage,
        events.order.NEW_PERFORMER,
        String(order.customer),
        {
          order: { id: order.id, name: order.name },
          request: { id: newRequest.id, text: newRequest.text },
        },
      );

      return {
        status: 20,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default creteRequest;
