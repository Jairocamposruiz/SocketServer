const express = require('express');
const socketIO = require('socket.io');
const { createServer } = require('http');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');
const { app } = require('../config');


class Server {

  constructor() {
    //Server Express
    this.app = express();
    this.port = app.port;

    //SocketIO
    this.server = createServer(this.app);
    this.io = socketIO(this.server);

    //Middlewares
    this.middlewares();

    //Sockets
    this.configSockets();
  }

  middlewares() {
    this.app.use(express.static( path.resolve(__dirname, '../public')));
    this.app.use(cors);
  }

  configSockets() {
    new Sockets(this.io);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`App running in http://localhost:${this.port}`);
    })
  }
}

module.exports = Server;
