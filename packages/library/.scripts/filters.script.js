/**
 * filters - docs-json
 * --------------------------------------
 * This script reads the defined filter functions and creates
 * a JSON file with all the meta information for documentation
 * and code generations.
 */

const utilities = require('./utilities')

utilities.write({
  name: 'filters',
  files: 'src/filters/**/!(*.spec|index).ts',
  multiple: false,
  assertedReturnType: 'string',
})
