import { Server } from 'socket.io';
import { RedisClient } from 'redis';

export const sendOne = (
  io: Server,
  storage: RedisClient,
  event: string,
  userId: string,
  data: any,
) => {
  storage.get(userId, (err: any, reply: string | null) => {
    if (!err && reply) {
      io.to(reply).emit(event, data);
    }
  });
};

export const sendMany = (
  io: Server,
  storage: RedisClient,
  event: string,
  userId: string[],
  data: any,
) => {
  userId.forEach((id: string) => sendOne(io, storage, event, id, data));
};
