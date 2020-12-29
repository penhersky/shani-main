import cather from '../../wrappers/resolverCather';
import auth from '../checkAuthAdmin';

export default (Model: any, key: string) => async (
  _: any,
  { id, [key]: args }: any,
  context: any,
) =>
  cather(
    async () => {
      const element = await Model.findById(id);

      if (!element) throw new Error(`Such ${key} does\`t exist!`);

      return Model.findByIdAndUpdate(element.id, args, {
        new: true,
      });
    },
    context,
    auth,
  );
