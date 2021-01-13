import { Order } from '../../models';

import {
  getManyPaginated,
  deleteMany,
  getOne,
  add,
  update,
} from '../../lib/templates';

import OrderType from './Order';
import * as mutation from './Mutation';
import * as query from './Query';

export default {
  Mutation: {
    ...mutation,
    _addOrder: add(Order, 'order'),
    _updateOrder: update(Order, 'order'),
    _deleteOrders: deleteMany(Order, 'order'),
  },
  Query: {
    ...query,
    _getOrders: getManyPaginated(Order, 'orders'),
    _getOrder: getOne(Order),
  },
  OrderType,
};
