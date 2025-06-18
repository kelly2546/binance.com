#!/bin/bash
echo "Building frontend only for Vercel deployment..."
vite build
echo "Frontend build complete - skipping server compilation for serverless functions"