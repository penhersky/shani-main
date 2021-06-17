import { Category, Image } from '../../models';

import cather from '../../wrappers/typeCather';

export { default as ResolveUser } from './resolve';

export const UserType = {
  categories: async (root: any) =>
    cather(async () =>
      Category.find({ _id: { $in: root?.categoriesId || root?.categories } }),
    ),
  image: async (root: any) =>
    cather(
      async () =>
        (await Image.findOne({ user: root.id, active: true }))?.Location,
    ),
};
