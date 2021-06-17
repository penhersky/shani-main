import jwt from 'jsonwebtoken';

import { ACCESS_SERVICE_SECURITY_TOKEN_KEY } from '../config';

export default (context: any, isAdmin: boolean) => {
  try {
    const result = <string | any>(
      jwt.verify(
        context?.req?.headers['x-service-security-token-x'],
        String(ACCESS_SERVICE_SECURITY_TOKEN_KEY),
      )
    );
    if (typeof result === 'string') throw new Error('Access denied');
    if (isAdmin) if (result.type !== 'admin') throw new Error('Access denied');
    return result;
  } catch (error) {
    return 'Access denied';
  }
};
