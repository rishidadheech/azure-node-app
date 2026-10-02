const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { NODE_ENV, API_BASE_URL, PORT } = require("./config/env");

function setupSwagger(app) {
  const serverUrl = API_BASE_URL || (NODE_ENV === "production"
    ? "https://azure-node-app-aqcfgybya0e4d6e5.centralindia-01.azurewebsites.net"
    : `http://localhost:${PORT}`);

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Azure Node App API",
        version: "1.0.0",
        description: "Swagger documentation for the Azure Node application"
      },
      servers: [
        {
          url: serverUrl,
          description: NODE_ENV === "production" ? "Production server" : "Development server"
        }
      ]
    },
    apis: ["./server.js"]
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return swaggerSpec;
}

module.exports = { setupSwagger };
