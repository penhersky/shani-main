import { Comment } from '../../models';
import {
  add,
  deleteMany,
  update,
  getOne,
  getManyPaginated,
} from '../../lib/templates';

import { getCommentsByOrder, getMyComments } from './Query';
import addComment from './Mutation/addComment';
import setVisibleComment from './Mutation/setVisibleComment';
import deleteComment from './Mutation/deleteComment';

import CommentType from './Comment';

export default {
  Mutation: {
    addComment,
    setVisibleComment,
    deleteComment,
    _addComment: add(Comment, 'comment'),
    _updateComment: update(Comment, 'comment'),
    _deleteComments: deleteMany(Comment, 'comments'),
  },
  Query: {
    getMyComments,
    getCommentsByOrder,
    _getComments: getManyPaginated(Comment, 'comments'),
    _getComment: getOne(Comment),
  },
  CommentType,
};
