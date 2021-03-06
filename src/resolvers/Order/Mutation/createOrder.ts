import { Order, User, OrderImage } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import { userType } from '../../../lib/constants';

import events from '../../../io/events';
import { sendMany } from '../../../io/wrappers';

import { Context } from '../../../types/resolver';

const createOrder = async (_: any, { order, images }: any, context: Context) =>
  cather(
    async (user: any) => {
      if (user.type !== userType.customer)
        return {
          result: 'ERROR',
          status: 402,
        };

      const newOrder: any = await Order.create({
        ...order,
        customer: user.id,
      });

      await OrderImage.create(
        [...images].map((img: any) => ({
          user: user.id,
          order: newOrder.id,
          ...img,
        })),
      );

      if (order?.categories.length > 0) {
        const users = await User.find({
          _id: { $in: order?.categories },
        }).select('id');
        sendMany(
          context.io,
          context.storage,
          events.order.NEW,
          // eslint-disable-next-line no-underscore-dangle
          users.map((item: any) => item?._id),
          {
            order: {
              id: newOrder.id,
              name: newOrder.name,
              createdAt: newOrder.createdAt,
            },
          },
        );
      }
      return {
        status: 20,
        order: newOrder,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default createOrder;
