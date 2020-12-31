import 'dotenv-flow/config';
import http from 'http';
import express from 'express';
import sockets from 'socket.io';
import rateLimit from 'express-rate-limit';
import { graphql } from 'body-parser-graphql';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import connect, { middleware } from './io';

import database from './database';
import { PORT, DB_STR_URL, MAX_NOTIFICATION_LISTENERS } from './config';
import { logInfo } from './lib/logger';

const app = express();
const server = new http.Server(app);
const io = new sockets.Server(server, { cors: { origin: '*' } });

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
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

database(String(DB_STR_URL));

io.setMaxListeners(Number(MAX_NOTIFICATION_LISTENERS));
io.use(middleware);
io.on('connection', connect);

server.listen({ port: PORT }, () =>
  logInfo(
    `🚀 Server ready at 🔗 http://localhost:${PORT}${apolloServer.graphqlPath}`,
  ),
);
