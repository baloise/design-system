const path = require('path')

const log = require('../../../.build/utils/log')
const file = require('../../../.build/utils/file')

const display = require('./display')
const flex = require('./flex')
const gap = require('./gap')
const background = require('./background')
const radius = require('./radius')
const border = require('./border')
const sizing = require('./sizing')
const fontSize = require('./font-size')
const typography = require('./typography')
const colors = require('./colors')
const shadow = require('./shadow')
const opacity = require('./opacity')
const interactivity = require('./interactivity')
const transform = require('./transform')

const DIRNAME = path.normalize(__dirname);
const SASS_PATH = path.join(DIRNAME, '../src/generated')

async function main() {
  log.title('Generate CSS Framework')
  await file.write(path.join(SASS_PATH, '_display.sass'), display.generate())
  await file.write(path.join(SASS_PATH, '_flexbox.sass'), flex.generate())
  await file.write(path.join(SASS_PATH, '_gap.sass'), gap.generate())
  await file.write(path.join(SASS_PATH, '_background.sass'), background.generate())
  await file.write(path.join(SASS_PATH, '_radius.sass'), radius.generate())
  await file.write(path.join(SASS_PATH, '_border.sass'), border.generate())
  await file.write(path.join(SASS_PATH, '_sizing.sass'), sizing.generate())
  await file.write(path.join(SASS_PATH, '_font-size.sass'), fontSize.generate())
  await file.write(path.join(SASS_PATH, '_typography.sass'), typography.generate())
  await file.write(path.join(SASS_PATH, '_colors.sass'), colors.generate())
  await file.write(path.join(SASS_PATH, '_shadow.sass'), shadow.generate())
  await file.write(path.join(SASS_PATH, '_opacity.sass'), opacity.generate())
  await file.write(path.join(SASS_PATH, '_interactivity.sass'), interactivity.generate())
  await file.write(path.join(SASS_PATH, '_transform.sass'), transform.generate())
}

main()
