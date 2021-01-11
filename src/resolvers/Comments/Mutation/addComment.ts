import { Comment, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

const addComment = async (_: any, { comment }: any, context: any) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(comment.orderId);
      if (!order)
        return {
          status: 40,
          result: 'ERROR',
        };
      if (!order.allowСomments)
        return {
          status: 401,
          result: 'ERROR',
        };
      await Comment.create({
        user: user.id,
        order: order.id,
        text: comment.text,
      });
      return {
        status: 20,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default addComment;
