#!/bin/bash
echo "Preparing deployment without TypeScript compilation..."

# Create a simple build directory structure
mkdir -p deploy/api
mkdir -p deploy/public

# Copy API files
cp api/index.js deploy/api/

# Copy frontend files (if they exist from previous build)
if [ -d "dist/public" ]; then
  cp -r dist/public/* deploy/public/
else
  # Create minimal index.html for deployment
  cat > deploy/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptocurrency Trading Platform</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
</head>
<body>
    <div id="root">
        <h1>Cryptocurrency Trading Platform</h1>
        <p>Loading...</p>
    </div>
</body>
</html>
EOF
fi

echo "Deployment files prepared in deploy/ directory"