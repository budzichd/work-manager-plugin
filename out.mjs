// create dist directory for static Chrome Extension
import { writeFileSync, rename, readFileSync } from 'node:fs';
import { globSync } from 'glob';

const files = globSync('dist/**/*.html');
files.forEach((file) => {
  const content = readFileSync(file, 'utf-8');
  const modifiedContent = content.replace(/\/_next/g, './next');
  writeFileSync(file, modifiedContent, 'utf-8');
});

const sourcePath = 'dist/_next';
const destinationPath = 'dist/next';

rename(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error('Failed to rename "_next" directory to "next".', err);
  } else {
    console.log('Renamed "_next" directory to "next" successfully.');
  }
});