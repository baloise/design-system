import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Files to copy from root to each package
const FILES_TO_COPY = ['README.md', 'LICENSE']

// Read root package.json to get workspaces
const rootPkgJson = fs.readJsonSync(path.join(rootDir, 'package.json'))
const workspacePatterns = rootPkgJson.workspaces || []

console.log('🚀 Pre-Publish: Copying root files to publishable packages...\n')

// Expand glob patterns to actual package paths
const publishablePackages = []

for (const pattern of workspacePatterns) {
  const globPattern = path.join(rootDir, pattern, 'package.json')
  const matches = glob.sync(globPattern, { ignore: '**/node_modules/**' })

  for (const match of matches) {
    const pkgPath = path.dirname(match)
    const pkgJson = fs.readJsonSync(match)

    // Skip private packages
    if (pkgJson.private === true) {
      console.log(`⏭️  Skipping ${path.relative(rootDir, pkgPath)} (marked as private)`)
      continue
    }

    // Skip packages without a name (not meant to be published)
    if (!pkgJson.name) {
      console.log(`⏭️  Skipping ${path.relative(rootDir, pkgPath)} (no package name)`)
      continue
    }

    publishablePackages.push(pkgPath)
  }
}

// Copy files to each publishable package
for (const pkgPath of publishablePackages) {
  const pkgName = path.relative(rootDir, pkgPath)

  for (const file of FILES_TO_COPY) {
    const srcFile = path.join(rootDir, file)
    const destFile = path.join(pkgPath, file)

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile)
      console.log(`✅ ${pkgName}/${file}`)
    } else {
      console.log(`⚠️  ${file} not found in root`)
    }
  }
}

console.log(`\n✨ Pre-Publish complete! Processed ${publishablePackages.length} packages.`)
