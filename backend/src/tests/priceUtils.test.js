import test from 'node:test';
import assert from 'node:assert/strict';
import { findCheapest, sortByPrice } from '../utils/priceUtils.js';

test('sortByPrice sorts medicines by ascending price', () => {
  const result = sortByPrice([
    { name: 'A', price: 30 },
    { name: 'B', price: 10 },
    { name: 'C', price: 20 }
  ]);

  assert.deepEqual(
    result.map((m) => m.name),
    ['B', 'C', 'A']
  );
});

test('findCheapest returns first cheapest medicine', () => {
  const result = findCheapest([
    { name: 'A', price: 42 },
    { name: 'B', price: 14 }
  ]);

  assert.equal(result.name, 'B');
});
