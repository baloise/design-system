const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const fileChanges = process.env.NX_FILE_CHANGES || ''

if (fileChanges) {
  const files = fileChanges
    .split(',')
    .map(f => f.trim())
    .filter(Boolean)
    .filter(f => f.endsWith('.css') || f.endsWith('.scss') || f.endsWith('.json'))

  if (files.length === 0) {
    return
  }

  console.log('')
  console.log('🎨 Tokens & Styles rebuild triggered... 🎨')

  const workspaceRoot = path.join(__dirname, '../..')

  // Now build styles after tokens are ready
  exec('node_modules/.bin/nx run styles:build', { cwd: workspaceRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error rebuilding styles: ${error.message}`)
      console.error(`stderr: ${stderr}`)
      console.log(error)
      return
    }
    console.log(stdout)

    // copy generated component styles to core www assets
    copy('packages/styles/css/components/all.min.css', 'components.css')
    copy('packages/styles/css/utilities/all.min.css', 'utilities.css')
    copy('packages/styles/css/basic.min.css', 'basic.css')
    copy('packages/styles/css/all.min.css', 'all.css')
    copy('packages/tokens/dist/tokens.css', 'tokens.css')
  })

  exec(
    'node_modules/.bin/stylelint "**/*{core,style,host}.scss"',
    { cwd: workspaceRoot },
    (lintError, lintStdout, lintStderr) => {
      if (lintStderr) {
        console.error(`stylelint stderr: ${lintStderr}`)
        return
      }
      console.log(lintStdout)
    },
  )
  // })
} else {
  console.log('No file changes detected')
}

function copy(srcFile, destFile) {
  const srcPath = path.join(__dirname, `../../${srcFile}`)
  const destPath = path.join(__dirname, `../../packages/core/www/assets/${destFile}`)

  try {
    fs.copyFileSync(srcPath, destPath)
  } catch (copyError) {
    console.error(`Error copying component styles: ${copyError.message}`)
  }
}

console.log('')
