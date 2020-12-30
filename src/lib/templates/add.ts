import cather from '../../wrappers/resolverCather';
import auth from '../checkAuth';

export default (Model: any, key: string) => async (
  _: any,
  { [key]: args }: any,
  context: any,
) =>
  cather(
    async () => {
      return Model.create({ ...args });
    },
    context,
    auth,
    true,
    true,
  );
