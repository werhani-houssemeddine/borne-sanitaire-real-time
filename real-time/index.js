const { io } = require("./init_server");
const namespaces = require('./namespaces');

module.exports = {
  initRealTimeServer: express_app => {
    namespaces(io(express_app))
  }
}
