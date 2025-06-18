#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Building frontend for Vercel deployment...');

try {
  // Only build the frontend - no server compilation needed for serverless
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}