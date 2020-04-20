const opn = require('opn');
const express = require('express');
const livereload = require('livereload');
const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/www");

const app = express();
app.use(connectLivereload());
app.use(express.static('www'));
app.listen(3333, function () {
  console.log('');
  console.log('[server] serving http://localhost:3333');
  console.log('');
  opn('http://localhost:3333');
});