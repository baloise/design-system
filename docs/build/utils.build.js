const { banner, printSuccess } = require('./utils/log.util')
const { writeFile } = require('./utils/file.util')

banner('Starting Utils Documents')

const filtersJson = require('../../packages/utils/src/filters.json')

const title = (name) => `
<h2 id="${name}">
  <a href="#/utilities/filters?id=${name}" data-id="${name}" class="anchor">
    <span>${name}</span>
  </a>
</h2>`

const filters = filtersJson.map(f =>
  [
    `<table>`,
    `<thead>`,
    `<tr>`,
    `<th colspan="2" style="text-align: left;">`,
    title(f.name),
    `</th>`,
    `</tr>`,
    `</thead>`,
    `<tbody>`,
    `<tr>`,
    `<td width="100px"><b>Description</b></td>`,
    `<td>${f.descripton}</td>`,
    `</tr>`,
    `<tr>`,
    `<td width="100px"><b>Signature</b></td>`,
    `<td><code style="padding-left: 0; padding-right: 0;">${f.signature}</code></td>`,
    `</tr>`,
    `<tr>`,
    `<td width="100px"><b>Example</b></td>`,
    `<td>${f.example}</td>`,
    `</tr>`,
    `</tbody>`,
    `</table>`,
  ].join('\n'),
)

const content = [`# Filters`, '', ...filters, ''].join('\n')

writeFile('./utilities/filters.md', content)
printSuccess('Filter are documented')
