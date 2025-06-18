#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building frontend for Vercel deployment with mobile optimizations...');

// Mobile-optimized build settings
process.env.VITE_BUILD_TARGET = 'mobile-first';
process.env.VITE_OPTIMIZE_IMAGES = 'true';

try {
  // Build the frontend with mobile optimizations
  execSync('vite build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Frontend build completed successfully');
  
  // Add mobile-specific optimizations to the built files
  const distDir = path.join(process.cwd(), 'client', 'dist');
  
  if (fs.existsSync(distDir)) {
    // Add mobile optimization meta tags to index.html
    const indexPath = path.join(distDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Enhanced mobile meta tags
      const mobileMetaTags = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#181A20">
    <meta name="apple-mobile-web-app-title" content="Crypto Trading Platform">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Advanced cryptocurrency trading platform with real-time market data, portfolio management, and secure trading features.">
    <meta name="keywords" content="cryptocurrency, trading, bitcoin, ethereum, crypto exchange, portfolio management">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Advanced Cryptocurrency Trading Platform">
    <meta property="og:description" content="Trade cryptocurrencies with advanced tools, real-time market data, and secure portfolio management.">
    <meta property="og:type" content="website">
    
    <!-- Performance optimizations -->
    <link rel="preconnect" href="https://api.coingecko.com">
    <link rel="dns-prefetch" href="https://api.coingecko.com">
    `;
      
      // Insert meta tags after the existing head opening tag
      indexContent = indexContent.replace('<head>', `<head>${mobileMetaTags}`);
      
      fs.writeFileSync(indexPath, indexContent);
      console.log('Mobile meta tags added to index.html');
    }
    
    // Create robots.txt for SEO
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard
Disallow: /withdraw`;
    
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
    console.log('SEO files created');
  }
  
  console.log('Mobile-optimized build completed successfully');
  console.log('Output directory: client/dist');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}