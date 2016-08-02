import express from 'express';
import { apolloServer } from 'apollo-server';
import http from 'http';
import SocketIO from 'socket.io';

import { apiHost, apiPort } from '../config';
import { schema, resolvers } from './graphql/schema';
import { User } from './models';

const app = new express();
const server = http.Server(app);
const io = new SocketIO(server);
io.path('/ws');

app.use('/graphql', apolloServer(async (req) => ({
  schema,
  resolvers,
  graphiql: true,
  pretty: true,
  context: {
    user: await User.fromToken(req.headers.authorization).catch(() => {})
  }
})));

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (apiPort) {
  const runnable = app.listen(apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', apiHost, apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
