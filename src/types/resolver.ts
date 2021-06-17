import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { RedisClient } from 'redis';

export type Context = {
  req: Request;
  res: Response;
  io: Server;
  storage: RedisClient;
};
