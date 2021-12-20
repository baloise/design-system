import { h, defineComponent, shallowRef, VNode } from 'vue'

const userComponents = shallowRef<any[]>([])
export const BalApp = defineComponent({
  name: 'BalApp',
  setup(_, { attrs, slots }) {
    return () => {
      return h(
        'bal-app',
        {
          ...attrs,
        },
        [slots.default && slots.default(), ...userComponents.value],
      )
    }
  },
})

/**
 * When rendering user components inside of
 * bal-modal the component
 * needs to be created inside of the current application
 * context otherwise libraries such as vue-i18n or vuex
 * will not work properly.
 *
 * `userComponents` renders teleported components as children
 * of `bal-app` within the current application context.
 */
export const addTeleportedUserComponent = (component: VNode) => {
  userComponents.value = [...userComponents.value, component]
}

export const removeTeleportedUserComponent = (component: VNode) => {
  userComponents.value = userComponents.value.filter(cmp => cmp !== component)
}
