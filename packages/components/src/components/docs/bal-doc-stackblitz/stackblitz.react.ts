import sdk from '@stackblitz/sdk'
import { loadSourceFiles, parseMarkdown } from './stackblitz.util'
import { DEFAULT_BALOISE_VERSION, DEFAULT_EDITOR_DESCRIPTION, DEFAULT_EDITOR_TITLE } from './stackblitz.const'

interface ReactProject {
  component: string
  fullscreen: boolean
}

export const openReactProject = async (project: ReactProject) => {
  const [app_tsx, app_fullscreen_tsx, index_html, index_tsx, package_lock_json, package_json, tsconfig_json] =
    await loadSourceFiles([
      'react/app.tsx',
      'react/app-fullscreen.tsx',
      'react/index.html',
      'react/index.tsx',
      'react/package-lock.json',
      'react/package.json',
      'react/tsconfig.json',
    ])

  const example_component = project.component
    ? parseMarkdown(project.component)
    : `import React from 'react';

export default function Example() {
  return <h1 class="title is-size-xxx-large">Hello World</h1>;
}
`

  sdk.openProject(
    {
      template: 'node',
      title: DEFAULT_EDITOR_TITLE,
      description: DEFAULT_EDITOR_DESCRIPTION,
      files: {
        'public/index.html': index_html,
        'src/index.tsx': index_tsx,
        'src/app.tsx': project.fullscreen ? app_fullscreen_tsx : app_tsx,
        'src/example.tsx': example_component,
        'tsconfig.json': tsconfig_json,
        'package.json': package_json,
        'package-lock.json': package_lock_json,
        '.stackblitzrc': `{
        "startCommand": "yarn run start"
      }`,
      },
      dependencies: {
        '@baloise/design-system-components': DEFAULT_BALOISE_VERSION,
        '@baloise/design-system-components-react': DEFAULT_BALOISE_VERSION,
      },
    },
    {
      openFile: ['src/example.tsx'],
      showSidebar: false,
    },
  )
}
