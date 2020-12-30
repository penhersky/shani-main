import { Category } from '../../models';
import cather from '../../wrappers/resolverCather';
import auth from '../../lib/checkAuth';

export const getCategories = (_: any, args: any, context: any) =>
  cather(async () => Category.find({}), context, auth);

export const getCategoriesByParentId = async (
  _: any,
  { id }: any,
  context: any,
) => cather(async () => Category.find({ parent: id }), context, auth);

export const getMainCategories = async (_: any, args: any, context: any) =>
  cather(async () => Category.find({ parent: 'none' }), context, auth);
