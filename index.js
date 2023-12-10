const express = require('express');
const process = require('process'); 
const { initRealTimeServer } = require('./real-time');

const app = express();

process.on('uncaughtException', err => {
  app.use((req, res) => {});
});

initRealTimeServer(app);
