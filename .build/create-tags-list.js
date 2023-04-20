/**
 * utils - create tags list
 * --------------------------------------
 * This script creates a list with all the main component tags.
 */

const path = require('path')
const file = require('./utils/file')
const log = require('./utils/log')
const libraryLib = require('./utils/components.lib')

const DIRNAME = path.normalize(__dirname);
const DATA_PATH = path.join(DIRNAME, "data");
const FILE_PATH = path.join(DATA_PATH, "tags.json");

async function main() {
  await log.title('create component tags list')
  const detailedMapComponents = await libraryLib.components()
  const detailedComponents = Array.from(detailedMapComponents)
  const componentTags = detailedComponents
    .map(component => component[0])
    .filter(tag => !tag.startsWith('bal-doc'))
    .filter(tag => !tag.startsWith('bal-navigation'))
    .reduce((acc, newTag) => {
      const hasComponent = acc.some(tag => newTag.startsWith(tag))
      if(!hasComponent && newTag !== 'bal-tab-item' && newTag !== 'bal-notices'){
        acc.push(newTag)
      }
      return acc
    }, [])

  await file.save(FILE_PATH, JSON.stringify(componentTags))
}

main()
