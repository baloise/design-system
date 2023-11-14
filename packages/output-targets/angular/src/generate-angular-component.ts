import { dashToPascalCase } from './utils'
import type { ComponentCompilerMeta } from '@stencil/core/internal'

export const createComponentDefinition =
  (
    componentCorePackage: string,
    _distTypesDir: string,
    _rootDir: string,
    outputTargetType: 'legacy' | 'standalone' | 'module',
  ) =>
  (cmpMeta: ComponentCompilerMeta) => {
    // Collect component meta
    const inputs = [
      ...cmpMeta.properties.filter(prop => !prop.internal).map(prop => prop.name),
      ...cmpMeta.virtualProperties.map(prop => prop.name),
    ].sort()
    const outputs = cmpMeta.events.filter(ev => !ev.internal).map(prop => prop)
    const methods = cmpMeta.methods.filter(method => !method.internal).map(prop => prop.name)

    // Process meta
    const hasOutputs = outputs.length > 0

    // Generate Angular @Directive
    const directiveOpts = [
      `selector: \'${cmpMeta.tagName}\'`,
      `template: '<ng-content></ng-content>'`,
      `changeDetection: ChangeDetectionStrategy.OnPush`,
    ]

    if (outputTargetType === 'standalone') {
      directiveOpts.push(`standalone: true`)

      // const valueAccessorConfig = valueAccessorConfigs.find(valueAccessorConfig =>
      //   valueAccessorConfig.elementSelectors.includes(cmpMeta.tagName),
      // )
      // if (valueAccessorConfig) {
      //   directiveOpts.push(`imports: [BaloiseDesignSystemModule]`)
      // }
    }
    if (inputs.length > 0) {
      directiveOpts.push(`inputs: ['${inputs.join(`', '`)}']`)
    }
    if (outputs.length > 0) {
      directiveOpts.push(`outputs: ['${outputs.map(output => output.name).join(`', '`)}']`)
    }

    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName)

    let outputsTypes = outputs
      .filter(
        output =>
          !!output.complexType.references &&
          Object.prototype.hasOwnProperty.call(output.complexType.references, output.complexType.original) &&
          output.complexType.references[output.complexType.original].location === 'import',
      )
      .map(output => output.complexType.original)
      .filter((item, pos, self) => self.indexOf(item) === pos)
      .join(', ')
    if (outputsTypes.length > 0) {
      outputsTypes = `import { ${outputsTypes} } from '${componentCorePackage}';`
    }

    const lines = [
      `
${outputsTypes}
export declare interface ${tagNameAsPascal} extends Components.${tagNameAsPascal} {}
${getProxyCmp(tagNameAsPascal, outputTargetType, inputs, methods)}
@Component({
  ${directiveOpts.join(',\n  ')}
})
export class ${tagNameAsPascal} {`,
    ]

    // Generate outputs
    outputs.forEach(output => {
      lines.push(`  /** ${output.docs.text} ${output.docs.tags.map(tag => `@${tag.name} ${tag.text}`)}*/`)
      lines.push(
        `  ${output.name}!: EventEmitter<BalEvents.${tagNameAsPascal}CustomEvent<${
          output.complexType.resolved.startsWith('Bal') ? output.complexType.original : output.complexType.resolved
        }>>;`,
      )
    })

    lines.push('  protected el: HTMLElement;')
    lines.push(`  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;`)
    if (hasOutputs) {
      lines.push(`    proxyOutputs(this, this.el, ['${outputs.map(output => output.name).join(`', '`)}']);`)
    }
    lines.push(`  }`)
    lines.push(`}`)

    return lines.join('\n')
  }

function getProxyCmp(
  tagNameAsPascal: string,
  outputTargetType: 'legacy' | 'standalone' | 'module',
  inputs: string[],
  methods: string[],
): string {
  const hasInputs = inputs.length > 0
  const hasMethods = methods.length > 0
  const proxMeta: string[] = []

  if (hasInputs) proxMeta.push(`inputs: ['${inputs.join(`', '`)}']`)
  if (hasMethods) proxMeta.push(`methods: ['${methods.join(`', '`)}']`)

  if (outputTargetType === 'standalone' || outputTargetType === 'module') {
    proxMeta.push(`defineCustomElementFn: define${tagNameAsPascal}`)
  }

  return `@ProxyCmp({\n  ${proxMeta.join(',\n  ')}\n})`
}
