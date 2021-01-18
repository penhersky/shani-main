import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType, orderStatuses } from '../../../lib/constants';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const setOrderStatus = (
  status: string,
  hu: string,
  to: string,
  event: string,
) => async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const order: any = await Order.findById(id);

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

export const setOrderStatusToInProcessing = setOrderStatus(
  'in processing',
  'performer',
  'customer',
  events.order.in_processing,
);
export const setOrderStatusToDone = setOrderStatus(
  'done',
  'performer',
  'customer',
  events.order.done,
);
export const setOrderStatusToClosed = setOrderStatus(
  'closed',
  'customer',
  'performer',
  events.order.closed,
);
export const setOrderStatusToCanceled = setOrderStatus(
  'canceled',
  'customer',
  'performer',
  events.order.canceled,
);
