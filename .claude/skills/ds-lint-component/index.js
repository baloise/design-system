#!/usr/bin/env node

const { lintComponent } = require('./implementation');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: ds-lint-component <component-name> [--fix]');
    console.log('Example: ds-lint-component button');
    console.log('         ds-lint-component button --fix');
    process.exit(1);
  }

  const componentName = args[0];
  const shouldFix = args.includes('--fix');

  try {
    await lintComponent(componentName, shouldFix);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
