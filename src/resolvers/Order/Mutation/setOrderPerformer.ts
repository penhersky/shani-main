import { Order, User } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType } from '../../../lib/constants';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const setOrderPerformer = async (
  _: any,
  { id, performer }: any,
  context: Context,
) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(id);

      const result = identity(user, order, userType.customer);
      if (result) return result;

      const worker = await User.findById(performer);
      if (
        !worker ||
        worker.deleted ||
        worker?.get('type') !== userType.performer
      )
        return {
          result: 'ERROR',
          status: 401,
        };

      if (order?.performer) {
        sendOne(
          context.io,
          context.storage,
          events.order.canceled_performer,
          String(order.performer),
          {
            order: {
              id: order?.id,
              name: order?.name,
            },
          },
        );
      }

      await order?.updateOne({ performer: worker.id });

      sendOne(
        context.io,
        context.storage,
        events.order.NEW_PERFORMER,
        worker.id,
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
