import { Socket } from 'socket.io';
import { RedisClient } from 'redis';

export { default as middleware } from './middleware';
export { default as events } from './events';
export { sendMany, sendOne } from './wrappers';

export default (socket: Socket, client: RedisClient) => {
  socket.on('message', (data: any) => {
    socket.emit('message', { message: `send: ${data.message}` });
  });
  socket.on('disconnect', (dis) => {
    console.log(dis);
    console.log(`User disconnected! id: ${dis.id}`);
  });
};
