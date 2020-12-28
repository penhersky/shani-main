import mongoose from 'mongoose';

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
      ref: 'Order',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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

interface Comment<T extends mongoose.Document>
  extends mongoose.PaginateModel<T> {}

const Model: Comment<CommentType> = mongoose.model<CommentType>(
  'Comment',
  Schema,
) as Comment<CommentType>;

export default Model;
