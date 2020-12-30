import 'dotenv-flow/config';
import http from 'http';
import express from 'express';
// import sockets, { Socket } from 'socket.io';
import rateLimit from 'express-rate-limit';
import { graphql } from 'body-parser-graphql';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';

import typeDefs from './typeDefs';

import database from './database';
import { PORT, DB_STR_URL } from './config';
import { logInfo } from './lib/logger';

const app = express();
const server = new http.Server(app);
// const io = new sockets.Server(server, { cors: { origin: '*' } });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

app.use('*', cors());
app.use(limiter);
app.use(graphql());

const resolvers = {
  Query: {},
};

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

server.listen({ port: PORT }, () =>
  logInfo(
    `🚀 Server ready at 🔗 http://localhost:${PORT}${apolloServer.graphqlPath}`,
  ),
);

// temp
// io.setMaxListeners(200);
// io.use((socket, next) => {
//   console.log('socket', socket);
//   next();
// });
// io.on('connection', (socket: Socket) => {
//   console.log('connected');
//   socket.on('test', (data: any) => {
//     console.log(data);
//     console.log(socket);
//     socket.send(`new message "${data.message}" `);
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
