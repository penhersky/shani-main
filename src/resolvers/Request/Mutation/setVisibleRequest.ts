import { Request, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType } from '../../../lib/constants';

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
      const result = identity(user, order, userType.customer);
      if (result) return result;

      await request.updateOne({
        visible: !request.visible,
      });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default cancelRequest;
