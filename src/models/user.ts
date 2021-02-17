import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface UserType extends mongoose.Document {
  name: string;
  email: string;
  type?: string;
  active?: boolean;
  categoriesId?: [string];
  deleted?: Boolean;
}

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    indexes: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['customer', 'performer'],
    default: 'performer',
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  categoriesId: {
    type: [String],
    required: false,
    default: [],
  },
  accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType' },
  deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

Schema.plugin(mongoosePaginate);

interface User<T extends mongoose.Document> extends mongoose.PaginateModel<T> {}

/**
 * This scheme can be changed only from another service.
 * @readonly
 */
const Model: User<UserType> = mongoose.model<UserType>(
  'User',
  Schema,
) as User<UserType>;

export default Model;
