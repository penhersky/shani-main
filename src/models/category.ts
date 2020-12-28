import mongoose from 'mongoose';

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
      default: 'none',
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

export default mongoose.model('Category', Schema);
