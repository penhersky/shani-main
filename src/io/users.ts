const users = new Map(); // by redis

export const add = (userID: string, socketId: string) =>
  users.set(userID, socketId);
export const getSocketId = (userID: string) => users.get(userID);
