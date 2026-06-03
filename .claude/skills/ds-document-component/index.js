#!/usr/bin/env node

const { documentComponent } = require('./implementation');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: ds-document-component <component-name>');
    console.log('Example: ds-document-component button');
    process.exit(1);
  }

  const componentName = args[0];

  try {
    await documentComponent(componentName);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
