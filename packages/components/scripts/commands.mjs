import { fileURLToPath } from 'url'
import path from 'path'
import { scan, readFile, writeFile } from '../../../.build/utils/index.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(path.dirname(__filename), '..')

// This script reads the defined filter functions and creates
// a JSON file with all the meta information for documentation
// and code generations.
export async function createTestingDocs() {
  const pathToTypes = path.join(__dirname, '../testing/src/commands/**/bal-**.types.ts')
  const typeFilePaths = await scan(pathToTypes)
  const typeFileContents = await Promise.all(typeFilePaths.map(f => readFile(f)))
  const commands = typeFileContents.map((m, i) => parseTestingType(m, typeFilePaths[i])).flat()
  await writeFile(path.join(__dirname, '.tmp/commands.json'), JSON.stringify(commands, undefined, 2))
}
