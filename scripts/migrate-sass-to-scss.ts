#!/usr/bin/env node

import * as fs from 'fs'
import { glob } from 'glob'
import * as path from 'path'
import { convertSassToScss } from './convertSassToScss'

interface MigrationOptions {
  sourceDir: string
  pattern?: string
  dryRun?: boolean
  outputDir?: string
}

/**
 * Migrate .sass files to .scss files
 */
async function migrateSassToScss(options: MigrationOptions): Promise<void> {
  const { sourceDir, pattern = '**/*.sass', dryRun = false, outputDir } = options

  console.log('🔍 Searching for .sass files...')
  console.log(`   Source directory: ${sourceDir}`)
  console.log(`   Pattern: ${pattern}`)
  console.log(`   Dry run: ${dryRun ? 'Yes' : 'No'}`)
  if (outputDir) {
    console.log(`   Output directory: ${outputDir}`)
  }
  console.log('')

  // Find all .sass files
  const sassFiles = await glob(pattern, {
    cwd: sourceDir,
    absolute: false,
    nodir: true,
  })

  if (sassFiles.length === 0) {
    console.log('❌ No .sass files found.')
    return
  }

  console.log(`✅ Found ${sassFiles.length} .sass file(s):\n`)

  let successCount = 0
  let errorCount = 0

  for (const relativePath of sassFiles) {
    const sassFilePath = path.join(sourceDir, relativePath)
    const scssRelativePath = relativePath.replace(/\.sass$/, '.scss')
    const scssFilePath = outputDir ? path.join(outputDir, scssRelativePath) : path.join(sourceDir, scssRelativePath)

    try {
      // Read the .sass file
      const sassContent = fs.readFileSync(sassFilePath, 'utf-8')

      // Convert to .scss
      const scssContent = await convertSassToScss(sassContent)

      if (dryRun) {
        console.log(`   Would write to: ${outputDir ? path.relative(sourceDir, scssFilePath) : scssRelativePath}`)
        console.log(`   Preview (first 200 chars):`)
        console.log(`   ${scssContent.substring(0, 200).replace(/\n/g, '\n   ')}...`)
      } else {
        // Ensure output directory exists
        const scssDir = path.dirname(scssFilePath)
        if (!fs.existsSync(scssDir)) {
          fs.mkdirSync(scssDir, { recursive: true })
        }

        // Write the .scss file
        fs.writeFileSync(scssFilePath, scssContent, 'utf-8')

        // Delete original .sass file
        fs.unlinkSync(sassFilePath)

        // console.log(`   ✅ Written to: ${outputDir ? path.relative(sourceDir, scssFilePath) : scssRelativePath}`)
      }

      successCount++
      // console.log('')
    } catch (error) {
      console.log(`📝 Processing: ${relativePath}`)
      console.error(`   ❌ Error processing file: ${error instanceof Error ? error.message : String(error)}`)
      errorCount++
      // console.log('')
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Migration Summary:')
  console.log(`   Total files: ${sassFiles.length}`)
  console.log(`   Successful: ${successCount}`)
  console.log(`   Errors: ${errorCount}`)
  if (dryRun) {
    console.log('\n⚠️  This was a dry run. No files were written.')
    console.log('   Run without --dry-run to actually migrate the files.')
  } else {
    console.log('\n✅ Migration complete!')
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(): MigrationOptions {
  const args = process.argv.slice(2)
  const options: MigrationOptions = {
    sourceDir: process.cwd(),
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    switch (arg) {
      case '--source':
      case '-s':
        options.sourceDir = args[++i]
        break
      case '--pattern':
      case '-p':
        options.pattern = args[++i]
        break
      case '--output':
      case '-o':
        options.outputDir = args[++i]
        break
      case '--dry-run':
      case '-d':
        options.dryRun = true
        break
      case '--help':
      case '-h':
        printHelp()
        process.exit(0)
        break
      default:
        if (!arg.startsWith('-')) {
          options.sourceDir = arg
        }
    }
  }

  return options
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
🔄 Sass to SCSS Migration Tool

Usage:
  npm run migrate:sass [options] [sourceDir]

Options:
  -s, --source <dir>     Source directory to search for .sass files (default: current directory)
  -p, --pattern <glob>   Glob pattern to match .sass files (default: **/*.sass)
  -o, --output <dir>     Output directory for .scss files (default: same as source)
  -d, --dry-run          Preview changes without writing files
  -h, --help             Show this help message

Examples:
  # Migrate all .sass files in packages/styles
  npm run migrate:sass packages/styles

  # Dry run to preview changes
  npm run migrate:sass packages/styles --dry-run

  # Specify custom pattern
  npm run migrate:sass --source packages --pattern "**/components/**/*.sass"

  # Output to different directory
  npm run migrate:sass packages/styles --output packages/styles-scss
`)
}

// Main execution
if (require.main === module) {
  const options = parseArgs()
  migrateSassToScss(options).catch(error => {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  })
}

export { migrateSassToScss }
