const { banner, printSuccess } = require('./utils/log.util')
const { writeFile } = require('./utils/file.util')
const { components } = require('./utils/components.util')
const { parseExamples } = require('./utils/example.util')
const { parseApi } = require('./utils/api.util')
const { parseTesting } = require('./utils/testing.util')
const { parseGithub } = require('./utils/github.util')
const { NEWLINE } = require('./constants')

const writeComponent = (tag, content) => {
    const path = `www/components/${tag}/readme.md`
    const err = writeFile(path, content.join(NEWLINE))
    if (err === null) {
        printSuccess(path)
    }
}

const printListItem = (title, tag) => `
<li>
    <a href="#/www/components/${tag}/readme?id=${title.toLowerCase()}">
        ${title}
    </a>
</li>
`

banner('Starting generating the components')

components.forEach(component => {

    const examplesContent = parseExamples(component)
    const apiContent = parseApi(component)
    const testingContent = parseTesting(component)

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
        lines.push(`</ul>`)
        lines.push(``)
        lines.push(``)
    }

    component.readme.split(NEWLINE).forEach(line => lines.push(line));

    lines.push(examplesContent)
    lines.push(apiContent)
    lines.push(testingContent)
    lines.push(parseGithub(component))

    writeComponent(component.tag, lines)
})
