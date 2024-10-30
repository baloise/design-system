import { dirname, join } from 'path'
import type { OutputTargetAngular, ValueAccessorTypes } from './types'
import type { CompilerCtx, ComponentCompilerMeta, Config, CopyTask } from '@stencil/core/internal'

interface ValueAccessor {
  elementSelectors: string[]
  eventTargets: [string, string][]
}

type NormalizedValueAccessors = {
  [T in ValueAccessorTypes]: ValueAccessor
}

export default async function generateValueAccessors(
  compilerCtx: CompilerCtx,
  _components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular,
  config: Config,
) {
  if (!Array.isArray(outputTarget.valueAccessorConfigs) || outputTarget.valueAccessorConfigs.length === 0) {
    return
  }

  const targetDir = dirname(outputTarget.directivesProxyFile)

  const normalizedValueAccessors: NormalizedValueAccessors = outputTarget.valueAccessorConfigs.reduce(
    (allAccessors, va) => {
      const elementSelectors = Array.isArray(va.elementSelectors) ? va.elementSelectors : [va.elementSelectors]
      const type = va.type
      let allElementSelectors: string[] = []
      let allEventTargets: [string, string][] = []

      if (Object.prototype.hasOwnProperty.call(allAccessors, type)) {
        allElementSelectors = allAccessors[type].elementSelectors
        allEventTargets = allAccessors[type].eventTargets
      }
      return {
        ...allAccessors,
        [type]: {
          elementSelectors: allElementSelectors.concat(elementSelectors),
          eventTargets: allEventTargets.concat([[va.event, va.targetAttr]]),
        },
      }
    },
    {} as NormalizedValueAccessors,
  )

  await Promise.all(
    Object.keys(normalizedValueAccessors).map(async type => {
      const valueAccessorType = type as ValueAccessorTypes // Object.keys converts to string
      const targetFileName = `${type}-value-accessor.ts`
      const targetFilePath = join(targetDir, targetFileName)
      const srcFilePath = join(__dirname, '../../../resources/control-value-accessors/', targetFileName)
      const srcFileContents = await compilerCtx.fs.readFile(srcFilePath)

      const finalText = createValueAccessor(srcFileContents, normalizedValueAccessors[valueAccessorType])
      await compilerCtx.fs.writeFile(targetFilePath, finalText)
    }),
  )

  await copyResources(config, ['value-accessor.ts'], targetDir)
}

function createValueAccessor(srcFileContents: string, valueAccessor: ValueAccessor) {
  const hostContents = valueAccessor.eventTargets.map(listItem =>
    VALUE_ACCESSOR_EVENTTARGETS.replace(VALUE_ACCESSOR_EVENT, listItem[0]).replace(
      VALUE_ACCESSOR_TARGETATTR,
      listItem[1],
    ),
  )

  return srcFileContents
    .replace(VALUE_ACCESSOR_SELECTORS, valueAccessor.elementSelectors.join(', '))
    .replace(VALUE_ACCESSOR_EVENTTARGETS, hostContents.join(',\n'))
}

function copyResources(config: Config, resourcesFilesToCopy: string[], directory: string) {
  if (!config.sys || !config.sys.copy) {
    throw new Error('stencil is not properly intialized at this step. Notify the developer')
  }
  const copyTasks: Required<CopyTask>[] = resourcesFilesToCopy.map(rf => {
    return {
      src: join(__dirname, '../../../resources/control-value-accessors/', rf),
      dest: join(directory, rf),
      keepDirStructure: false,
      warn: false,
      ignore: [],
    }
  })
  return config.sys.copy(copyTasks, join(directory))
}

const VALUE_ACCESSOR_SELECTORS = `<VALUE_ACCESSOR_SELECTORS>`
const VALUE_ACCESSOR_EVENT = `<VALUE_ACCESSOR_EVENT>`
const VALUE_ACCESSOR_TARGETATTR = '<VALUE_ACCESSOR_TARGETATTR>'
const VALUE_ACCESSOR_EVENTTARGETS = `    '(<VALUE_ACCESSOR_EVENT>)': 'handleValueChange($event)'`
