/**
 * ds-create-component implementation
 *
 * This script handles the interactive questionnaire and component generation workflow.
 * It does NOT directly execute but provides the logic for the skill to call.
 */

const path = require('path');
const fs = require('fs');

/**
 * Main questionnaire flow
 */
async function createComponent(userResponses) {
  const {
    componentName,
    purpose,
    isMigration,
    oldComponentName,
    props,
    events,
    hasSubcomponents,
    subcomponents,
    variants,
  } = userResponses;

  // Validate component name
  if (!componentName || !/^[a-z]+(-[a-z]+)*$/.test(componentName)) {
    throw new Error(
      'Invalid component name. Use kebab-case (e.g., "my-button")'
    );
  }

  const componentPath = path.join(
    process.cwd(),
    'packages/core/src/components',
    componentName
  );

  // Check if component already exists
  if (fs.existsSync(componentPath)) {
    return {
      status: 'warn',
      message: `Component "${componentName}" already exists at ${componentPath}. Overwrite?`,
      requiresConfirmation: true,
    };
  }

  // Generate component files
  const files = generateComponentFiles(
    componentName,
    purpose,
    props,
    events,
    variants
  );

  // If migration, validate and flag breaking changes
  let tokenWarnings = [];
  let migrationNotes = [];

  if (isMigration) {
    migrationNotes = await validateMigration(oldComponentName, props, events);
  }

  // Validate tokens in generated SCSS
  tokenWarnings = validateTokens(files['scss']);

  // Generate subcomponents if specified
  if (hasSubcomponents && subcomponents.length > 0) {
    const subcomponentFiles = {};
    for (const subcomponent of subcomponents) {
      const subFiles = generateComponentFiles(
        subcomponent,
        `Subcomponent of ${componentName}`,
        [],
        [],
        variants
      );
      // Prefix with subcomponent folder
      Object.keys(subFiles).forEach(key => {
        subcomponentFiles[`${subcomponent}/${key}`] = subFiles[key];
      });
    }
    Object.assign(files, subcomponentFiles);
  }

  return {
    status: 'ready',
    componentName,
    files,
    tokenWarnings,
    migrationNotes,
    subcomponents: hasSubcomponents ? subcomponents : [],
  };
}

/**
 * Generate individual component files
 */
function generateComponentFiles(componentName, purpose, props, events, variants) {
  const PascalName = toPascalCase(componentName);
  const UPPER_NAME = toUpperSnakeCase(componentName);

  return {
    tsx: generateTSX(PascalName, componentName, purpose, props, events),
    interfaces: generateInterfaces(PascalName, props, events, variants),
    scss: generateSCSS(componentName, props, variants),
    html: generateVisualHTML(componentName, props, variants),
  };
}

/**
 * Generate component.tsx
 */
function generateTSX(PascalName, componentName, purpose, props, events) {
  const propDefinitions = props
    .map(p => {
      const type = p.type || 'string';
      return `  /**
   * ${p.description || 'Component property'}
   */
  @Prop() readonly ${p.name}: ${type} = ${p.default || "''"}`;
    })
    .join('\n\n');

  const eventDefinitions = events
    .map(e => {
      return `  /**
   * Emitted when ${e.name.replace(/^ds/, 'the ')} event occurs.
   */
  @Event() ${e.name}: EventEmitter<void>`;
    })
    .join('\n\n');

  return `import { Component, Element, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

/**
 * ${PascalName} ${purpose}
 *
 * @part ${componentName} - The main ${componentName} element.
 */
@Component({
  tag: 'ds-${componentName}',
  styleUrl: '${componentName}.host.scss',
  shadow: true,
})
export class ${PascalName} implements DsComponentInterface {
  log!: LogInstance

  @Logger('ds-${componentName}')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC PROPERTY API
  // ═══════════════════════════════════════════════════════════════════════════════

${propDefinitions || '  // Add props here'}

  // ═══════════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PROPERTY VALIDATION
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC LISTENERS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}`;
}

/**
 * Generate component.interfaces.ts
 */
function generateInterfaces(PascalName, props, events, variants) {
  const propTypes = props
    .filter(p => p.type && p.type.includes('|'))
    .map(p => {
      const typeName = `${PascalName}${toPascalCase(p.name)}`;
      const values = p.type
        .split('|')
        .map(v => `'${v.trim()}'`)
        .join(' | ');
      return `export type ${typeName} = ${values}

export const ${toUpperSnakeCase(p.name)}: ${typeName}[] = [
  ${p.type
    .split('|')
    .map(v => `'${v.trim()}'`)
    .join(',\n  ')},
]`;
    })
    .join('\n\n');

  return propTypes || `// Add prop types and enums here`;
}

/**
 * Generate component.host.scss
 */
function generateSCSS(componentName, props, variants) {
  const variantStyles = variants
    .map(v => {
      return `:host(.is-${v}) {
  // Add ${v} variant styles here
}`;
    })
    .join('\n\n');

  return `@use '@baloise/ds-css/dist/scss/mixins' as *;
@use '../../vars' as vars;

/**
 * Variables
 * ═══════════════════════════════════════════════════════════════════════════════
 * Define CSS custom properties that can be overridden by consumers.
 *
 * @prop --${componentName}-color-text: Text color
 * @prop --${componentName}-color-background: Background color
 * @prop --${componentName}-border-radius: Border radius
 */

:host {
  @include vars.base(${componentName});

  // Use alias tokens (preferred)
  @include vars.local(
    ${componentName}-color-text,
    var(--ds-alias-color-text-default)
  );
  @include vars.local(
    ${componentName}-color-background,
    var(--ds-alias-color-background-default)
  );
  @include vars.local(
    ${componentName}-border-radius,
    var(--ds-alias-radius-base)
  );
}

/**
 * Component Styles
 * ═══════════════════════════════════════════════════════════════════════════════
 */

:host {
  display: block;

  // Add component styles here
  color: var(--_${componentName}-color-text);
  background-color: var(--_${componentName}-color-background);
  border-radius: var(--_${componentName}-border-radius);
}

${variantStyles ? `\n${variantStyles}` : ''}

:host(.is-disabled) {
  opacity: 0.5;
  pointer-events: none;
}`;
}

/**
 * Generate component.visual.html
 */
function generateVisualHTML(componentName, props, variants) {
  const variantSections = variants
    .map(v => {
      return `      <!-- ${toPascalCase(v)} -->
      <section data-testid="${v}">
        <span>${toPascalCase(v)}</span>
        <ds-${componentName} class="is-${v}"></ds-${componentName}>
      </section>`;
    })
    .join('\n\n');

  return `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />

    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>
  <body>
    <main class="container">
${variantSections}

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <ds-${componentName} disabled></ds-${componentName}>
      </section>

      <!-- Themeing -->
      <section class="custom-theme" data-testid="themeing">
        <span>Custom Theme (CSS Variable Override)</span>
        <style>
          .custom-theme ds-${componentName} {
            --${componentName}-color-background: #ff6600;
            --${componentName}-color-text: #ffffff;
          }
        </style>
        <ds-${componentName}></ds-${componentName}>
      </section>
    </main>
  </body>
</html>`;
}

/**
 * Validate token usage in SCSS
 */
function validateTokens(scssContent) {
  const warnings = [];
  const tokenRegex = /var\(--ds-([^)]+)\)/g;
  let match;

  while ((match = tokenRegex.exec(scssContent)) !== null) {
    const token = match[1];

    // Check for global tokens (not alias, not component)
    if (!token.startsWith('alias-') && !token.includes('-color-')) {
      warnings.push({
        type: 'global-token',
        token: `--ds-${token}`,
        message: `Global token detected. Consider using an alias token or creating a component token.`,
      });
    }
  }

  return warnings;
}

/**
 * Validate migration compatibility
 */
async function validateMigration(oldComponentName, newProps, newEvents) {
  // This would fetch from main branch and compare
  // For now, return structure
  return [
    {
      type: 'info',
      message: `Migration: Extracting from old "${oldComponentName}" component on main branch`,
    },
  ];
}

/**
 * Helper: Convert to PascalCase
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Helper: Convert to UPPER_SNAKE_CASE
 */
function toUpperSnakeCase(str) {
  return str.replace(/-/g, '_').toUpperCase();
}

module.exports = {
  createComponent,
  generateComponentFiles,
  validateTokens,
  validateMigration,
  toPascalCase,
  toUpperSnakeCase,
};
