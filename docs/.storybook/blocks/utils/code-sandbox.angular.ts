import { getParameters } from 'codesandbox/lib/api/define'
import { loadSourceFiles, parseMarkdown } from './code-sandbox.util'

interface AngularProject {
  template: string
  // component: string
  // name2: string
  // template2: string
  // component2: string
  // fullscreen: boolean
}

export const PLACEHOLDER_IMPORT = '/** PLACEHOLDER FOR DESIGN SYSTEM IMPORTS */'

export const buildAngularParameters = async (project: AngularProject): Promise<string> => {
  const [
    src_app_app_component_fullscreen_html,
    src_app_app_component_project_html,
    src_app_app_component_html,
    src_app_app_component_ts,
    src_app_app_module_project_ts,
    src_app_app_module_ts,
    src_app_example_component_ts,
    src_index_html,
    src_main_ts,
    src_polyfills_ts,
    src_styles_scss,
    src_zone_flags_ts,
    _angular_cli_json,
    package_json,
    tsconfig_json,
  ] = await loadSourceFiles([
    'angular/src/app/app.component-fullscreen.html',
    'angular/src/app/app.component-project.html',
    'angular/src/app/app.component.html',
    'angular/src/app/app.component.ts',
    'angular/src/app/app.module-project.ts',
    'angular/src/app/app.module.ts',
    'angular/src/app/example.component.ts',
    'angular/src/index.html',
    'angular/src/main.ts',
    'angular/src/polyfills.ts',
    'angular/src/styles.scss',
    'angular/src/zone-flags.ts',
    'angular/angular-cli.json',
    'angular/package.json',
    'angular/tsconfig.json',
  ])

  const isTryOnlineProject = !project.template

  let exampleFiles = {}
  let secondComponent = {}
  if (!isTryOnlineProject) {
    const example_component_html = project.template
      ? parseMarkdown(project.template)
      : '<h1 class="title is-size-xxx-large">Hello World</h1>'

    const new_example_component_ts = src_app_example_component_ts

    exampleFiles = {
      'src/app/example.component.ts': {
        isBinary: false,
        content: new_example_component_ts,
      },
      'src/app/example.component.html': {
        isBinary: false,
        content: example_component_html,
      },
      'src/app/example.component.css': {
        isBinary: false,
        content: '',
      },
    }

    // if (project.name2 !== undefined) {
    //   secondComponent = {
    //     [`src/app/${project.name2}.component.ts`]: {
    //       isBinary: false,
    //       content: parseMarkdown(project.component2),
    //     },
    //     [`src/app/${project.name2}.component.html`]: {
    //       isBinary: false,
    //       content: parseMarkdown(project.template2),
    //     },
    //   }
    // }
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
      '.angular-cli.json': {
        isBinary: false,
        content: _angular_cli_json,
      },
      'src/app/app.component.html': {
        isBinary: false,
        content: isTryOnlineProject
          ? src_app_app_component_project_html
          : src_app_app_component_html,
      },
      'src/app/app.component.ts': {
        isBinary: false,
        content: src_app_app_component_ts,
      },
      'src/app/app.module.ts': {
        isBinary: false,
        content: isTryOnlineProject ? src_app_app_module_project_ts : src_app_app_module_ts,
      },
      'src/index.html': {
        isBinary: false,
        content: src_index_html,
      },
      'src/main.ts': {
        isBinary: false,
        content: src_main_ts,
      },
      'src/polyfills.ts': {
        isBinary: false,
        content: src_polyfills_ts,
      },
      'src/styles.scss': {
        isBinary: false,
        content: src_styles_scss,
      },
      'src/zone-flags.ts': {
        isBinary: false,
        content: src_zone_flags_ts,
      },
      ...exampleFiles,
      ...secondComponent,
    },
  })
}
