import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { tables, orderStatuses } from '../lib/constants';

export interface OrderType extends mongoose.Document {
  name: string;
  description: string;
  price: string;
  categories: mongoose.Types.ObjectId[];
  customer: mongoose.Types.ObjectId;
  performer?: mongoose.Types.ObjectId;
  status?: string;
  time?: string;
  from?: string;
  to?: string;
  locationType?: string;
  location?: {
    name: string;
    lat: string;
    lng: string;
  };
  allowComments: boolean;
  visible?: boolean;
  deleted?: boolean;
}

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: false,
      default: 'contractual',
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: tables.user,
      required: true,
    },
    performer: {
      type: mongoose.Types.ObjectId,
      ref: tables.user,
      required: false,
    },
    status: {
      type: String,
      enum: Object.keys(orderStatuses),
      required: false,
      default: orderStatuses.created,
    },
    time: {
      type: String,
      required: false,
    },
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
    locationType: {
      type: String,
      required: false,
    },
    location: {
      required: false,
      default: {},
      name: {
        type: String,
      },
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
    categories: {
      type: [mongoose.Types.ObjectId],
      required: false,
      ref: tables.category,
      default: [],
    },
    allowComments: {
      type: Boolean,
      required: false,
      default: true,
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

Schema.index({
  name: 'text',
  description: 'text',
  price: 'text',
  location: {
    name: 'text',
  },
});

Schema.plugin(mongoosePaginate);

interface Order<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Order<OrderType> = mongoose.model<OrderType>(
  tables.order,
  Schema,
) as Order<OrderType>;

export default Model;
