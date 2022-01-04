const path = require('path')
const file = require('../../../.build/file')
const log = require('../../../.build/log')

function appendGithubTag(content) {
  return `${content}

<bal-doc-github link="template"></bal-doc-github>
`
}

function prepareLink(storyPath) {
  const newLink = storyPath.replace(path.join(__dirname, '..', 'src'), '')
  return newLink
}

async function run() {
  log.title('Github Links')
  const pathToSource = path.join(__dirname, '..', 'src')
  const stories = await file.scan(path.join(pathToSource, '**/*.mdx'))

  const regex = new RegExp('<bal-doc-github link="\s*.*"><\/bal-doc-github>')
  for (let index = 0; index < stories.length; index++) {
    const story = stories[index];
    let content = await file.read(story)
    const hasGithubLink = regex.test(content)
    if(!hasGithubLink) {
      content = appendGithubTag(content)
    }

    const newContent = content.replace(regex, `<bal-doc-github link="${prepareLink(story)}"></bal-doc-github>`)

    if(newContent !== content){
      try {
        await file.write(story, newContent)
        log.success(story)
      }catch(_){
        log.error('Could not update story => '+story)
      }
    }

  }
}

run()
