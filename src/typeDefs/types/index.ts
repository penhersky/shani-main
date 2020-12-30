import { concatenateTypeDefs } from 'apollo-server-express';

import results from './results';
import enums from './enums';

export default concatenateTypeDefs([results, enums]);
