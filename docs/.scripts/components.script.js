const path = require('path')
const htmlParser = require('node-html-parser')
const log = require('../../.scripts/log')
const file = require('../../.scripts/file')
const libraryLib = require('../../packages/components/.scripts/components.lib')
const testingLib = require('../../packages/testing/.scripts/testing.lib')
const api = require('./utils/api.util')
const testing = require('./utils/testing.util')
const github = require('./utils/github.util')
const componentDoc = require('./utils/component-doc.util')
const { NEWLINE, LEFT_WHITESPACE } = require('../../.scripts/constants')

const JAVASCRIPT_CONTENT = []
let INDEX = 0

const camelize = s => s.replace(/-./g, x => x.toUpperCase()[1])

async function main() {
  log.title('create component docs')
  const components = await libraryLib.components()
  await file.remove(path.join(__dirname, '../src/.vuepress/components/docs-demo-bal-*.vue'))
  await generateSidebar(components)
  await generateMarkdown(components)
}

async function generateSidebar(components) {
  const sidebar = []
  await forEachComponent(components, async component => sidebar.push(`components/${component.tag}`))
  await file.save(path.join(__dirname, '../src/.vuepress/generated/components.json'), JSON.stringify(sidebar))
}

async function generateMarkdown(components) {
  const accessors = await testingLib.accessors()
  const dir = path.join(__dirname, `../src/components/components`)
  await forEachComponent(components, async component => {
    const { markdown, scripts } = generateExamples(component)
    JAVASCRIPT_CONTENT.push(scripts)

    const { top, bottom } = await componentDoc.parse(component)

    const lines = []
    component.readme.split(NEWLINE).forEach(line => lines.push(line))

    lines.push(top)
    lines.push('')

    lines.push(markdown)
    lines.push('')

    const apiContent = api.parse(components, component)
    lines.push(apiContent)
    lines.push('')

    const accessor = accessors.get(component.tag)
    const testingContent = testing.parse(accessor)
    lines.push(testingContent)
    lines.push('')

    lines.push(bottom)
    lines.push('')

    const githubContent = github.parse(component, accessor)
    lines.push(githubContent)
    lines.push('')

    if (scripts) {
      lines.push(`<ClientOnly>`)
      lines.push(`  <docs-component-script tag="${camelize(component.tag)}"></docs-component-script>`)
      lines.push(`</ClientOnly>`)
      lines.push('')
    }

    await file.save(path.join(dir, `${component.tag}.md`), lines.join(NEWLINE))
  })

  await file.save(path.join(__dirname, `../src/.vuepress/generated/components.js`), JAVASCRIPT_CONTENT.join(NEWLINE))
}

function generateExamples(component) {
  if (!component.examples) {
    return ''
  }

  return {
    markdown: transformToMarkdown(component),
    scripts: transformScripts(component),
  }
}

function transformScripts(component) {
  const container = findContainer(component)
  const scriptContent = container.childNodes
    .map(node => (node.rawTagName === 'script' ? getCodeExample(node.innerHTML) : ''))
    .filter(a => a.trim().length !== 0)
    .join(NEWLINE + NEWLINE)
  if (scriptContent.length > 0) {
    return (
      `export function ${camelize(component.tag)}(
        balSnackbarController,
        balToastController,
        BalTableButtonRenderer,
        BalTableTagRenderer,
        BalTableTextRenderer
        ){` +
      scriptContent
        .split(NEWLINE)
        .map(c => `  ${c}`)
        .join(NEWLINE) +
      NEWLINE +
      '}' +
      NEWLINE
    )
  }
}

function transformToMarkdown(component) {
  const container = findContainer(component)

  return container.childNodes
    .map(node => {
      if (node.nodeType === 1) {
        if (node.rawTagName === 'h2') {
          return {
            type: 'h2',
            content: printRawText(node),
          }
        }
        if (node.rawTagName === 'h3') {
          return {
            type: 'h3',
            content: printRawText(node),
          }
        }
        if (node.rawTagName === 'h4') {
          return {
            type: 'h4',
            content: printRawText(node),
          }
        }
        if (node.rawTagName === 'p') {
          return {
            type: 'p',
            content: printRawText(node),
          }
        }
        if (node.rawTagName === 'section') {
          return {
            type: 'template',
            content: getCodeExample(node.innerHTML),
          }
        }
        if (node.rawTagName === 'script') {
          return {
            type: 'script',
            content: getCodeExample(node.innerHTML),
          }
        }
      }
      return false
    })
    .filter(a => a)
    .map((ctx, index, list) => {
      switch (ctx.type) {
        case 'h2':
          return `## ${ctx.content}` + NEWLINE
        case 'h3':
          return `### ${ctx.content}` + NEWLINE
        case 'h4':
          return `#### ${ctx.content}` + NEWLINE
        case 'p':
          return `${ctx.content}` + NEWLINE
        case 'template':
          let scriptContent = ''
          if (index < list.length) {
            if (list[index + 1] && list[index + 1].type === 'script') {
              scriptContent = list[index + 1].content
            }
          }
          const tag = `docs-demo-${component.tag}-${INDEX++}`
          writeDemoComponent(tag, ctx.content, scriptContent)
          return [`<ClientOnly>`, `<${tag}></${tag}>`, `</ClientOnly>`, NEWLINE + NEWLINE].join('')
        case 'script':
          break
        default:
          return ctx.content
      }
    })
    .filter(a => a)
    .filter(a => a.trim().length !== 0)
    .join(NEWLINE)
}

function printRawText(node) {
  return node.childNodes
    .map(n => n.rawText.trim())
    .join(' ')
    .trim()
}

function getCodeExample(html) {
  return html
    .toString()
    .split(NEWLINE)
    .map(line => line.substring(LEFT_WHITESPACE))
    .join(NEWLINE)
}

function findContainer(component) {
  const root = htmlParser.parse(component.examples)
  const containerElement = root.querySelector('.container')
  if (!containerElement) {
    log.error(`Example file index.html of the component ${component.tag} is invalid`)
    return process.exit(1)
  }
  return htmlParser.parse(containerElement.innerHTML)
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

async function writeDemoComponent(tag, content, scriptContent) {
  const componentContent = `<template>
  <div class="demo-box">
    <div class="bal-app demo" v-html="template"></div>
    <div style="background: #282c34; border-radius: 0px; position: relative">
      <div class="demo-toolbar">
        <button v-if="hasJavaScript" :class="{ 'active': activeTab === 'html', 'demo-tab': true }" @click="show('html')">HTML</button>
        <button v-if="hasJavaScript" :class="{ 'active': activeTab === 'js', 'demo-tab': true }" @click="show('js')">JavaScript</button>

        <form class="demo-sandbox" target="_blank" action="https://jsfiddle.net/api/post/library/pure" method="post">
          <input type="hidden" name="js" :value="script" />
          <input type="hidden" name="html" :value="html" />
          <input type="hidden" name="panel_js" value="3" />
          <input type="hidden" name="resources" :value="resources" />
          <button type="submit" alt="JSFiddle">
            <img src="/assets/images/js-fiddle.svg" />
            <span>JSFiddle</span>
          </button>
        </form>
      </div>
      <div :class="{ 'demo-content': true, 'is-closed': isExpandable && !isOpen }">
        <div v-if="activeTab === 'html'" class="language-html extra-class" v-html="highlightedHTML"></div>
        <div v-if="activeTab === 'js'" class="language-js extra-class" v-html="highlightedJS"></div>
      </div>
      <button v-if="isExpandable" class="demo-show-more" @click="showMore($event)">
        Show {{ isOpen ? 'less' : 'more' }}
      </button>
    </div>
  </div>
</template>
<script>
const highlight = require('../highlight.js')

export default {
  name: '${tag}',
  data: () => {
    return {
      activeTab: 'html',
      isOpen: false,
      hasJavaScript: ${scriptContent.length > 0},
      template: \`${content}\`,
      script: \`${replaceAll(replaceAll(scriptContent, '`', '\\`'), '\\${', '\\${')}\`,
      resources: [
        'https://cdn.jsdelivr.net/npm/@baloise/design-system-fonts/lib/fonts.cdn.css',
        'https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.css',
        'https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.esm.js',
        'https://cdn.jsdelivr.net/npm/@baloise/design-system-components/dist/design-system-components/design-system-components.js',
        'https://unpkg.com/ag-grid-community/dist/ag-grid-community.noStyle.js',
      ].join(','),
    }
  },
  computed: {
    isExpandable() {
      const lines = (this.activeTab === 'html' ? this.template : this.script).split('\\n')
      return lines.length > 16
    },
    maxHeight() {
      if (this.isOpen) {
        return 'auto'
      }
      return '260px'
    },
    highlightedHTML() {
      return highlight(this.template, 'html')
    },
    highlightedJS() {
      return highlight(this.script, 'js')
    },
    html() {
      return [
        '<div class="bal-app">',
        this.template,
        '</div>',
      ].join('\\n')
    },
  },
  methods: {
    show(tab) {
      this.activeTab = tab
    },
    showMore() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
`

  await file.save(path.join(__dirname, `../src/.vuepress/components/${tag}.vue`), componentContent)
}

function forEachComponent(components, callback) {
  components.forEach(async component => {
    if (component.tag.indexOf('bal-icon-') === -1 && component.isChild === false) {
      await callback(component)
    }
  })
}

main()
