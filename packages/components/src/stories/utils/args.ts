import upperfirst from 'lodash.upperfirst'
import { findComponent } from './util'

const hasOptions = prop => prop.type && prop.type.indexOf(' | ') >= 0

const decodeOptions = prop => {
  if (hasOptions(prop)) {
    return {
      options: decodeEnumType(prop),
    }
  }

  return {}
}

const decodeEnumType = prop => {
  return prop.type
    .split(' | ')
    .map(o => o.replaceAll('"', ''))
    .map(o => (o === '' ? 'default' : o))
}

const getControl = prop => {
  switch (prop.type) {
    case 'string':
      return { type: 'text' }

    case 'boolean':
      return { type: 'boolean' }

    case 'number':
      return { type: 'number', min: 0 }

    default:
      if (hasOptions(prop)) {
        return { type: 'select' }
      }
      return { type: 'text' }
  }
}

const generateProps = component => {
  const props = component.props
  const propTypes = {}
  for (let index = 0; index < props.length; index++) {
    const prop = props[index]
    if (prop.name !== 'balTabindex') {
      propTypes[prop.name] = {
        description: prop.docs,
        ...decodeOptions(prop),
        type: {
          name: prop.type,
          required: prop.required,
        },
        table: {
          category: 'props',
          type: { summary: prop.type },
          defaultValue: { summary: prop.default || '' },
        },
        control: getControl(prop),
      }
    }
  }
  return propTypes
}

const generateEvents = component => {
  const eventTypes = {}
  const events = component.events
  for (let index = 0; index < events.length; index++) {
    const event = events[index]
    eventTypes[`on${upperfirst(event.event)}`] = {
      action: event.event,
      description: event.docs,
      table: {
        category: 'event',
        type: { summary: event.detail },
      },
    }
  }
  return eventTypes
}

export const withContent = () => ({
  content: {
    description: 'Content of the component',
    table: {
      category: 'content',
      type: { summary: 'string' },
    },
    control: { type: 'text' },
  },
})

export const stencilArgType = (tag: string): any => {
  const component = findComponent(tag)
  if (!component) {
    return {}
  }
  return {
    ...generateProps(component),
    ...generateEvents(component),
  }
}
