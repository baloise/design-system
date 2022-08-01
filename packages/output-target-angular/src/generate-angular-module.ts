import { dashToPascalCase } from './utils'
import type { ComponentCompilerMeta } from '@stencil/core/internal'
import { ComponentGroup } from './types'

export const createComponentModule =
  (groups: { [key: string]: ComponentGroup } = {}) =>
  (cmpMeta: ComponentCompilerMeta) => {
    const isPrivate = Object.values(groups)
      .flat()
      .map(o => o.components)
      .flat()
      .some(tag => tag === cmpMeta.tagName)

    if (isPrivate) {
      return ''
    }

    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName)

    let cmpImports: string[] = []
    let cmpDefines: string[] = []
    if (groups[cmpMeta.tagName] && groups[cmpMeta.tagName].components) {
      const children = groups[cmpMeta.tagName].components
      if (children) {
        cmpImports = children.map(tag => `${dashToPascalCase(tag)}`)
        cmpDefines = children.map(tag => `     define${dashToPascalCase(tag)}();`)
      }
    }

    let providers: string[] = []
    let providerImports: string[] = []
    if (groups[cmpMeta.tagName] && groups[cmpMeta.tagName].providers) {
      const children = groups[cmpMeta.tagName].providers
      if (children) {
        providerImports = children.map(p => `import { ${p.name} } from '../${p.import.replace('.ts', '')}'`)
        providers = children.map(p => p.name)
      }
    }

    let declarations: string[] = []
    let declarationImports: string[] = []
    if (groups[cmpMeta.tagName] && groups[cmpMeta.tagName].declarations) {
      const children = groups[cmpMeta.tagName].declarations
      if (children) {
        declarationImports = children.map(p => `import { ${p.name} } from '../${p.import.replace('.ts', '')}'`)
        declarations = children.map(p => p.name)
      }
    }

    const finalText = `
${providerImports.join('\n  ')}
${declarationImports.join('\n  ')}

@NgModule({
  declarations: [${[tagNameAsPascal, ...cmpImports, ...declarations].join(', ')}],
  imports: [BalSharedModule],
  exports: [${[tagNameAsPascal, ...cmpImports, ...declarations].join(', ')}, BalSharedModule],
  providers: [${providers.join(', ')}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ${tagNameAsPascal}Module {
  constructor() {
${[`    define${tagNameAsPascal}();`, ...cmpDefines].join('\n')}
  }
}`

    return finalText
  }
