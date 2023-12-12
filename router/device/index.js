const { Router } = require('express');
const { makeRequest } = require('../../lib');
const DeviceController = require('./DeviceController');

const route = Router();

route.get('/current-device/:id', makeRequest(DeviceController.getCurrentVisitorsNumber));

module.exports = route