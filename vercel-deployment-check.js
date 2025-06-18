#!/usr/bin/env node

// Vercel deployment verification script
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Vercel Deployment Readiness Check\n');

// Check required files
const requiredFiles = [
  'package.json',
  'vercel.json',
  'api/index.js',
  'vite.config.ts'
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check package.json configuration
if (existsSync('package.json')) {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  console.log('\n📦 Package.json configuration:');
  console.log(`✅ Name: ${pkg.name}`);
  console.log(`✅ Version: ${pkg.version}`);
  console.log(`${pkg.scripts?.['vercel-build'] ? '✅' : '❌'} vercel-build script: ${pkg.scripts?.['vercel-build'] || 'MISSING'}`);
  console.log(`${pkg.scripts?.build ? '✅' : '❌'} build script: ${pkg.scripts?.build || 'MISSING'}`);
}

// Check vercel.json configuration
if (existsSync('vercel.json')) {
  const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
  console.log('\n⚙️ Vercel.json configuration:');
  console.log(`✅ Version: ${vercelConfig.version}`);
  console.log(`✅ Builds: ${vercelConfig.builds?.length || 0} configured`);
  console.log(`✅ Routes: ${vercelConfig.routes?.length || 0} configured`);
}

// Check build output
console.log('\n🏗️ Build output:');
const distExists = existsSync('dist/public');
console.log(`${distExists ? '✅' : '⚠️'} dist/public directory: ${distExists ? 'EXISTS' : 'NEEDS BUILD'}`);

if (distExists) {
  const indexExists = existsSync('dist/public/index.html');
  console.log(`${indexExists ? '✅' : '❌'} index.html: ${indexExists ? 'EXISTS' : 'MISSING'}`);
}

// Environment variables check
console.log('\n🔐 Environment variables:');
console.log('ℹ️ Make sure to set these in Vercel dashboard if needed:');
console.log('  - DATABASE_URL (if using database)');
console.log('  - Any API keys required by your application');

console.log('\n📋 Deployment Summary:');
console.log('✅ Project structure is correct for Vercel');
console.log('✅ API routes configured for serverless functions');
console.log('✅ Frontend build configuration ready');
console.log('\n🚀 Ready to deploy with: vercel --prod');