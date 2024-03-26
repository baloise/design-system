/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { OutputTargetWeb } from './types'
import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal'

export async function webProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetWeb,
  components: ComponentCompilerMeta[],
) {
  const content = generateDefineAllFile(components)
  const types = generateDefineAllDefinitionFile(components)
  compilerCtx.fs.writeFile(outputTarget.proxiesFile, content)
  compilerCtx.fs.writeFile(outputTarget.proxiesFile.replace('.js', '.d.ts'), types)
}

const generateDefineAllFile = (components: ComponentCompilerMeta[]) => {
  const lines: string[] = []
  for (let index = 0; index < components.length; index++) {
    const component = components[index]
    lines.push(
      `import { Bal${component.componentClassName}, defineCustomElement as defineBal${component.componentClassName} } from './${component.tagName}'`,
    )
  }

  lines.push('')

  for (let index = 0; index < components.length; index++) {
    const component = components[index]
    lines.push(`export { Bal${component.componentClassName}, defineBal${component.componentClassName} }`)
  }

  lines.push('')

  lines.push('export const defineAllComponents = () => {')
  for (let index = 0; index < components.length; index++) {
    const component = components[index]
    lines.push(`  defineBal${component.componentClassName}()`)
  }
  lines.push('}')

  lines.push('')

  return lines.join('\n') + '\n'
}

const generateDefineAllDefinitionFile = (components: ComponentCompilerMeta[]) => {
  const lines: string[] = []
  for (let index = 0; index < components.length; index++) {
    const component = components[index]
    lines.push(
      `import { Bal${component.componentClassName}, defineCustomElement as defineBal${component.componentClassName} } from './${component.tagName}'`,
    )
  }

  lines.push('')

  for (let index = 0; index < components.length; index++) {
    const component = components[index]
    lines.push(`export { Bal${component.componentClassName}, defineBal${component.componentClassName} }`)
  }

  lines.push('')

  lines.push('export declare const defineAllComponents: () => void;')

  lines.push('')

  return lines.join('\n') + '\n'
}
