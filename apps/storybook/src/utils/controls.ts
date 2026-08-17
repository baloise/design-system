import { components } from '../assets/data/components.json'

interface ComponentProp {
  name: string
  type: string
  docs: string
  default: string
  // Canonical option list recovered for props whose type is widened to `string` in the
  // generated docs (e.g. `color?: KnownColor | string`). See docs-json-no-timestamp.ts.
  oneOfValues?: string[]
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

// Matches quoted string literals, e.g. `"purple"`, ignoring widened members like
// `string` or `undefined` that some union types add as an escape hatch.
const literalOptions = (type: string) => [...type.matchAll(/"([^"]*)"/g)].map(([, value]) => value || 'default')

const isEnum = (prop: ComponentProp) => (prop.oneOfValues?.length ?? 0) > 0 || literalOptions(prop.type).length > 0

const enumOptions = (prop: ComponentProp) => prop.oneOfValues ?? literalOptions(prop.type)

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

const generateEvents = (events: ComponentEvent[]) => {
  let args = {}
  events.forEach(event => (args = { ...args, ...generateEvent(event) }))
  return args
}

const generateSlots = (slots: ComponentSlot[]) => {
  let args = {}
  slots.forEach(s => (args = { ...args, ...generateSlot(s) }))
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
