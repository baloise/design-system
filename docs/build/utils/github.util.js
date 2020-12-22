const { NEWLINE } = require('../constants')

const parseGithub = (component) => {
    const lines = []
    const githubBaseUrl = `https://github.com/baloise/ui-library/blob/master/packages/library/src/components/${component.tag}`
    const editHtml = `[:memo: Edit this page on Github](${githubBaseUrl}/index.html)`
    const editExamples = `[:notebook: Improve or fix the examples on Github](${githubBaseUrl}/readme.md)`
    lines.push('')
    lines.push('<div class="bal-app" style="margin-top: 5em;">')
    lines.push('<div class="notification">')
    lines.push('<h4 class="title" style="margin-top: 0;">Help us to improve the documentation</h4>')
    lines.push('')
    lines.push(editHtml)
    lines.push('')
    lines.push(editExamples)
    lines.push('')
    lines.push('</div>')
    lines.push('</div>')

    return lines.join(NEWLINE)
}

module.exports = {
    parseGithub,
}
