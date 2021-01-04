import { Socket } from 'socket.io';
import { RedisClient } from 'redis';

export { default as middleware } from './middleware';
export { default as events } from './events';
export { sendMany, sendOne } from './wrappers';

export default (socket: Socket, client: RedisClient) => {
  socket.on('message', (data: any) => {
    client.keys('*', (_, keys) => console.log(keys));
    socket.emit('message', { message: `send: ${data.message}` });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};
