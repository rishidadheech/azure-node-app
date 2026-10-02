const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT, API_BASE_URL } = require("./config/env");

function setupSwagger(app) {
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
          url: API_BASE_URL || `http://localhost:${PORT}`,
          description: "API server"
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
