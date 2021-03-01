import { Rating } from '../../models';

import cather from '../../wrappers/typeCather';

export const average = async (query = {}) => {
  const result = await Rating.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$scope',
        average: { $avg: '$score' },
        total: { $sum: 1 },
      },
    },
  ]);

  const sum = await Rating.aggregate([
    {
      $unwind: '$score',
    },
    {
      $group: {
        _id: '$score',
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    score: result[0]?.average || 0,
    count: result[0]?.total || 0,
    // eslint-disable-next-line no-underscore-dangle
    group: sum.map((item) => ({ count: item.count, score: item._id })),
  };
};

/**
 * @return {ratingResolver} by @param {string} key
 *  Rating.findById(root[key]))
 */
export default (key: string) => (root: any) =>
  cather(async () => Rating.findOne({ user: root[key], order: root.id }));
