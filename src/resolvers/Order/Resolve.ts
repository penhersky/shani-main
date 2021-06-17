import { Order } from '../../models';
import cather from '../../wrappers/typeCather';

export default async (root: any) =>
  cather(async () => Order.findById(root.order));
