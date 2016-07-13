import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIO from 'socket.io';
import config from '../config';
import Schema from './graphql/schema';

const app = new express();
const server = http.Server(app);
const pretty = new PrettyError();
const io = new SocketIO(server);
io.path('/ws');

// middlewares
app.use(bodyParser.text({ type: 'application/graphql' }));
app.use(helmet());

// setup graphql server
app.use('/', graphqlHTTP({
  schema: Schema,
  graphiql: true,
  pretty: true
}));

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
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
