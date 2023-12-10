const fetch = require('node-fetch');
const { SERVER_BASE_URL } = require('../../../config')

async function checkDevice(deviceId) {
  if (deviceId == undefined){
    return null;
  }

  try {
    const URL = `${SERVER_BASE_URL}/api/client/device/info/${deviceId}`;
  
    const response = await fetch(URL);
    const data = await response.json();

    if(data?.error === true) return null;

    return {
      max_visitors : data?.data?.max_visitors,
      deviceId     : deviceId,
    }
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { checkDevice }