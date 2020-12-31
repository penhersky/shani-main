import jwt from 'jsonwebtoken';
import { RedisClient } from 'redis';

import { ACCESS_SERVICE_SECURITY_TOKEN_KEY } from '../config';

export default (socket: any, next: any, storage: RedisClient) => {
  try {
    const result = <string | any>(
      jwt.verify(
        socket.handshake.auth?.token,
        String(ACCESS_SERVICE_SECURITY_TOKEN_KEY),
      )
    );
    if (typeof result === 'string') socket.disconnect();
    storage.set(result.id, socket.id);
    next();
  } catch (error) {
    socket.disconnect();
  }
};
