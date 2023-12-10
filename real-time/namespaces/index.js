
module.exports = (io) => {
  require('./admin_namespace')(io);
  require('./agent_namespace')(io);
  require('./device')(io);
}