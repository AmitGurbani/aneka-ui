#!/usr/bin/env node

/**
 * Syncs components from registry to storybook
 * Run with: node scripts/sync-storybook-components.js
 */

import { cpSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const registryDir = resolve(rootDir, 'registry/react');
const storybookDir = resolve(rootDir, 'storybook/src/components');

console.log('Syncing components from registry to storybook...');
console.log(`From: ${registryDir}`);
console.log(`To: ${storybookDir}`);

try {
  cpSync(registryDir, storybookDir, { recursive: true });
  console.log('✅ Components synced successfully!');
} catch (error) {
  console.error('❌ Error syncing components:', error.message);
  process.exit(1);
}
