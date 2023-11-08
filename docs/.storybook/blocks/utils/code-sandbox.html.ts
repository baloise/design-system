import { getParameters } from 'codesandbox/lib/api/define'
import { loadSourceFiles, parseMarkdown } from './code-sandbox.util'

interface HtmlProject {
  template: string
  exampleFiles?: any
  fullscreen?: boolean
}

export const buildHtmlParameters = async (project: HtmlProject): Promise<string> => {
  const [index_html, index_ts, example_ts] = await loadSourceFiles([
    'html/index.html',
    'html/index.ts',
    'html/example.ts',
  ])

  const parseTemplate = (content: string) => `<html>
  <body>
    <bal-app>
      <main ${!project.fullscreen ? 'class="container py-large"' : ''}>

${content}

      </main>
    </bal-app>
  </body>
</html>`

  let example_component = example_ts
  let example_template = index_html

  if (project.template) {
    example_component = parseMarkdown(project.template)
  }

  if (project.template) {
    example_template = parseTemplate(parseMarkdown(project.template))
  }

  example_component = `${index_ts}

${example_component}`

  return getParameters({
    files: {
      'package.json': {
        isBinary: false,
        content: {
          dependencies: {
            '@baloise/design-system-components': 'latest',
          },
        } as any,
      },
      'index.js': {
        isBinary: false,
        content: example_component.trim(),
      },
      'index.html': {
        isBinary: false,
        content: example_template.trim(),
      },
    },
  })
}
