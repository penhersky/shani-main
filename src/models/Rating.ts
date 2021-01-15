import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface RatingType extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  score: number;
  visible?: boolean;
}

const Schema = new mongoose.Schema(
  {
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
    score: {
      type: Number,
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

interface Rating<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Rating<RatingType> = mongoose.model<RatingType>(
  tables.category,
  Schema,
) as Rating<RatingType>;

export default Model;
