/**
 * filters - docs-json
 * --------------------------------------
 * This script reads the defined filter functions and creates
 * a JSON file with all the meta information for documentation
 * and code generations.
 */

const utilities = require('./utilities')

utilities.write({
  name: 'validators',
  files: 'src/validators/**/*.validators!(*.spec).ts',
  multiple: true,
  assertedReturnType: 'BalValidatorFn',
})
