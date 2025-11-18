// import { getParameters } from 'codesandbox/lib/api/define'
import { loadSourceFiles, parseMarkdown } from './code-sandbox.util'

interface AngularProject {
  template: string
  exampleFiles?: any
  fullscreen?: boolean
}

export const PLACEHOLDER_IMPORT = '/** PLACEHOLDER FOR DESIGN SYSTEM IMPORTS */'

export const buildAngularParameters = async (project: AngularProject): Promise<string> => {
  const [
    src_app_app_basic_ts,
    src_app_app_fullscreen_ts,
    src_app_app_hello_world_ts,
    src_app_app_config_ts,
    src_app_example_ts,
    src_index_html,
    src_main_ts,
    src_styles_scss,
    angular_json,
    package_json,
    tsconfig_app_json,
    tsconfig_json,
  ] = await loadSourceFiles([
    'angular/src/app/basic/app.ts',
    'angular/src/app/fullscreen/app.ts',
    'angular/src/app/hello-world/app.ts',
    'angular/src/app/app.config.ts',
    'angular/src/app/example.ts',
    'angular/src/index.html',
    'angular/src/main.ts',
    'angular/src/styles.scss',
    'angular/angular.json',
    'angular/package.json',
    'angular/tsconfig.app.json',
    'angular/tsconfig.json',
  ])

  const isTryOnlineProject = !project.template
  let exampleFiles = project.exampleFiles
  const secondComponent = {}

  if (!isTryOnlineProject) {
    const example_component_html = project.template
      ? parseMarkdown(project.template)
      : '<h1 class="title text-xxx-large">Hello World</h1>'

    const new_example_component_ts = src_app_example_ts

    if (exampleFiles === undefined) {
      exampleFiles = {
        'src/app/example.ts': {
          isBinary: false,
          content: new_example_component_ts,
        },
        'src/app/example.html': {
          isBinary: false,
          content: example_component_html,
        },
        // 'src/app/example.css': {
        //   isBinary: false,
        //   content: '',
        // },
      }
    }
  }

  return ''
  // getParameters({
  //   files: {
  //     'package.json': {
  //       isBinary: false,
  //       content: package_json,
  //     },
  //     'tsconfig.json': {
  //       isBinary: false,
  //       content: tsconfig_json,
  //     },
  //     'tsconfig.app.json': {
  //       isBinary: false,
  //       content: tsconfig_app_json,
  //     },
  //     'angular.json': {
  //       isBinary: false,
  //       content: angular_json,
  //     },
  //     'src/app/app.ts': {
  //       isBinary: false,
  //       content: isTryOnlineProject
  //         ? src_app_app_hello_world_ts
  //         : project.fullscreen
  //           ? src_app_app_fullscreen_ts
  //           : src_app_app_basic_ts,
  //     },
  //     // 'src/app/app.component.ts': {
  //     //   isBinary: false,
  //     //   content: src_app_app_component_ts,
  //     // },
  //     'src/app/app.config.ts': {
  //       isBinary: false,
  //       content: src_app_app_config_ts,
  //     },
  //     'src/index.html': {
  //       isBinary: false,
  //       content: src_index_html,
  //     },
  //     'src/main.ts': {
  //       isBinary: false,
  //       content: src_main_ts,
  //     },
  //     'src/styles.scss': {
  //       isBinary: false,
  //       content: src_styles_scss,
  //     },
  //     ...(exampleFiles || {}),
  //     ...secondComponent,
  //   },
  // })
}
