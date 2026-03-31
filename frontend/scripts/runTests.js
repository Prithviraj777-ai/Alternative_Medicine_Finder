import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

try {
  require.resolve('vitest/package.json');
  const result = spawnSync('npx', ['vitest', 'run'], { stdio: 'inherit', shell: true });
  process.exit(result.status ?? 1);
} catch {
  console.log('Skipping frontend tests: vitest is not installed in this environment.');
  process.exit(0);
}
