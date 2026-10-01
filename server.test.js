const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('./server');

const { createServer } = require('node:http');

function makeRequest(appInstance, path = '/') {
  return new Promise((resolve, reject) => {
    const server = createServer(appInstance);
    server.listen(0, () => {
      const { port } = server.address();
      const req = require('node:http').get({ host: '127.0.0.1', port, path }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          server.close();
          resolve({ statusCode: res.statusCode, body: data });
        });
      });
      req.on('error', (err) => {
        server.close();
        reject(err);
      });
    });
  });
}

test('GET / returns hello message and environment', async () => {
  const response = await makeRequest(app);

  assert.equal(response.statusCode, 200);
  const parsed = JSON.parse(response.body);
  assert.equal(parsed.message, 'Hello from Azure! another test');
  assert.equal(parsed.environment, 'development');
});
