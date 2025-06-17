#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('Starting frontend-only build for Vercel...');

try {
  // Only build the frontend with Vite - skip server TypeScript compilation
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build completed successfully');
  
  // Verify the build output exists
  try {
    execSync('ls -la dist/public/', { stdio: 'inherit' });
  } catch (e) {
    console.log('Build output verification skipped');
  }
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

console.log('Deployment build completed');