const { deviceEntity } = require('../../../entities');
const handleError = require('../handle_error');
const { checkDevice } = require('./check_device');

module.exports = (io) => {
  const deviceIO = io.of('/device');

  deviceIO.use(async (socket, next) => {
    const deviceId = socket.handshake.query.deviceId;
    const isDeviceValid = await checkDevice(deviceId);
    
    if (isDeviceValid === null) {
      handleError(socket, {
        message: "deviceId: Missing or expired",
        status : 400
      });
      
    } else {
      try {
        const deviceId = isDeviceValid.deviceId;

        const deviceProperties = {
          current_visitors: 0,
          max_visitors    : isDeviceValid.max_visitors,
          socket_id       : socket.id,
        };

        deviceEntity.setNewDevice(deviceId, deviceProperties);
        
      } catch (error) {
        console.log({error});
      }

      next();

    }

  });

  deviceIO.on('connection', socket => {
    
    try {
      const deviceId = deviceEntity.getDeviceIDBySocketId(socket.id);
      const device   = deviceEntity.getDeviceById(deviceId);

      deviceIO.to(socket.id)
        .emit('handshake', JSON.stringify({
          'current_visitors': device.current_visitors,
          'max_visitors'    : device.max_visitors,
        }));
      
    } catch (error) {
      console.log({ error });
    }

    socket.on('disconnect', () => {
      deviceEntity.removeSocketId(socket.id);
    });
  });
  
}
