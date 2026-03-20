import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

for (const relativePath of ['.next/types', '.next/dev/types']) {
  const targetPath = path.join(repoRoot, relativePath);

  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
  } catch {
    // Best-effort cleanup: typecheck can continue if these paths do not exist.
  }
}
