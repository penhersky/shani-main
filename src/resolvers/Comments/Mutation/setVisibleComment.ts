import { Comment, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

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
      if (!order || user.id !== order?.customer)
        return {
          status: 401,
          result: 'ERROR',
        };

      await order.updateOne({
        visible: order.visible,
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
