import RatingType from './rating';

import * as query from './Query';
import addRatingFromCustomer from './Mutation/addRatingFromCustomer';
import addRatingFromPerformer from './Mutation/addRatingFromPerformer';

export default {
  Mutation: {
    addRatingFromCustomer,
    addRatingFromPerformer,
  },
  Query: {
    ...query,
  },
  RatingType,
};
