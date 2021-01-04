import mongoose from 'mongoose';

import { tables } from '../lib/constants';

export interface OrderType extends mongoose.Document {
  name: string;
  description: string;
  price: string;
  customer?: mongoose.Types.ObjectId;
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
  categories: mongoose.Types.ObjectId[];
  visible?: boolean;
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
      enum: ['created', 'in processing', 'done', 'closed', 'canceled'],
      required: false,
      default: 'created',
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
      enum: ['none', 'place', 'online', 'other'],
      required: true,
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

Schema.index({
  name: 'text',
  description: 'text',
  price: 'text',
  location: {
    name: 'text',
  },
});

interface Order<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Order<OrderType> = mongoose.model<OrderType>(
  tables.order,
  Schema,
) as Order<OrderType>;

export default Model;
