import type { TSESTree } from '@typescript-eslint/utils'

type DecoratedNode =
  | TSESTree.ClassDeclaration
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition

/** Returns true if the node has a decorator with the given name (e.g. 'Prop', 'Listen'). */
export function hasDecorator(node: DecoratedNode, name: string): boolean {
  return getDecorator(node, name) !== null
}

/** Returns the first decorator matching the given name, or null. */
export function getDecorator(node: DecoratedNode, name: string): TSESTree.Decorator | null {
  for (const decorator of node.decorators ?? []) {
    const expr = decorator.expression
    if (expr.type === 'Identifier' && expr.name === name) return decorator
    if (
      expr.type === 'CallExpression' &&
      expr.callee.type === 'Identifier' &&
      expr.callee.name === name
    ) return decorator
  }
  return null
}

/**
 * Returns the first string literal argument of a decorator call.
 * e.g. @Watch('value') → 'value'
 */
export function getDecoratorStringArg(decorator: TSESTree.Decorator, index = 0): string | null {
  const expr = decorator.expression
  if (expr.type !== 'CallExpression') return null
  const arg = expr.arguments[index]
  if (!arg || arg.type !== 'Literal') return null
  return typeof arg.value === 'string' ? arg.value : null
}

/**
 * Returns the string value of a named property in a decorator's object argument.
 * e.g. @Component({ tag: 'ds-button' }) → getDecoratorObjectProp(dec, 'tag') === 'ds-button'
 */
export function getDecoratorObjectProp(decorator: TSESTree.Decorator, propName: string): string | null {
  const expr = decorator.expression
  if (expr.type !== 'CallExpression') return null
  const obj = expr.arguments[0]
  if (!obj || obj.type !== 'ObjectExpression') return null
  for (const prop of obj.properties) {
    if (
      prop.type === 'Property' &&
      prop.key.type === 'Identifier' &&
      prop.key.name === propName &&
      prop.value.type === 'Literal' &&
      typeof prop.value.value === 'string'
    ) {
      return prop.value.value
    }
  }
  return null
}

/** Returns the string name of a MethodDefinition key. */
export function getMethodName(node: TSESTree.MethodDefinition): string | null {
  const key = node.key
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

/** Returns the string name of a PropertyDefinition key. */
export function getPropertyName(node: TSESTree.PropertyDefinition): string | null {
  const key = node.key
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

/** Returns true if the decorator's first object argument has a given boolean property set to true. */
export function hasDecoratorBoolOption(decorator: TSESTree.Decorator, propName: string): boolean {
  const expr = decorator.expression
  if (expr.type !== 'CallExpression') return false
  const obj = expr.arguments[0]
  if (!obj || obj.type !== 'ObjectExpression') return false
  for (const prop of obj.properties) {
    if (
      prop.type === 'Property' &&
      prop.key.type === 'Identifier' &&
      prop.key.name === propName &&
      prop.value.type === 'Literal' &&
      prop.value.value === true
    ) {
      return true
    }
  }
  return false
}
