import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Convert a hosting-injected legacy option before npm reads its environment. */
export function normalizeNpmEnvironment(source) {
  const env = { ...source };
  const currentKey = Object.keys(env).find(key => /^npm_config_cache$/i.test(key));
  for (const key of Object.keys(env)) {
    if (!/^npm_config_cache[-_]dir$/i.test(key)) continue;
    if (!currentKey && !env.npm_config_cache && env[key]) env.npm_config_cache = env[key];
    delete env[key];
  }
  return env;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const env = normalizeNpmEnvironment(process.env);
  const args = process.argv.slice(2);
  if (!args.length) throw new Error('Expected npm arguments');
  const npmCli = env.npm_execpath;
  const result = npmCli?.endsWith('npm-cli.js')
    ? spawnSync(process.execPath, [npmCli, ...args], { env, stdio: 'inherit' })
    : spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, {
      env, stdio: 'inherit', shell: process.platform === 'win32',
      cwd: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
    });
  if (result.error) throw result.error;
  process.exit(result.status ?? 1);
}
