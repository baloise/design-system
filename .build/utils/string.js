const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1)

const uncapitalize = value => value.charAt(0).toLowerCase() + value.slice(1)

const convertToDotCase = value =>
  value
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/\s+/g, '.')
    .toLowerCase()

const toCamelCase = text => text.replace(/-\w/g, clearAndUpper)

const toPascalCase = text => text.replace(/(^\w|-\w)/g, clearAndUpper)

const clearAndUpper = text => text.replace(/-/, '').toUpperCase()

module.exports = {
  capitalize,
  uncapitalize,
  convertToDotCase,
  toCamelCase,
  toPascalCase,
}
