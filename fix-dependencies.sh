#!/bin/bash

echo "Fixing dependencies for norgeskart3..."

# Install latest liftup module
npm install liftup --save-dev

# Install findup-sync which is needed by liftup
npm install findup-sync --save-dev

# Check if Ruby and Compass are installed
if ! command -v ruby >/dev/null 2>&1; then
  echo "Ruby is not installed. Please install Ruby."
  echo "On Ubuntu/Debian: sudo apt install ruby-full"
  echo "On macOS: brew install ruby"
  exit 1
fi

if ! command -v compass >/dev/null 2>&1; then
  echo "Compass is not installed. Installing Compass..."
  sudo gem install compass
fi

# Check grunt-cli installation
if ! command -v grunt >/dev/null 2>&1; then
  echo "grunt-cli is not installed globally. Installing grunt-cli..."
  npm install -g grunt-cli
fi

# Force reinstall grunt-contrib-compass
npm uninstall grunt-contrib-compass
npm install grunt-contrib-compass --save-dev

# Fix any other potential dependencies
npm install grunt
npm install grunt-terser

echo "Dependencies fixed! Now run 'npm run build' to build the project."
