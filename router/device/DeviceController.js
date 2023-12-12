const { deviceEntity } = require("../../entities");

module.exports = {
  getCurrentVisitorsNumber:  async (httpRequest) => {
    const { id } = httpRequest.params;

    const current_visitors = deviceEntity.getCurrentDeviceVisitors(id);

    return { 
      status: 200, 
      body: { current_visitors } 
    }

  },
}
