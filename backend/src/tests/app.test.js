import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../app.js';

test('GET /api/health returns success', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.success, true);
});

test('unknown route returns 404', async () => {
  const response = await request(app).get('/api/unknown-route');
  assert.equal(response.statusCode, 404);
});
