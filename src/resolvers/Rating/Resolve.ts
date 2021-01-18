import { Rating } from '../../models';

import cather from '../../wrappers/typeCather';

export const average = (query = {}) => {
  return Rating.aggregate([
    { $match: query },
    {
      $group: { average: { $avg: '$Rating' } },
    },
  ]);
};

/**
 * @return {ratingResolver} by @param {string} key
 *  Rating.findById(root[key]))
 */
export default (key: string) => (root: any) =>
  cather(async () => Rating.findById(root[key]));
