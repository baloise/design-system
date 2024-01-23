import * as data from '../../../packages/components/.tmp/components.json'

export function findColorValuesByTag(tag: string, propName: string) {
  const component = data.components.find(comp => comp.tag === tag)

  if (component) {
    const propFound = component.props.find(prop => prop.name == propName)

    if (propFound) {
      return propFound.values.filter(a => a.value !== undefined).map(a => a.value)
    } else {
      return []
    }
  } else {
    return []
  }
}
