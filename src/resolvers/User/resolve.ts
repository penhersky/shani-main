import { User } from '../../models';

import cather from '../../wrappers/typeCather';

/**
 * @return {userResolver} by @param {string} key
 *  User.findById(root[key]))
 */
export default (key = 'user') => async (root: any) =>
  cather(async () => User.findById(root[key]));
