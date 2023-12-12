const { Router } = require('express');
const route = Router();

const deviceRoute = require('./device');

module.exports = {
  deviceRoute: route.use('/device', deviceRoute),
}