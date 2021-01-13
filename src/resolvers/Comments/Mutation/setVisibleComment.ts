import { Comment, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

const setVisible = async (_: any, { id }: any, context: any) =>
  cather(
    async (user: any) => {
      const comment = await Comment.findById(id);
      if (!comment)
        return {
          status: 44,
          result: 'ERROR',
        };

      const order = await Order.findById(comment.order);
      const result = identity(user, order, 'customer');
      if (result) return result;

      await order?.updateOne({
        visible: order?.visible,
      });

      return {
        status: 21,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default setVisible;
