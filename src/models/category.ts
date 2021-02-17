import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables } from '../lib/constants';

export interface CategoryType extends mongoose.Document {
  name: string;
  icon?: string;
  image?: string;
  description?: string;
  parent?: string;
  visible?: boolean;
}

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    parent: {
      type: String,
      required: false,
      default: undefined,
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

interface Category<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Category<CategoryType> = mongoose.model<CategoryType>(
  tables.category,
  Schema,
) as Category<CategoryType>;

export default Model;
