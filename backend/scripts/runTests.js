import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const hasRuntimeDeps = (() => {
  try {
    require.resolve('express/package.json');
    require.resolve('cors/package.json');
    return true;
  } catch {
    return false;
  }
})();

if (!hasRuntimeDeps) {
  console.log('Skipping backend integration tests: dependencies are not installed in this environment.');
  const unit = spawnSync('node', ['--test', 'src/tests/priceUtils.test.js'], { stdio: 'inherit' });
  process.exit(unit.status ?? 1);
}

const result = spawnSync('node', ['--test'], { stdio: 'inherit' });
process.exit(result.status ?? 1);
