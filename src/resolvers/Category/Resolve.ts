import { Category } from '../../models';
import cather from '../../wrappers/typeCather';

export default async (root: any) =>
  cather(async () =>
    Category.find({ _id: { $in: root?.categoriesId || root?.categories } }),
  );
