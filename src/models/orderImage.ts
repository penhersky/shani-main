import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface ImageT extends mongoose.Document {
  order: string;
  Etag: string;
  Key: string;
  Location: string;
  active?: Boolean;
}

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: tables.order,
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
    active: {
      type: Boolean,
      required: false,
      default: true,
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
