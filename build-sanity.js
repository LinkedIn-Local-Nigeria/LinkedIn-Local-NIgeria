import { dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'fs';

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get absolute paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = process.cwd();
const sanityDir = join(rootDir, 'lln-project');
const outputDir = join(rootDir, 'dist', 'studio').replace(/\\/g, '/');

console.log('Building Sanity Studio...');
console.log(`Root directory: ${rootDir}`);
console.log(`Sanity directory: ${sanityDir}`);
console.log(`Output directory: ${outputDir}`);

try {
  // Ensure output directory's parent exists
  mkdirSync(dirname(outputDir), { recursive: true });

  // Remove existing studio build if it exists
  if (existsSync(outputDir)) {
    console.log('Removing existing studio build...');
    rmSync(outputDir, { recursive: true, force: true });
  }

  // Change to sanity directory
  console.log('Changing to Sanity directory...');
  process.chdir(sanityDir);

  // Run Sanity build
  console.log('Running Sanity build...');
  execSync(`npx sanity build "${outputDir}" --yes --verbose`, {
    stdio: 'inherit',
  });

  // Post-process files to fix paths
  console.log('Patching asset paths in files...');
  const patchFiles = (dir) => {
    const files = readdirSync(dir);
    files.forEach((file) => {
      const filePath = join(dir, file);
      if (statSync(filePath).isDirectory()) {
        patchFiles(filePath); // Recurse into directories
      } else if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.css')) {
        let content = readFileSync(filePath, 'utf8');
        // Fix double /studio/studio/ to /studio/
        content = content.replace(/\/studio\/studio\//g, '/studio/');
        // Fix /vendor/... to /studio/vendor/...
        content = content.replace(/(href|src)="\/vendor\//g, '$1="/studio/vendor/');
        content = content.replace(/\/vendor\//g, '/studio/vendor/');
        // Fix /static/... to /studio/static/... (only if not already prefixed)
        content = content.replace(/(href|src)="\/static\//g, '$1="/studio/static/');
        content = content.replace(/(?<!\/studio)\/static\//g, '/studio/static/');
        writeFileSync(filePath, content, 'utf8');
      }
    });
  };
  patchFiles(outputDir);
  console.log('✓ Patched asset and vendor paths');

  // Move vendor files to dist/studio/vendor/ if they are in dist/studio/static/vendor/
  const staticVendorDir = join(outputDir, 'static', 'vendor');
  const vendorDir = join(outputDir, 'vendor');
  if (existsSync(staticVendorDir)) {
    console.log('Moving vendor files to dist/studio/vendor...');
    if (!existsSync(vendorDir)) {
      mkdirSync(vendorDir, { recursive: true });
    }
    readdirSync(staticVendorDir).forEach((file) => {
      const srcPath = join(staticVendorDir, file);
      const destPath = join(vendorDir, file);
      if (statSync(srcPath).isDirectory()) {
        // Recursively move subdirectories (e.g., react, react-dom)
        const subDir = join(vendorDir, file);
        mkdirSync(subDir, { recursive: true });
        readdirSync(srcPath).forEach((subFile) => {
          rmSync(join(srcPath, subFile), { force: true });
          renameSync(join(srcPath, subFile), join(subDir, subFile));
        });
        rmSync(srcPath, { recursive: true, force: true });
      } else {
        renameSync(srcPath, destPath);
      }
    });
    console.log('✓ Moved vendor files');
  }

  console.log('✓ Sanity Studio built successfully');
} catch (error) {
  console.error('✗ Sanity build failed:', error.message);
  process.exit(1);
} finally {
  // Return to root directory
  process.chdir(rootDir);
}