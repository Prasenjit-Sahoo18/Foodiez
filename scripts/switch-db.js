const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2];

if (target !== 'sqlite' && target !== 'postgres' && target !== 'postgresql') {
  console.log('Usage: node scripts/switch-db.js [sqlite|postgres]');
  process.exit(1);
}

const sourceFile = target === 'sqlite' 
  ? path.join(__dirname, '..', 'prisma', 'schema.sqlite.prisma')
  : path.join(__dirname, '..', 'prisma', 'schema.postgresql.prisma');

const destFile = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(sourceFile)) {
  console.error(`Source schema file not found: ${sourceFile}`);
  process.exit(1);
}

fs.copyFileSync(sourceFile, destFile);
console.log(`[SUCCESS] Switched Prisma schema provider to ${target.toUpperCase()}`);

try {
  console.log('[INFO] Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('[SUCCESS] Prisma client regenerated successfully!');
} catch (e) {
  console.error('[ERROR] Failed to generate prisma client:', e.message);
}
