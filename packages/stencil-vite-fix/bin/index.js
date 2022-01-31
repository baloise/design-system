#!/usr/bin/env node

const replace = require('replace-in-file')
const path = require('path')
const fs = require('fs')

const VITE_IGNORE = '/* @vite-ignore */'
const WEBPACK_LAZY = '/* webpackMode: "lazy" */'

function main() {
  const nodeModulesFile = path.join('./node_modules/@stencil/core/internal/client/index.js')
  const nodeModulesFiles = path.join('./node_modules/@stencil/core/internal/**/*.js')
  adjustDynamicImport(nodeModulesFile, nodeModulesFiles)

  const viteCacheFile = path.join('./node_modules/.vite/@stencil_core_internal_client.js')
  const viteCacheFiles = path.join('./node_modules/.vite/@stencil_core*.js')
  adjustDynamicImport(viteCacheFile, viteCacheFiles)

  const viteBalCacheFile = path.join('./node_modules/.vite/@baloise_design-system-components-vue.js')
  const viteBalCacheFiles = path.join('./node_modules/.vite/@baloise*.js')
  adjustDynamicImport(viteBalCacheFile, viteBalCacheFiles)
}

function adjustDynamicImport(filePath, files) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('File does not exist!', filePath)
      return
    }

    if (data.indexOf(VITE_IGNORE) >= 0) {
      console.log('File is already modified!', filePath)
      return
    }

    const options = {
      files: files,
      from: /\/\* webpackMode: "lazy" \*\//g,
      to: `${WEBPACK_LAZY}
    ${VITE_IGNORE}`,
    }

    replace(options)
      .then(changedFiles => {
        console.log(
          'Modified files:',
          changedFiles
            .filter(f => f.hasChanged)
            .map(f => f.file)
            .join(', '),
        )
      })
      .catch(error => {
        console.error('Error occurred:', error)
      })
  })
}

main()
