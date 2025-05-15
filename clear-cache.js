/**
 * This script cleans the Next.js cache and refreshes the development server.
 * Run it with: node clear-cache.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to clear
const pathsToDelete = [
  '.next/cache',
  '.next/server',
  '.next/static'
];

console.log('Cleaning Next.js cache...');

// Delete cache directories
pathsToDelete.forEach(p => {
  const fullPath = path.join(process.cwd(), p);
  
  if (fs.existsSync(fullPath)) {
    try {
      console.log(`Removing ${p}...`);
      fs.rmSync(fullPath, { recursive: true });
    } catch (err) {
      console.error(`Error removing ${p}:`, err);
    }
  }
});

console.log('Cache cleared successfully!');
console.log('');
console.log('Please run the following commands:');
console.log('1. npm run build');
console.log('2. npm run dev');
console.log('');
console.log('Then clear your browser cookies and localStorage before testing again.'); 