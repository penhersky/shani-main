import { Order } from '../../models';

import {
  getManyPaginated,
  deleteMany,
  getOne,
  add,
  update,
} from '../../lib/templates';

import OrderType from './Order';

export default {
  Mutation: {
    _addOrder: add(Order, 'order'),
    _updateOrder: update(Order, 'order'),
    _deleteOrders: deleteMany(Order, 'order'),
  },
  Query: {
    _getOrders: getManyPaginated(Order, 'orders'),
    _getOrder: getOne(Order),
  },
  OrderType,
};
