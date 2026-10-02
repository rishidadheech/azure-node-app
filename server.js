const express = require("express");
const { PORT, NODE_ENV } = require("./config/env");
const { setupSwagger } = require("./swagger");

const app = express();

setupSwagger(app);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Get the app welcome message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 environment:
 *                   type: string
 */
app.get("/", (req, res) => {
  res.json({
    message: "Hello from Azure! another test",
    environment: NODE_ENV
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = { app, PORT };