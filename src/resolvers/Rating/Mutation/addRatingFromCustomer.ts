import { Order, Rating } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import identity from '../../../lib/checkIdentity';
import { userType, orderStatuses as status } from '../../../lib/constants';

const addRatingFromCustomer = async (
  _: any,
  { score, order: orderId }: any,
  context: any,
) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(orderId);

      const result = identity(user, order, userType.customer);
      if (result) return result;

      const rating = await Rating.findOne({ order: order?.id, owner: user.id });
      if (rating)
        return {
          result: 'ERROR',
          status: 455,
        };

      if (score > 5 || score < 1)
        return {
          result: 'ERROR',
          status: 453,
        };

      if (
        [status.created, status.inProcess, status.canceled].includes(
          String(order?.get('status')),
        )
      )
        return {
          result: 'ERROR',
          status: 401,
        };

      await Rating.create({
        owner: user.id,
        user: order?.get(userType.performer) as any,
        order: order?.id,
        score,
      });

      return {
        status: 20,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default addRatingFromCustomer;
