import cather from '../../wrappers/resolverCather';
import auth from '../checkAuth';

export const deleteMany = (Model: any, key: string) => async (
  _: any,
  args: any,
  context: any,
) =>
  cather(
    async () => {
      await Model.deleteMany({
        _id: {
          $in: args?.idArr,
        },
      });

      return {
        result: 'SUCCESS',
        message: `${key} deleted successful!`,
      };
    },
    context,
    auth,
    true,
    true,
  );

export const deleteOne = (Model: any, key: string) => async (
  _: any,
  args: any,
  context: any,
) =>
  cather(
    async () => {
      await Model.findByIdAndDelete(args.id);

      return {
        result: 'SUCCESS',
        message: `${key}s deleted successful!`,
      };
    },
    context,
    auth,
    true,
    true,
  );
