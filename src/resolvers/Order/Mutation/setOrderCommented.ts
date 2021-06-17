import { Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';
import { userType } from '../../../lib/constants';

import { Context } from '../../../types/resolver';

const setOrderCommented = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(id);

      const result = identity(user, order, userType.customer);
      if (result) return result;

      await order?.updateOne({ allowComments: !order?.allowComments });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default setOrderCommented;
