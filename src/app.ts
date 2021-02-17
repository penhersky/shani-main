import 'dotenv-flow/config';
import http from 'http';
import express from 'express';
import sockets from 'socket.io';
import rateLimit from 'express-rate-limit';
import redis from 'redis';
import { graphql } from 'body-parser-graphql';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import 'apollo-cache-control';
import cors from 'cors';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import connect, { middleware } from './io';

import database from './database';
import {
  PORT,
  DB_STR_URL,
  MAX_NOTIFICATION_LISTENERS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
} from './config';
import { logInfo, logError } from './lib/logger';

const app = express();
const server = new http.Server(app);
const io = new sockets.Server(server, {
  cors: { origin: '*' },
  path: '/notification',
});
const client = redis.createClient({
  db: REDIS_DB,
  port: Number(REDIS_PORT),
  host: String(REDIS_HOST),
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

app.use('*', cors());
app.use(limiter);
app.use(graphql());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, io, storage: client }),
  cacheControl: {
    defaultMaxAge: 10,
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

database(String(DB_STR_URL));
client.on('error', (error) => {
  logError(error);
});

io.setMaxListeners(Number(MAX_NOTIFICATION_LISTENERS));
io.use((socket: any, next: any) => middleware(socket, next, client));
io.on('connection', (socket: any) => connect(socket, client));

server.listen({ port: PORT }, () =>
  logInfo(
    `🚀 Server ready at 🔗 http://localhost:${PORT}${apolloServer.graphqlPath}`,
  ),
);
