/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path, { join, normalize } from 'path'
import { writeFile, readFile } from 'fs/promises'
import { copy } from 'fs-extra'
import replace from 'replace-in-file'
import type { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal'
import type { OutputTargetWeb } from './types'

export const NEWLINE = '\n'

export async function webProxyOutput(
  config: Config,
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetWeb,
  components: ComponentCompilerMeta[],
) {
  // After the stencil compiler is finished some files will get adjusted.
  compilerCtx.events.on('buildFinish', async () => {
    await improveComponentsOutput(config, outputTarget, components)
    await adjustInterfacePath(config)

    if (!outputTarget.isTest) {
      await setVersion(config)
    }
  })
}

async function improveComponentsOutput(config: Config, outputTarget: OutputTargetWeb, components: ComponentCompilerMeta[]) {
  const content = generateDefineAllFile(components)
  const types = generateDefineAllDefinitionFile(components)

  const rootDir = path.normalize(config.rootDir || '')
  const baseDir = path.join(rootDir || '', outputTarget.dir)

  saveFile(`${baseDir}/all.js`, content)
  saveFile(`${baseDir}/all.d.ts`, types)

  const contentIndex = await readFile(join(baseDir, 'index.d.ts'), 'utf-8')
  const contentCustom = await readFile(
    join(rootDir, 'config', 'custom-elements', 'custom-elements.d.ts'),
    'utf-8',
  )

  await saveFile(join(baseDir, 'index.d.ts'), [contentIndex, contentCustom].join(NEWLINE))

  if (!outputTarget.isTest) {
    await copy(
      join(rootDir, 'config', 'custom-elements', 'package.json.tmp'),
      join(baseDir, 'package.json'),
    )
  }
}

async function adjustInterfacePath(config: Config) {
  const rootDir = path.normalize(config.rootDir || '')

  const files = join(rootDir, 'dist/types/**/*interfaces.d.ts')
  replace.sync({
    files: files,
    from: `/// <reference types="packages/core/src/interfaces" />`,
    to: `/// <reference types="@baloise/ds-core" />`,
  })
}

async function setVersion(config: Config) {
  const rootDir = path.normalize(config.rootDir || '')

  const content = await readFile(join(rootDir, 'package.json'), 'utf8')
  const json = JSON.parse(content)
  await replace({
    files: join(rootDir, 'dist', '**/*.js').replace(/\\/g, '/'),
    from: /BAL_DEV_VERSION/g,
    to: json.version,
  })
  await replace({
    files: join(rootDir, 'components', '**/*.js').replace(/\\/g, '/'),
    from: /BAL_DEV_VERSION/g,
    to: json.version,
  })
}

const saveFile = async (path: string, content: string) => {
  return writeFile(normalize(path), content, 'utf-8')
}

const generateDefineAllFile = (components: ComponentCompilerMeta[] = []) => {
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

const generateDefineAllDefinitionFile = (components: ComponentCompilerMeta[] = []) => {
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
