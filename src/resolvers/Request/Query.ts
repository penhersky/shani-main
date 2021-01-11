import { Request } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';

export const getRequestsByOrder = async (
  _: any,
  { id, paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      const comments = await Request.paginate(
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
        requests: comments.docs,
      };
    },
    context,
    auth,
  );

export const getMyRequests = async (_: any, { paginate }: any, context: any) =>
  cather(
    async (user: any) => {
      const comments = await Request.paginate(
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
        requests: comments.docs,
      };
    },
    context,
    auth,
  );
