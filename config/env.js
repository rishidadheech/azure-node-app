const isProduction = process.env.NODE_ENV === "production";

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  API_BASE_URL: isProduction
    ? process.env.API_BASE_URL || "https://azure-node-app-aqcfgybya0e4d6e5.centralindia-01.azurewebsites.net"
    : process.env.API_BASE_URL || "http://localhost:3000",
  CLIENT_URL: isProduction
    ? process.env.CLIENT_URL || "https://azure-node-app-aqcfgybya0e4d6e5.centralindia-01.azurewebsites.net"
    : process.env.CLIENT_URL || "http://localhost:3000"
};

module.exports = env;
