import * as data from '../../../../resources/data/components.json'

export function findPropertyValuesByTag(tag: string, propName: string) {
  const component = data.components.find(comp => comp.tag === tag)

  if (component) {
    const propFound = component.props.find(prop => prop.name == propName)

    if (propFound) {
      return propFound.values.filter((a: any) => a.value !== undefined).map((a: any) => a.value)
    } else {
      return []
    }
  } else {
    return []
  }
}
