import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
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
  { strict: false },
);
const Image = mongoose.model('Image', Schema);

export default Image;
