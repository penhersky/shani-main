import cather from '../../wrappers/resolverCather';
import auth from '../checkAuth';

export const getManyPaginated = (Model: any, key: string) => async (
  _: any,
  { paginate }: any,
  context: any,
) =>
  cather(
    async () => {
      const list = await Model.paginate(
        {},
        {
          limit: paginate.limit,
          page: paginate.page,
          sort: { [paginate.sortKey]: paginate?.sort === 'ASC' ? 1 : -1 },
        },
      );

      return {
        result: 'SUCCESS',
        totalItems: list.totalDocs,
        page: list.page,
        limit: list.limit,
        totalPages: list.totalPages,
        [`${key}s`]: list.docs,
      };
    },
    context,
    auth,
    true,
    true,
  );

export const getMany = (Model: any, key: string) => async (
  _: any,
  args: any,
  context: any,
) =>
  cather(
    async () => {
      const list: any[] = await Model.find();

      return {
        result: 'SUCCESS',
        totalItems: list.length,
        [`${key}s`]: list,
      };
    },
    context,
    auth,
    true,
    true,
  );

export const getOne = (Model: any) => async (_: any, args: any, context: any) =>
  cather(async () => Model.findById(args.id), context, auth, true, true);
