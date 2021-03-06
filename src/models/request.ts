import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface RequestType extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  text: string;
  price?: string;
  time?: string;
  visible?: boolean;
  canceled?: boolean;
}

const Schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: false,
      default: 'contractual',
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
      default: true,
    },
    canceled: {
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

interface Request<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Request<RequestType> = mongoose.model<RequestType>(
  tables.request,
  Schema,
) as Request<RequestType>;

export default Model;
