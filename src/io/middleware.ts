import { Socket } from 'socket.io';

export default (socket: Socket, next: any) => {
  console.log('socket', socket);
  next();
};
