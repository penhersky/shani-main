import mongoose from 'mongoose';

export interface CategoryType extends mongoose.Document {
  name: string;
  icon?: string;
  image?: string;
  description?: string;
  parent?: string;
  hidden?: boolean;
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
    hidden: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Category', Schema);
