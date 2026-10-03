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

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get five sample users
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       age:
 *                         type: number
 */
app.get("/users", (req, res) => {
  const users = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 32 },
    { name: "Charlie", age: 25 },
    { name: "Diana", age: 30 },
    { name: "Ethan", age: 27 }
  ];

  res.json({ users });
});

if (require.main === module) {
  app.listen(PORT, () => {
    if (NODE_ENV === "production") {
      console.log(`Production server running on port ${PORT}`);
      console.log(`Swagger UI available at https://azure-node-app-aqcfgybya0e4d6e5.centralindia-01.azurewebsites.net/api-docs`);
    } else {
      console.log(`Development server running on port ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    }
  });
}

module.exports = { app, PORT };