import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';

const withServer = async (fn) => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
};

test('GET /api/health returns success', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.success, true);
  });
});

test('unknown route returns 404', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/unknown-route`);
    assert.equal(response.status, 404);
  });
});
