import { Request } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';
import { paginatedWidthSort } from '../../lib/templates';

export const getRequestsByOrder = async (
  _: any,
  { id, paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      return paginatedWidthSort(paginate, Request, 'requests', {
        order: id,
        visible: true,
      });
    },
    context,
    auth,
  );

export const getMyRequests = async (_: any, { paginate }: any, context: any) =>
  cather(
    async (user: any) => {
      return paginatedWidthSort(paginate, Request, 'requests', {
        user: user.id,
      });
    },
    context,
    auth,
  );
