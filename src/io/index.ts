import { Socket } from 'socket.io';

export { default as middleware } from './middleware';

export default (socket: Socket) => {
  console.log('connected');
  socket.on('test', (data: any) => {
    console.log(data);
    console.log(socket);
    socket.send(`new message "${data.message}" `);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};
