import { components } from '../assets/data/components.json'

interface ComponentProp {
  name: string
  type: string
  docs: string
  default: string
}

interface ComponentEvent {
  event: string
  docs: string
  detail: string
}

interface ComponentMethod {
  name: string
  docs: string
  signature: string
}

interface ComponentSlot {
  name: string
  docs: string
}

interface ComponentPart {
  name: string
  docs: string
}

const description = (prop: ComponentProp | ComponentEvent | ComponentMethod | ComponentSlot | ComponentPart) =>
  (prop.docs || '').trim()

const isNumber = (prop: ComponentProp) => prop.type === 'number'
const isText = (prop: ComponentProp) => prop.type === 'string'
const isBoolean = (prop: ComponentProp) => prop.type === 'boolean'
const isEnum = (prop: ComponentProp) => prop.type.includes('|')

const enumOptions = (prop: ComponentProp) =>
  prop.type
    .split('|')
    .map(t => t.trim())
    .map(t => (t === '""' ? 'default' : t))
    .map(t => t.replace(/^"(.*)"$/, '$1'))

// https://storybook.js.org/docs/html/essentials/controls#choosing-the-control-type
const generateProp = (prop: ComponentProp) => {
  if (isNumber(prop)) {
    return {
      [prop.name]: {
        control: 'number',
        description: description(prop),
        defaultValue: prop.default,
        table: {
          category: 'properties',
          defaultValue: { summary: prop.default },
          type: { summary: 'number' },
        },
      },
    }
  }

  if (isText(prop)) {
    return {
      [prop.name]: {
        control: 'text',
        description: description(prop),
        defaultValue: prop.default,
        table: {
          category: 'properties',
          defaultValue: { summary: prop.default },
          type: { summary: 'string' },
        },
      },
    }
  }

  if (isBoolean(prop)) {
    return {
      [prop.name]: {
        control: 'boolean',
        description: description(prop),
        defaultValue: prop.default,
        table: {
          category: 'properties',
          defaultValue: { summary: prop.default },
          type: { summary: 'boolean' },
        },
      },
    }
  }

  if (isEnum(prop)) {
    return {
      [prop.name]: {
        control: 'select',
        defaultValue: prop.default,
        options: enumOptions(prop),
        description: description(prop),
        table: {
          category: 'properties',
          defaultValue: { summary: prop.default },
          type: { summary: 'enum' },
        },
      },
    }
  }

  return {}
}

const generateProps = (props: ComponentProp[]) => {
  let args = {}
  props.forEach(prop => (args = { ...args, ...generateProp(prop) }))
  return args
}

const generateEvent = (event: ComponentEvent) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return {
    [`on${capitalizeFirstLetter(event.event)}`]: {
      action: event.event,
      description: description(event),
      table: {
        // defaultValue: { summary: event.event },
        category: 'events',
        type: { summary: event.detail },
      },
    },
  }
}

const generateMehod = (method: ComponentMethod) => {
  return {
    [`${method.name}`]: {
      description: description(method),
      table: {
        // defaultValue: { summary: method.signature },
        category: 'methods',
        type: { summary: method.signature },
      },
    },
  }
}

const generateSlot = (slot: ComponentSlot) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return {
    [`slot${capitalizeFirstLetter(slot.name)}`]: {
      description: description(slot),
      control: 'text',
      table: {
        category: 'slots',
        type: { summary: 'string' },
      },
    },
  }
}

const generatePart = (part: ComponentPart) => {
  return {
    [`${part.name}`]: {
      description: description(part),
      table: {
        // defaultValue: { summary: method.signature },
        category: 'parts',
        // type: { summary: method.signature },
      },
    },
  }
}

const generateEvents = (events: ComponentEvent[]) => {
  let args = {}
  events.forEach(event => (args = { ...args, ...generateEvent(event) }))
  return args
}

const generateMethods = (methods: ComponentMethod[]) => {
  let args = {}
  methods.forEach(m => (args = { ...args, ...generateMehod(m) }))
  return args
}

const generateSlots = (slots: ComponentSlot[]) => {
  let args = {}
  slots.forEach(s => (args = { ...args, ...generateSlot(s) }))
  return args
}

const generateParts = (parts: ComponentPart[]) => {
  let args = {}
  parts.forEach(p => (args = { ...args, ...generatePart(p) }))
  return args
}

export const withComponentControls = ({ tag }: { tag: string }): any => {
  const component = components.find(c => c.tag === tag)
  if (component) {
    const slots = component.slots
    const props = component.props
    const events = component.events
    // const methods = component.methods
    // const parts = component.parts

    return {
      ...generateSlots(slots as ComponentSlot[]),
      ...generateProps(props as ComponentProp[]),
      ...generateEvents(events as ComponentEvent[]),
      // ...generateMethods(methods as ComponentMethod[]),
      // ...generateParts(parts as ComponentPart[]),
    }
  }

  return {}
}
