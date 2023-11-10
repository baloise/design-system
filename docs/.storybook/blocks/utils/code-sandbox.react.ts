import { getParameters } from 'codesandbox/lib/api/define'
import { loadSourceFiles, parseMarkdown } from './code-sandbox.util'

interface ReactProject {
  template: string
  fullscreen?: boolean
  exampleFiles?: any
}

export const buildReactParameters = async (project: ReactProject): Promise<string> => {
  const [
    public_index,
    src_app_tsx,
    src_app_project_tsx,
    src_app_fullscreen_tsx,
    src_index_tsx,
    src_react_app_env_d_ts,
    package_json,
    tsconfig_json,
  ] = await loadSourceFiles([
    'react/public/index.html',
    'react/src/App.tsx',
    'react/src/AppProject.tsx',
    'react/src/AppFullscreen.tsx',
    'react/src/index.tsx',
    'react/src/react-app-env.d.ts',
    'react/package.json',
    'react/tsconfig.json',
  ])

  const isTryOnlineProject = !project.template

  const reactApp = isTryOnlineProject ? src_app_project_tsx : project.fullscreen ? src_app_fullscreen_tsx : src_app_tsx

  let exampleFiles = project.exampleFiles

  if (!isTryOnlineProject) {
    const example_component = project.template
      ? parseMarkdown(project.template)
      : `import React from 'react';

export default function Example() {
  return <h1 className="title is-size-xxx-large">Hello World</h1>;
}
`
    if (exampleFiles === undefined) {
      exampleFiles = {
        'src/Example.tsx': {
          isBinary: false,
          content: example_component,
        },
      }
    }
  }

  return getParameters({
    files: {
      'package.json': {
        isBinary: false,
        content: package_json,
      },
      'tsconfig.json': {
        isBinary: false,
        content: tsconfig_json,
      },
      'public/index.html': {
        isBinary: false,
        content: public_index,
      },
      'src/index.tsx': {
        isBinary: false,
        content: src_index_tsx,
      },
      'src/react-app-env.d.ts': {
        isBinary: false,
        content: src_react_app_env_d_ts,
      },
      'src/App.tsx': {
        isBinary: false,
        content: reactApp,
      },
      ...(exampleFiles || {}),
    },
  })
}
