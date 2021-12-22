/* eslint @typescript-eslint/no-explicit-any: "off" */
import { VNode, h, ref, Ref } from 'vue'

export interface InputProps extends Object {
  modelValue: string | boolean
}

const UPDATE_VALUE_EVENT = 'update:modelValue'
const MODEL_VALUE = 'modelValue'

interface ComponentOptions {
  modelProp?: string
  modelUpdateEvent?: string
}

const getComponentClasses = (classes: unknown) => {
  return (classes as string)?.split(' ') || []
}

const getElementClasses = (
  ref: Ref<HTMLElement | undefined>,
  componentClasses: Set<string>,
  defaultClasses: string[] = [],
) => {
  return [...Array.from(ref.value?.classList || []), ...defaultClasses].filter(
    (c: string, i, self) => !componentClasses.has(c) && self.indexOf(c) === i,
  )
}

/**
 * Create a callback to define a Vue component wrapper around a Web Component.
 *
 * @prop name - The component tag name (i.e. `ion-button`)
 * @prop componentProps - An array of properties on the
 * component. These usually match up with the @Prop definitions
 * in each component's TSX file.
 * @prop componentOptions - An object that defines additional
 * options for the component such as router or v-model
 * integrations.
 */
export const defineSetup = (name: string, componentEvents: string[] = [], componentOptions: ComponentOptions = {}) => (
  props: any,
  { attrs, slots, emit }: any,
) => {
  const { modelProp, modelUpdateEvent } = componentOptions
  let modelPropValue = (props as any)[modelProp as any]
  const containerRef = ref<HTMLElement>()
  const classes = new Set(getComponentClasses(attrs.class))
  const onVnodeBeforeMount = (vnode: VNode) => {
    // Add a listener to tell Vue to update the v-model
    if (vnode.el && modelUpdateEvent && modelProp) {
      vnode.el.addEventListener(modelUpdateEvent, (e: CustomEvent<any>) => {
        modelPropValue = e?.detail
        emit(UPDATE_VALUE_EVENT, modelPropValue)

        /**
         * We need to emit the change event here
         * rather than on the web component to ensure
         * that any v-model bindings have been updated.
         * Otherwise, the developer will listen on the
         * native web component, but the v-model will
         * not have been updated yet.
         */
        let emittedValue = e.detail
        if (e.detail?.value) {
          emittedValue = e.detail.value
        }
        emit(modelUpdateEvent, emittedValue)
        e.stopImmediatePropagation()
      })
    }

    if (componentEvents && componentEvents.length > 0) {
      componentEvents
        .filter(e => e !== modelUpdateEvent)
        .forEach(componentEvent => {
          if (vnode.el) {
            vnode.el.addEventListener(componentEvent, (event: CustomEvent<any>) => {
              let emittedValue = event.detail
              if (event.detail?.value) {
                emittedValue = event.detail.value
              }
              emit(componentEvent, emittedValue)
            })
          }
        })
    }
  }

  return () => {
    getComponentClasses(attrs.class).forEach(value => {
      classes.add(value)
    })

    let propsToAdd = {
      ...props,
      ref: containerRef,
      class: getElementClasses(containerRef, classes),
      onClick: (props as any).onClick,
      onVnodeBeforeMount: onVnodeBeforeMount,
    }

    if (modelProp) {
      propsToAdd = {
        ...propsToAdd,
        [modelProp]: Object.prototype.hasOwnProperty.call(props, MODEL_VALUE)
          ? props.modelValue
          : (props as any)[modelProp as any],
      }
    }

    return h(name, propsToAdd, slots.default && slots.default())
  }
}
