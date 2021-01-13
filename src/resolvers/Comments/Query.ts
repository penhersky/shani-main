import { Comment } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';
import { paginated } from '../../lib/templates';

export const getCommentsByOrder = async (
  _: any,
  { id, paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      return paginated(paginate, Comment, 'comments', {
        order: id,
        visible: true,
      });
    },
    context,
    auth,
  );

export const getMyComments = async (_: any, { paginate }: any, context: any) =>
  cather(
    async (user: any) => {
      return paginated(paginate, Comment, 'comments', {
        user: user.id,
      });
    },
    context,
    auth,
  );
