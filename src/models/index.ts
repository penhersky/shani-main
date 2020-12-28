import { CategoryType } from './category';
import { UserType } from './user';
import { OrderType } from './orders';

export { default as User } from './user';
export { default as Category } from './category';
export { default as Order } from './orders';

export type TCategory = CategoryType;
export type TOrder = OrderType;
export type TUser = UserType;
