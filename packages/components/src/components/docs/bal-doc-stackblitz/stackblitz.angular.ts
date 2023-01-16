import sdk from '@stackblitz/sdk'
import { loadSourceFiles, parseMarkdown } from './stackblitz.util'
import {
  DEFAULT_BALOISE_VERSION,
  DEFAULT_EDITOR_DESCRIPTION,
  DEFAULT_EDITOR_TITLE,
  PLACEHOLDER_IMPORT,
} from './stackblitz.const'

interface AngularProject {
  template: string
  component: string
  modules: string
  name2: string
  template2: string
  component2: string
}

export const openAngularProject = async (project: AngularProject) => {
  const [
    main_ts,
    app_module_ts,
    app_component_ts,
    app_component_css,
    app_component_html,
    example_component_ts,
    styles_css,
    angular_json,
    tsconfig_json,
  ] = await loadSourceFiles([
    'angular/main.ts',
    'angular/app.module.ts',
    'angular/app.component.ts',
    'angular/app.component.css',
    'angular/app.component.html',
    'angular/example.component.ts',
    'angular/styles.css',
    'angular/angular.json',
    'angular/tsconfig.json',
  ])

  const example_component_html = project.template
    ? parseMarkdown(project.template)
    : '<h1 class="title is-size-xxx-large">Hello World</h1>'

  const new_example_component_ts = project.component
    ? parseMarkdown(project.component)
    : updateModules(example_component_ts, project)

  let secondComponent = {}
  if (project.name2 !== undefined) {
    secondComponent = {
      [`src/app/${project.name2}.component.ts`]: parseMarkdown(project.component2),
      [`src/app/${project.name2}.component.html`]: parseMarkdown(project.template2),
    }
  }

  sdk.openProject(
    {
      template: 'angular-cli',
      title: DEFAULT_EDITOR_TITLE,
      description: DEFAULT_EDITOR_DESCRIPTION,
      files: {
        'src/main.ts': main_ts,
        'src/polyfills.ts': `import 'zone.js/dist/zone';`,
        'src/app/app.module.ts': app_module_ts,
        'src/app/app.component.ts': app_component_ts,
        'src/app/app.component.html': app_component_html,
        'src/app/example.component.ts': new_example_component_ts,
        'src/app/example.component.html': example_component_html,
        'src/app/example.component.css': '',
        ...secondComponent,
        'src/app/app.component.css': app_component_css,
        'src/index.html': '<app-root></app-root>',
        'src/styles.css': styles_css,
        'angular.json': angular_json,
        'tsconfig.json': tsconfig_json,
      },
      dependencies: {
        '@baloise/design-system-components': DEFAULT_BALOISE_VERSION,
        '@baloise/design-system-components-angular': DEFAULT_BALOISE_VERSION,
      },
    },
    {
      openFile: ['src/app/example.component.ts', 'src/app/example.component.html'],
      showSidebar: false,
    },
  )
}

const updateModules = (content: string, project: AngularProject) => {
  const toPascalCase = (text: string) => text.replace(/(^\w|-\w)/g, clearAndUpper)
  const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase()
  const modules = project.modules.split(',').map(m => `Bal${toPascalCase(m.trim())}Module`)

  let newContent = content.replace('imports: [CommonModule],', `imports: [CommonModule, ${modules.join(', ')}],`)
  newContent = newContent.replace(
    PLACEHOLDER_IMPORT,
    `import { ${modules.join(', ')} } from '@baloise/design-system-components-angular'`,
  )
  return newContent
}
