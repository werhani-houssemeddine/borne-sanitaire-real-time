const handleError = require('../handle_error');
const { checkDevice } = require('./check_device');

module.exports = (io) => {
  const device = io.of('/device');

  device.use(async (socket, next) => {
    const deviceId = socket.handshake.query.deviceId;
    const is_deviceValid = await checkDevice(deviceId);

    if (is_deviceValid === null) {
      return handleError(socket, {
        message: "deviceId: Missing or expired",
        status : 400
      });
    }

    next();

  });

  device.on('connection', socket => {
    console.log('New connection is made');
    socket.on('message', message => {
      try {
        console.log('a new message apperead ', message);
      } catch (error) {
        console.error('Error processing message:', error); 
      }
    });
  });

}