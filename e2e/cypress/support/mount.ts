import { getContainerEl, setupHooks } from '@cypress/mount-utils'
import { BalConfig, initialize } from '../../generated/components'
import { defineAllComponents } from '../../generated/all'
import * as balIcons from '../../generated/icons'

function cleanup() {
  const elements = Array.from(document.getElementsByTagName('bal-app'))
  elements.forEach(el => el.remove())
}

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
  const root = getContainerEl()

  if (root.hasChildNodes()) {
    cleanup()
  }

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
      .wrap(templateEl, { log: false })
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
      // set event listeners
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

setupHooks(cleanup)
