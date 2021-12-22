import { h, Teleport, VNode } from 'vue'
import { addTeleportedUserComponent, removeTeleportedUserComponent } from './components/BalApp'

export const VueDelegate = (addFn = addTeleportedUserComponent, removeFn = removeTeleportedUserComponent) => {
  let Component: VNode | undefined
  const attachViewToDom = (
    parentElement: HTMLElement,
    component: any, // eslint-disable-line
    componentProps: any = {}, // eslint-disable-line
    classes?: string[],
  ) => {
    /**
     * Ionic Framework passes in modal and popover element
     * refs as props, but if these are not defined
     * on the Vue component instance as props, Vue will
     * warn the user.
     */
    delete componentProps['modal']

    const div = document.createElement('div')
    classes && div.classList.add(...classes)
    parentElement.appendChild(div)

    Component = h(Teleport, { to: div }, h(component, { ...componentProps }))

    addFn(Component)

    return div
  }

  const removeViewFromDom = () => {
    Component && removeFn(Component)
    return Promise.resolve()
  }

  return { attachViewToDom, removeViewFromDom }
}
