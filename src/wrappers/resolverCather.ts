import { logError } from '../lib/logger';

export default async (
  resolver: (user?: any) => any,
  context?: any,
  auth?: (context: any, isAdmin: boolean) => object | string,
  fullCheck = true,
  isAdmin = false,
) => {
  try {
    if (auth) {
      const authResult = auth(context, isAdmin);
      if (typeof authResult === 'string') {
        if (fullCheck) throw new Error('Access denied');
        return await resolver(authResult);
      }
    }

    return await resolver();
  } catch (error) {
    if (error.message === 'Access denied') return error;
    logError(error.message, {
      name: error?.name,
      stack: error?.stack,
    });
    return Error('Server error');
  }
};
