import { getContainerEl, ROOT_SELECTOR, setupHooks } from '@cypress/mount-utils'
import { BalConfig, initialize } from '../../generated/components'
import { defineAllComponents } from '../../generated/components/all'
import * as balIcons from '../../generated/icons'

Cypress.on('run:start', () => {
  // Consider doing a check to ensure your adapter only runs in Component Testing mode.
  if (Cypress.testingType !== 'component') {
    return
  }

  Cypress.on('test:before:run', () => {
    // Do some cleanup from previous test - for example, clear the DOM.
    getContainerEl().innerHTML = ''
  })
})

export type MountOptions<TComponent, TEventMap = any> = {
  config?: BalConfig
  components?: { [key: string]: any }
  props?: Partial<TComponent>
  events?: Partial<Record<keyof TEventMap | 'click', Cypress.Agent<any>>>
}

export function mount<TComponent, TEventMap = any>(
  template: string,
  options: MountOptions<TComponent, TEventMap> = {},
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = document.querySelector(ROOT_SELECTOR)!

  initialize({
    animated: false,
    language: 'de',
    region: 'CH',
    icons: {
      ...balIcons,
    },
    ...(options.config && {}),
  })

  defineAllComponents()

  const appEl = document.createElement('bal-app')
  appEl.innerHTML = template

  let templateEl = appEl.children.item(0)
  const nestedComponentEl = appEl.querySelector(`#component`)

  if (nestedComponentEl) {
    templateEl = nestedComponentEl
  }

  templateEl.id = 'component'

  if (templateEl && options && options.props) {
    if (templateEl) {
      for (const [prop, value] of Object.entries(options.props)) {
        templateEl[prop] = value
      }
    }
  }

  root.appendChild(appEl)

  // adds output to the command log
  return (
    cy
      .waitForDesignSystem()
      .wrap(document.querySelector('#component'), { log: false })
      .waitForComponents({ log: false })
      // set all props to the new created web component
      .then(componentEl => {
        if (componentEl && options && options.props) {
          const nativeEl = componentEl.get(0)
          if (nativeEl) {
            for (const [prop, value] of Object.entries(options.props)) {
              Cypress.log({
                name: 'prop',
                type: 'parent',
                message: prop + ': ' + value,
                $el: componentEl,
              })
            }
          }
        }
      })
      // set event listeners
      .then(componentEl => {
        if (componentEl && options && options.events) {
          for (const [event, value] of Object.entries(options.events)) {
            Cypress.log({
              name: 'event',
              type: 'parent',
              message: 'listen to @' + event,
              $el: componentEl,
            })
            componentEl.on(event, value)
          }
        }
      })
      .then(componentEl => {
        Cypress.log({
          name: 'mount',
          type: 'parent',
          message: 'Component is ready 🚀',
          $el: componentEl,
        })
        Cypress.log({
          name: '-----',
          type: 'parent',
          message: '--------------------',
        })
      })
  )
}

setupHooks()
