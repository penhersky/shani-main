import { concatenateTypeDefs } from 'apollo-server-express';

import category from './category';

import results from './results';
import params from './params';
import enums from './enums';

export default concatenateTypeDefs([results, enums, params, category]);
