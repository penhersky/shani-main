import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface ImageT extends mongoose.Document {
  order: string;
  user: string;
  Etag: string;
  Key: string;
  Location: string;
}

const Schema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Types.ObjectId,
      ref: tables.order,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: tables.user,
    },
    Etag: {
      type: String,
      required: true,
    },
    Key: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Schema.plugin(mongoosePaginate);

interface Image<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Image<ImageT> = mongoose.model<ImageT>(
  tables.image,
  Schema,
) as Image<ImageT>;

export default Model;
