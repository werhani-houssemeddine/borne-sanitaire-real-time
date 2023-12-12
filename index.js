const express = require('express');
const process = require('process'); 
const { initRealTimeServer } = require('./real-time');

const { deviceRoute } = require('./router');

const app = express();

app.use('/', deviceRoute);

process.on('uncaughtException', err => {
  app.use((req, res) => {});
});

initRealTimeServer(app);
