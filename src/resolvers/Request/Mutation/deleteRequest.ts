import { Request } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';

import { Context } from '../../../types/resolver';

const deleteRequest = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const request = await Request.findById(id);
      if (!request)
        return {
          result: 'ERROR',
          status: 44,
        };
      if (!request.user !== user.id)
        return {
          result: 'ERROR',
          status: 401,
        };

      await request.deleteOne();

      return {
        status: 25,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default deleteRequest;
