#!/usr/bin/env node

// Custom build script for Vercel deployment
import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

console.log('Starting Vercel build process...');

try {
  // Ensure output directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  if (!existsSync('dist/public')) {
    mkdirSync('dist/public', { recursive: true });
  }

  console.log('Building frontend with Vite...');
  
  // Run vite build with specific configuration for Vercel
  execSync('NODE_ENV=production vite build --mode production --outDir dist/public', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });

  console.log('Build completed successfully!');
  console.log('Output directory: dist/public');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}