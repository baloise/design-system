import { Config } from '@stencil/core'

/**
 * Stencil Configurations for logging the generated contexts
 */
export const config: Config = {
  namespace: 'design-system-components',
  globalStyle: 'src/styles/global.scss',
  outputTargets: [
    {
      type: 'custom',
      name: 'vue-bubu-library',
      async generator(config, compilerCtx, buildCtx) {
        buildCtx.components.forEach(component => {
          if (component.tagName === 'bal-datepicker') {
            component.properties.forEach(prop => {
              console.log(prop.name)
              console.log(prop.type)
              console.log(prop.complexType)
              console.log('--------------')
            })
          }
        })
      },
    },
  ],
}
