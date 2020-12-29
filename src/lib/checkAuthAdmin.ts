import jwt from 'jsonwebtoken';

import { logWarn } from './logger';
import { ACCESS_SERVICE_SECURITY_TOKEN_KEY } from '../config';

export default (context: any) => {
  try {
    const result = <string | any>(
      jwt.verify(
        context?.req?.headers['x-service-security-token-x'],
        String(ACCESS_SERVICE_SECURITY_TOKEN_KEY),
      )
    );
    if (typeof result === 'string' || result?.type !== 'admin')
      throw new Error('Access denied');
    return result;
  } catch (error) {
    logWarn(error);
    return 'Access denied';
  }
};
