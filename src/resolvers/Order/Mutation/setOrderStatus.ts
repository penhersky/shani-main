import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType, orderStatuses } from '../../../lib/constants';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const getStatusSettings = (status: string) => {
  switch (status) {
    case 'created':
      return {
        hu: 'customer',
        to: 'performer',
        event: events.order.NEW,
      };
    case 'in processing':
      return {
        hu: 'performer',
        to: 'customer',
        event: events.order.in_processing,
      };
    case 'done':
      return {
        hu: 'performer',
        to: 'customer',
        event: events.order.done,
      };
    case 'closed':
      return {
        hu: 'customer',
        to: 'performer',
        event: events.order.closed,
      };
    case 'canceled':
      return {
        hu: 'customer',
        to: 'performer',
        event: events.order.canceled,
      };

    default:
      throw Error('Set status Error');
  }
};

export default async (_: any, { id, status }: any, context: Context) =>
  cather(
    async (user: any) => {
      const order: any = await Order.findById(id);

      const { hu, to, event } = getStatusSettings(status);

      const result = identity(user, order, hu);
      if (result) return result;

      if (
        hu === userType.performer &&
        [orderStatuses.closed, orderStatuses.canceled].includes(order.status)
      )
        return {
          status: 401,
          result: 'ERROR',
        };

      await order?.updateOne({ status });

      if (order[to])
        sendOne(context.io, context.storage, event, String(order[to]), {
          order: {
            id: order?.id,
            name: order?.name,
            oldStatus: order.status,
            newStatus: status,
          },
        });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );
