import kebabCase from 'lodash/kebabCase'
import { components } from '../assets/data/components.json'

export const props = (args: any): string => {
  return Object.keys(args)
    .filter(key => !key.startsWith('on'))
    .filter(key => args[key] !== false && args[key] !== undefined && args[key] !== null)
    .map(key => (args[key] === true ? `${kebabCase(key)}="true"` : `${kebabCase(key)}="${args[key]}"`))
    .join(' ')
}

export type CssClassArgs = Record<string, boolean | string | undefined | null>
export type CssClassMapping = Record<string, string>

/**
 * Parses a union type string into an array of values.
 * @param unionType - The union type string (e.g., "'primary' | 'secondary' | 'grey'")
 * @returns An array of string values
 */
const parseUnionType = (unionType: string): string[] =>
  unionType
    .split('|')
    .map(t => t.trim())
    .map(t => t.replace(/^["'](.*)["']$/, '$1'))
    .filter(t => t.length > 0 && t !== '""')

/**
 * Gets the prop type values from a component's property definition.
 * @param tag - The component tag name (e.g., 'ds-divider')
 * @param propName - The property name (e.g., 'color')
 * @returns An array of possible values for the prop
 */
export const getPropValues = (tag: string, propName: string): string[] => {
  const component = (components as any[]).find(c => c.tag === tag)
  if (!component) return []

  const prop = component.props?.find((p: any) => p.name === propName)
  if (!prop) return []

  return parseUnionType(prop.type)
}

/**
 * Creates CSS class mappings from a component's prop type.
 * @param tag - The component tag name (e.g., 'ds-divider')
 * @param propName - The property name to use in the mapping key (e.g., 'color')
 * @param classMapper - A function that maps each value to a CSS class (e.g., (v) => `is-${v}`)
 * @returns A CssClassMapping object
 *
 * @example
 * createCssMappings('ds-divider', 'color', (v) => `is-${v}`)
 * // Returns: { 'color.primary': 'is-primary', 'color.secondary': 'is-secondary', ... }
 */
export const createCssMappings =
  (tag: string) =>
  (propName: string, classMapper: (value: string) => string): CssClassMapping => {
    const values = getPropValues(tag, propName)

    // If the prop is a boolean, we can just return a single mapping for the "true" value
    if (values.length === 1 && values[0] === 'boolean') {
      return {
        [propName]: classMapper('true'),
      }
    }

    // For non-boolean props, we create a mapping for each possible value
    return values.reduce((acc, value) => {
      acc[`${propName}.${value}`] = classMapper(value)
      return acc
    }, {} as CssClassMapping)
  }

export const cssClasses = (mapping: CssClassMapping, args: CssClassArgs, baseClass = ''): string => {
  const classes = Object.keys(args)
    .filter(key => args[key] === true || (typeof args[key] === 'string' && args[key]?.length > 0))
    .map(key => (args[key] === true ? mapping[key] : mapping[`${key}.${args[key]}`]))
    .join(' ')

  if (classes.length === 0) {
    return baseClass ? `class="${baseClass}"` : ''
  }

  return `class="${baseClass}${baseClass && classes ? ' ' : ''}${classes}"`
}
