const path = require('path')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const examples = require('./utils/example.util')
const api = require('./utils/api.util')
const testing = require('./utils/testing.util')
const github = require('./utils/github.util')
const { NEWLINE } = require('./utils/constants')
const libraryLib = require('../../packages/library/.scripts/library.lib')
const testingLib = require('../../packages/testing/.scripts/testing.lib')

const printListItem = (title, tag) => `
<li>
    <a href="#/components/${tag}/readme?id=${title.toLowerCase()}">
        ${title}
    </a>
</li>
`

const run = async () => {
  log.title('docs : components')

  const components = await libraryLib.components()
  const accessors = await testingLib.accessors()
  const files = []

  components.forEach(async component => {
    if (component.tag.indexOf('bal-icon-') === -1) {
      const accessor = accessors.get(component.tag)

      const examplesContent = examples.parse(component)
      const apiContent = api.parse(components, component)
      const testingContent = testing.parse(accessor)
      const githubContent = github.parse(component, accessor)

      const hasExampleContent = examplesContent && examplesContent.length > 0
      const hasApiContent = apiContent && apiContent.length > 0
      const hasTestingContent = testingContent && testingContent.length > 0

      const lines = []
      lines.push(`# ${component.tag}`)
      lines.push(``)

      if (hasExampleContent || hasApiContent || hasTestingContent) {
        lines.push(`<p class="docs-content"><strong>CONTENTS</strong></p>`)
        lines.push(``)
        lines.push(`<ul class="docs-content">`)
        if (hasExampleContent) {
          lines.push(printListItem('Examples', component.tag))
        }
        if (hasApiContent) {
          lines.push(printListItem('API', component.tag))
        }
        if (hasTestingContent) {
          lines.push(printListItem('Testing', component.tag))
        }
        lines.push(printListItem('Links', component.tag))
        lines.push(`</ul>`)
        lines.push(``)
        lines.push(``)
      }

      component.readme.split(NEWLINE).forEach(line => lines.push(line))

      lines.push(examplesContent)
      lines.push(apiContent)
      lines.push(testingContent)
      lines.push(githubContent)
      files.push({
        path: path.join(__dirname, `../components/${component.tag}/readme.md`),
        content: lines.join(NEWLINE),
      })
    }
  })

  for (let i = 0; i < files.length; i++) {
    await file.save(files[i].path, files[i].content)
  }
}

run()
