import { Request } from '../../../models';
import cather from '../../../wrappers/resolverCather';
import auth from '../../../lib/checkAuth';
import identity from '../../../lib/checkIdentity';

import { Context } from '../../../types/resolver';

const deleteRequest = async (_: any, { id }: any, context: Context) =>
  cather(
    async (user: any) => {
      const request = await Request.findById(id);

      const result = identity(user, request);
      if (result) return result;

      await request?.deleteOne();

      return {
        status: 25,
        result: 'SUCCESS',
      };
    },
    context,
    auth,
  );

export default deleteRequest;
