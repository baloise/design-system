import upperfirst from 'lodash.upperfirst'
import buildCtx from '../assets/components.json'

const decodeEnumType = prop => {
  return {
    type: 'select',
    options: prop.type
      .split(' | ')
      .map(o => o.replaceAll('"', ''))
      .map(o => (o === '' ? 'default' : o)),
  }
}

const getControl = prop => {
  switch (prop.type) {
    case 'string':
      return { type: 'text' }

    case 'number':
      return { type: 'number', min: 0 }

    default:
      if (prop.name === 'color') {
        return decodeEnumType(prop)
      }
      return { type: 'text' }
  }
}

const generateProps = component => {
  const props = component.props
  const propTypes = {}
  for (let index = 0; index < props.length; index++) {
    const prop = props[index]
    propTypes[prop.name] = {
      description: prop.docs,
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

const findComponent = (tag: string) => {
  const index = buildCtx.components.findIndex(c => c.tag === tag)
  if (index < 0) {
    return undefined
  }
  return buildCtx.components[index]
}

export const generateArgType = (tag: string, extendedArgTypes = {}): any => {
  const component = findComponent(tag)
  if (!component) {
    return {}
  }
  return {
    ...generateProps(component),
    ...generateEvents(component),
    ...extendedArgTypes,
  }
}
