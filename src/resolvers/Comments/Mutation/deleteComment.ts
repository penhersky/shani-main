import { Comment } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

import { Context } from '../../../types/resolver';

const deleteComment = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const comment = await Comment.findById(id);

      const result = identity(user, comment);
      if (result) return result;

      await comment?.deleteOne();

      return {
        status: 25,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default deleteComment;
