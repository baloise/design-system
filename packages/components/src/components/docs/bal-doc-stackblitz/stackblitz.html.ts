import sdk from '@stackblitz/sdk'
import { loadSourceFiles, parseMarkdown } from './stackblitz.util'
import { DEFAULT_BALOISE_VERSION, DEFAULT_EDITOR_DESCRIPTION, DEFAULT_EDITOR_TITLE } from './stackblitz.const'

interface HtmlProject {
  template: string
  component: string
  modules: string
}

export const openHtmlProject = async (project: HtmlProject) => {
  const [index_html, index_ts, package_json, tsconfig_json] = await loadSourceFiles([
    'html/index.html',
    'html/index.ts',
    'html/package.json',
    'html/tsconfig.json',
  ])

  const parseTemplate = (content: string) => `<html>
  <body>
    <bal-app>
      <main class="container py-large">

${content}

      </main>
    </bal-app>
  </body>
</html>`

  const parseComponent = (content: string, modules: string) => `
import '@baloise/design-system-components/dist/design-system-components/design-system-components.css';

${modules}

${content}
`

  let example_component = index_ts
  let example_template = index_html

  let imports = ''
  if (project.modules) {
    imports = updateModules(project)

    example_component = parseComponent('', imports)
  }

  if (project.component) {
    example_component = parseComponent(parseMarkdown(project.component), imports)
  }

  if (project.template) {
    example_template = parseTemplate(parseMarkdown(project.template))
  }

  sdk.openProject(
    {
      template: 'typescript',
      title: DEFAULT_EDITOR_TITLE,
      description: DEFAULT_EDITOR_DESCRIPTION,
      files: {
        'index.html': example_template,
        'index.ts': example_component,
        'tsconfig.json': tsconfig_json,
        'package.json': package_json,
      },
      dependencies: {
        '@baloise/design-system-components': DEFAULT_BALOISE_VERSION,
      },
    },
    {
      openFile: ['index.ts', 'index.html'],
      showSidebar: false,
    },
  )
}

const updateModules = (project: HtmlProject) => {
  const toPascalCase = (text: string) => text.replace(/(^\w|-\w)/g, clearAndUpper)
  const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase()

  const modules = ['app', ...project.modules.split(',').map(m => m.trim())]
  const imports = modules
    .map(
      m =>
        `import { defineCustomElement as defineBal${toPascalCase(
          m.trim(),
        )} } from '@baloise/design-system-components/dist/components/bal-${m}';`,
    )
    .join('\n')
  const definitions = modules.map(m => `defineBal${toPascalCase(m.trim())}();`).join('\n')

  return `${imports}

${definitions}`
}
