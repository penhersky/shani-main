import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface UserType extends mongoose.Document {
  name: string;
  email: string;
  provider: string;
  type?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  description?: string;
  birthday?: string;
  categoriesId?: [string];
  accountType?: mongoose.Types.ObjectId;
  deleted?: Boolean;
}

const Schema = new mongoose.Schema({});

Schema.index({
  email: 'text',
  name: 'text',
  firstName: 'text',
  lastName: 'text',
  middleName: 'text',
  description: 'text',
  birthday: 'text',
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
