import { concatenateTypeDefs } from 'apollo-server-express';

import category from './category';
import comment from './comment';
import request from './request';
import user from './user';
import order from './order';

import results from './results';
import params from './params';
import enums from './enums';

export default concatenateTypeDefs([
  results,
  user,
  enums,
  params,
  category,
  order,
  request,
  comment,
]);
