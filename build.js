#!/usr/bin/env node

// Simple build script that only builds the frontend for Vercel
import { execSync } from 'child_process';

console.log('Building frontend for Vercel deployment...');

try {
  // Only run vite build (frontend) - skip server TypeScript compilation
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  console.log('Frontend build completed successfully');
  console.log('Output directory: dist/public');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}