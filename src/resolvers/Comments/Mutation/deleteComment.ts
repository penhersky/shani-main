import { Comment } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const deleteComment = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const comment = await Comment.findById(id);
      if (!comment)
        return {
          result: 'ERROR',
          status: 44,
        };
      if (!comment.user !== user.id)
        return {
          result: 'ERROR',
          status: 401,
        };

      await comment.deleteOne();

      return {
        status: 25,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default deleteComment;
