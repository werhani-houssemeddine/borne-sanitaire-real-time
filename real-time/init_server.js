const { PORT, HOST } = require('../config');

const { createServer } = require('http');
const { Server } = require('socket.io');

function realTimeServer(app) {
  const server = createServer(app);
  const io = new Server(server, { cors: '*' });

  server.listen(PORT, HOST, () => console.log(`Web Socket server running on ${HOST}:${PORT}`));

  return io;
}

module.exports = {
  io: app => realTimeServer(app)
};
