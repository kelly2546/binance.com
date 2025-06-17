#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';

console.log('Building frontend for Vercel deployment...');

try {
  // Only run vite build (frontend) - skip server TypeScript compilation
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Frontend build completed successfully');
  console.log('Output directory: dist/public');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}