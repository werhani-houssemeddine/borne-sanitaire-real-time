require('dotenv').config();

const isProductionEnvironment = process.env.NODE_ENV === "production";
const getEnvironmentVariable  = (variable) => process.env[variable];

const getVariable = (production, development) => 
  isProductionEnvironment === true ? getEnvironmentVariable(production) : getEnvironmentVariable(development)

const PORT = getVariable('REAL_TIME_SERVER_PORT_PRO', 'REAL_TIME_SERVER_PORT_DEV');
const HOST = getVariable('REAL_TIME_SERVER_HOST_PRO', 'REAL_TIME_SERVER_HOST_DEV');

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

module.exports = {
  PORT,
  HOST,
  SERVER_BASE_URL,
};