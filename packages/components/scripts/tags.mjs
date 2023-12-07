import { fileURLToPath } from 'url'
import path from 'path'
import { readFile, writeFile } from '../../../scripts/utils.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')
const __root = path.join(__dirname, '../../')

// This script creates a list with all the main component tags.
export async function createTagList() {
  const content = await readFile(path.join(__dirname, '.tmp/components.json'))
  const json = JSON.parse(content)
  const componentTags = json.components
    .map(component => component.tag)
    .filter(tag => !tag.startsWith('bal-doc'))
    .filter(tag => !tag.startsWith('bal-navigation'))
    .reduce((acc, newTag) => {
      const hasComponent = acc.some(tag => newTag.startsWith(tag))
      if (!hasComponent && newTag !== 'bal-tab-item' && newTag !== 'bal-notices') {
        acc.push(newTag)
      }
      return acc
    }, [])
  await writeFile(path.join(__root, 'resources/data/tags.json'), JSON.stringify(componentTags, undefined, 2))
}
