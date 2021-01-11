import { Request } from '../../models';
import {
  add,
  deleteMany,
  update,
  getOne,
  getManyPaginated,
} from '../../lib/templates';

import {
  createRequest,
  cancelRequest,
  deleteRequest,
  setVisibleRequest,
} from './Mutation';
import { getMyRequests, getRequestsByOrder } from './Query';

import RequestType from './Request';

export default {
  Mutation: {
    createRequest,
    setVisibleRequest,
    cancelRequest,
    deleteRequest,
    _addRequest: add(Request, 'request'),
    _updateRequest: update(Request, 'request'),
    _deleteRequests: deleteMany(Request, 'request'),
  },
  Query: {
    getMyRequests,
    getRequestsByOrder,
    _getRequests: getManyPaginated(Request, 'requests'),
    _getRequest: getOne(Request),
  },
  RequestType,
};
