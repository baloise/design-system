import sdk from '@stackblitz/sdk'
import { loadSourceFiles, parseMarkdown } from './stackblitz.util'
import { DEFAULT_BALOISE_VERSION, DEFAULT_EDITOR_DESCRIPTION, DEFAULT_EDITOR_TITLE } from './stackblitz.const'

interface HtmlProject {
  template: string
  component: string
}

export const openHtmlProject = async (project: HtmlProject) => {
  const [index_html, index_ts, example_ts, package_json, tsconfig_json] = await loadSourceFiles([
    'html/index.html',
    'html/index.ts',
    'html/example.ts',
    'html/package.json',
    'html/tsconfig.json',
  ])

  const parseTemplate = (content: string) => `<html>
  <body>
    <bal-app>
      <main class="container">

${content}

      </main>
    </bal-app>
  </body>
</html>`

  let example_component = example_ts
  let example_template = index_html

  if (project.component) {
    example_component = parseMarkdown(project.component)
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
        'index.ts': index_ts,
        'example.ts': example_component,
        'tsconfig.json': tsconfig_json,
        'package.json': package_json,
      },
      dependencies: {
        '@baloise/design-system-components': DEFAULT_BALOISE_VERSION,
      },
    },
    {
      openFile: ['index.html'],
      showSidebar: false,
    },
  )
}
