import { Rating } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';
import { paginatedWidthSort } from '../../lib/templates';
import { average } from './Resolve';

export const getUserRatings = async (
  _: any,
  { id, paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      return paginatedWidthSort(paginate, Rating, 'ratings', {
        user: id,
        visible: true,
      });
    },
    context,
    auth,
  );

export const getMyRatings = async (_: any, { paginate }: any, context: any) =>
  cather(
    async (user: any) => {
      return paginatedWidthSort(paginate, Rating, 'ratings', {
        user: user.id,
        visible: true,
      });
    },
    context,
    auth,
  );

export const getMyAverage = async (_: any, args: any, context: any) =>
  cather(
    async (user: any) => {
      return average({ user: user.id });
    },
    context,
    auth,
  );
