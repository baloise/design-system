import { components } from '../assets/components.json'

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

const description = (prop: ComponentProp | ComponentEvent) => (prop.docs || '').trim()

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
        defaultValue: { summary: event.event },
        category: 'events',
        type: { summary: event.detail },
      },
    },
  }
}

const generateEvents = (events: ComponentEvent[]) => {
  let args = {}
  events.forEach(event => (args = { ...args, ...generateEvent(event) }))
  return args
}

export const withComponentControls = ({ tag }: { tag: string }): any => {
  const component = components.find(c => c.tag === tag)
  if (component) {
    const props = component.props
    const events = component.events

    return {
      ...generateProps(props as ComponentProp[]),
      ...generateEvents(events as ComponentEvent[]),
    }
  }

  return {}
}
