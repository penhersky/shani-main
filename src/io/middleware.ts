import jwt from 'jsonwebtoken';

import { add } from './users';
import { ACCESS_SERVICE_SECURITY_TOKEN_KEY } from '../config';

export default (socket: any, next: any) => {
  try {
    const result = <string | any>(
      jwt.verify(socket?.auth?.token, String(ACCESS_SERVICE_SECURITY_TOKEN_KEY))
    );
    if (typeof result === 'string') socket.disconnect();
    add(result.userId, socket.id);
    next();
  } catch (error) {
    socket.disconnect();
  }
};
