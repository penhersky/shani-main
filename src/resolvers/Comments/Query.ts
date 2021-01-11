import { Comment } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';

export const getCommentsByOrder = async (
  _: any,
  { id, paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      const comments = await Comment.paginate(
        { order: id, visible: true },
        {
          limit: paginate.limit,
          page: paginate.page,
          sort: { [paginate.sortKey]: paginate?.sort === 'ASC' ? 1 : -1 },
        },
      );

      return {
        result: 'SUCCESS',
        totalItems: comments.totalDocs,
        page: comments.page,
        limit: comments.limit,
        totalPages: comments.totalPages,
        comments: comments.docs,
      };
    },
    context,
    auth,
  );

export const getMyComments = async (_: any, { paginate }: any, context: any) =>
  cather(
    async (user: any) => {
      const comments = await Comment.paginate(
        { user: user.id },
        {
          limit: paginate.limit,
          page: paginate.page,
          sort: { [paginate.sortKey]: paginate?.sort === 'ASC' ? 1 : -1 },
        },
      );

      return {
        result: 'SUCCESS',
        totalItems: comments.totalDocs,
        page: comments.page,
        limit: comments.limit,
        totalPages: comments.totalPages,
        comments: comments.docs,
      };
    },
    context,
    auth,
  );
