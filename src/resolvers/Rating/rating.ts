import { User } from '../../models';

import cather from '../../wrappers/typeCather';
import { ResolveUser } from '../User';
import order from '../Order/Resolve';

export default {
  user: ResolveUser(),
  order,
  owner: async (root: any) => cather(async () => User.findById(root.owner)),
};
