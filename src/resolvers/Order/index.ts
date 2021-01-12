import { Order } from '../../models';

import {
  getManyPaginated,
  deleteMany,
  getOne,
  add,
  update,
} from '../../lib/templates';

import OrderType from './Order';
import { createOrder } from './Mutation';
import { getMyOrders } from './Query';

export default {
  Mutation: {
    createOrder,
    _addOrder: add(Order, 'order'),
    _updateOrder: update(Order, 'order'),
    _deleteOrders: deleteMany(Order, 'order'),
  },
  Query: {
    getMyOrders,
    _getOrders: getManyPaginated(Order, 'orders'),
    _getOrder: getOne(Order),
  },
  OrderType,
};
