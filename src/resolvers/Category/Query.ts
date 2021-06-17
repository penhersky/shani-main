import { Category } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';

import { Context } from '../../types/resolver';

export const getCategories = (_: any, args: any, context: Context) =>
  cather(async () => Category.find({ visible: true }), context, auth);

export const getCategoriesByParentId = async (
  _: any,
  { id }: any,
  context: any,
) =>
  cather(
    async () => Category.find({ parent: id, visible: true }),
    context,
    auth,
  );

export const getMainCategories = async (_: any, args: any, context: any) =>
  cather(
    async () => Category.find({ parent: undefined, visible: true }),
    context,
    auth,
  );
