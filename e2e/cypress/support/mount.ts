import { getContainerEl, setupHooks } from '@cypress/mount-utils'
import { defineCustomElement } from '../../generated/components/bal-app'
import { BalConfig, initialize } from '../../generated/components'
import * as balIcons from '../../generated/icons'

function cleanup() {
  const elements = Array.from(document.getElementsByTagName('bal-app'))
  elements.forEach(el => el.remove())
}

export type MountOptions<TComponent> = {
  components?: { [key: string]: any }
  defineCustomElement?: () => void
  props?: Partial<TComponent>
  events?: Partial<{ [key: string]: Cypress.Agent<any> }>,
  config?: BalConfig
}

export function mount<TComponent>(template, options: MountOptions<TComponent> = {}) {
  if (options && options.defineCustomElement) {
    defineCustomElement()
    options.defineCustomElement()
  }

  initialize({
    animated: false,
    language: 'de',
    region: 'CH',
    icons: {
      ...balIcons,
    },
    ...options.config && {}
  })

  // get the root element to mount the component
  const root = getContainerEl()
  // root.innerHTML = `<bal-app>${template}</bal-app>`

  const appEl = document.createElement('bal-app')
  appEl.innerHTML = template
  root.appendChild(appEl)

  const templateEl = appEl.children.item(0)

  // adds output to the command log
  return cy
    .waitForDesignSystem()
    .wrap(templateEl, { log: true })
    .waitForComponents({ log: true })
    // set all props to the new created web component
    .then(componentEl => {
      if (componentEl && options && options.props) {
        const nativeEl = componentEl.get(0)
        if (nativeEl) {
          for (const [prop, value] of Object.entries(options.props)) {
            nativeEl[prop] = value
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
}

setupHooks(cleanup)
