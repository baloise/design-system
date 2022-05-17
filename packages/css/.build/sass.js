const path = require('path')
const {pathToFileURL} = require('url');
const sass = require('sass')
const fs = require('fs')

async function compileSass({ style }) {
  const result = await sass.compileAsync(path.join(__dirname, '../scss/baloise-design-system.sass'), {
    sourceMap: true,
    style,
    loadPaths: [
      path.join(__dirname, '../scss')
    ],
    importers: [{
      findFileUrl(url) {
        if (!url.startsWith('node_modules')) return null;
        return new URL(url, pathToFileURL('node_modules'));
      }
    }]
  })
  return result
}

async function main() {
  const folderName = path.join(__dirname, '../css')
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }

  const sassMinified = await compileSass({ style: 'compressed' })
  fs.writeFileSync(path.join(__dirname, '../css/baloise-design-system.min.css'), sassMinified.css)
  fs.writeFileSync(path.join(__dirname, '../css/baloise-design-system.min.css.map'), JSON.stringify(sassMinified.sourceMap))

  const sassExpanded = await compileSass({ style: 'expanded' })
  fs.writeFileSync(path.join(__dirname, '../css/baloise-design-system.css'), sassExpanded.css)
  fs.writeFileSync(path.join(__dirname, '../css/baloise-design-system.css.map'), JSON.stringify(sassExpanded.sourceMap))
}

main()
