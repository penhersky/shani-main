import { CategoryType } from './category';
import { UserType } from './user';
import { OrderType } from './orders';
import { ImageT } from './orderImage';
import { CommentType } from './comment';
import { RequestType } from './request';
import { RatingType } from './Rating';

export { default as User } from './user';
export { default as Category } from './category';
export { default as Order } from './orders';
export { default as Request } from './request';
export { default as Comment } from './comment';
export { default as OrderImage } from './orderImage';
export { default as Image } from './image';
export { default as Rating } from './Rating';

export type TCategory = CategoryType;
export type TOrder = OrderType;
export type TUser = UserType;
export type TImage = ImageT;
export type TComment = CommentType;
export type TRequest = RequestType;
export type TRating = RatingType;
