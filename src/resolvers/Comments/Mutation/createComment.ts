import { Comment, Order } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import events from '../../../io/events';
import { sendOne } from '../../../io/wrappers';

const addComment = async (_: any, { comment }: any, context: any) =>
  cather(
    async (user: any) => {
      const order = await Order.findById(comment.orderId);
      if (!order)
        return {
          status: 40,
          result: 'ERROR',
        };
      if (!order.allowComments)
        return {
          status: 401,
          result: 'ERROR',
        };
      const newComment = await Comment.create({
        user: user.id,
        order: order.id,
        text: comment.text,
      });

      sendOne(
        context.io,
        context.storage,
        events.order.new_comment,
        String(order.customer),
        {
          order: { id: order.id, name: order.name },
          comment: { id: newComment.id, text: newComment.text },
        },
      );

      return {
        result: 'SUCCESS',
        comment: newComment,
      };
    },
    context,
    auth,
  );

export default addComment;
