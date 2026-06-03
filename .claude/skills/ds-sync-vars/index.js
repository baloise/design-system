#!/usr/bin/env node

const { syncComponentVariables } = require('./implementation');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: ds-sync-vars <component-name>');
    console.log('Example: ds-sync-vars button');
    process.exit(1);
  }

  const componentName = args[0];

  try {
    await syncComponentVariables(componentName);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
