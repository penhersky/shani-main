import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface CommentType extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  text: string;
  visible?: boolean;
}

const Schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: tables.order,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: tables.user,
      required: true,
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

Schema.plugin(mongoosePaginate);

interface Comment<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Comment<CommentType> = mongoose.model<CommentType>(
  tables.comment,
  Schema,
) as Comment<CommentType>;

export default Model;
