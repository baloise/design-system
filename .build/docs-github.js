/**
 * github
 * --------------------------------------
 * This script adds a GitHub link to each documentation file.
 */

const path = require('path')
const file = require('./utils/file')
const log = require('./utils/log')

const DIRNAME = path.normalize(__dirname);
const PACKAGE = path.join(DIRNAME, "../packages/components");

function appendGithubTag(content) {
  return `${content}

<bal-doc-github link="template"></bal-doc-github>
`
}

function prepareLink(storyPath) {
  const normalizedDirPath = process.platform === 'win32' ? path.join(PACKAGE, 'src').replace(/\\/g, '\/') : path.join(PACKAGE, 'src');
  const newLink = storyPath.replace(normalizedDirPath, '')
  return newLink
}

async function run() {
  log.title('Github - edit links')
  const pathToSource = path.join(PACKAGE, 'src')
  const stories = await file.scan(path.join(pathToSource, '**' + path.sep + '*.mdx'))

  const regex = new RegExp('<bal-doc-github link="\s*.*"><\/bal-doc-github>')
  for (let index = 0; index < stories.length; index++) {
    const story = stories[index];

    if (!story.includes('stories/welcome.stories.mdx')) {
      let content = await file.read(story)
      const hasGithubLink = regex.test(content)
      if (!hasGithubLink) {
        content = appendGithubTag(content)
      }

      const newContent = content.replace(regex, `<bal-doc-github link="${prepareLink(story)}"></bal-doc-github>`)

      if (newContent !== content) {
        try {
          await file.write(story, newContent)
          log.success(story)
        } catch (_) {
          log.error('Could not update story => ' + story)
        }
      }
    }
  }

  log.info(`Found ${stories.length} stories`)
  log.success('All stories are up to date')
}

run()
