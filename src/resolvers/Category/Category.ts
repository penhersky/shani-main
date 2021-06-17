import { Category } from '../../models';

import cather from '../../wrappers/typeCather';

export default {
  children: async (root: any) =>
    cather(async () => Category.find({ parent: root.id })),
};
