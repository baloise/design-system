const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const REPO_ROOT = path.resolve(__dirname, '../../..');

const VALIDATOR_PATTERNS = {
  'string': 'ValidateEmptyOrType(\'string\')',
  'number': 'ValidateEmptyOrType(\'number\')',
  'boolean': 'ValidateEmptyOrType(\'boolean\')',
};

const SECTIONS_ORDER = [
  'PUBLIC PROPERTY API',
  'LIFECYCLE',
  'PUBLIC LISTENERS',
  'PUBLIC METHODS',
  'EVENT HANDLERS',
  'PRIVATE METHODS',
  'RENDER',
];

// Documentation keywords that indicate a JSDoc comment
const DOC_KEYWORDS = ['@internal', '@deprecated', '@private', '@protected', '@public', '@readonly', '@param', '@returns', '@example', '@throws', '@see', '@link', '@todo', '@fixme'];

async function lintComponent(componentName, shouldFix = false) {
  const componentPath = path.join(REPO_ROOT, 'packages/core/src/components', componentName);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component not found: ${componentName}`);
  }

  const tsxFiles = globSync(`${componentPath}/**/*.tsx`).filter(f => !f.includes('.spec.'));
  const scssFiles = globSync(`${componentPath}/**/*.scss`);

  if (tsxFiles.length === 0) {
    throw new Error(`No .tsx files found in ${componentName}`);
  }

  const results = [];
  const fixes = [];

  // Lint TSX files
  for (const file of tsxFiles) {
    const report = await lintFile(file);
    results.push(report);

    if (shouldFix && report.violations.length > 0) {
      const fixed = await fixFile(file, report);
      if (fixed.changes.length > 0) {
        fixes.push(fixed);
      }
    }
  }

  // Lint SCSS files for design tokens
  for (const file of scssFiles) {
    const report = await lintScssFile(file);
    if (report.violations.length > 0) {
      results.push(report);
    }
  }

  printReport(componentName, results, shouldFix, fixes);
}

async function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(REPO_ROOT, filePath);
  const violations = [];

  // Parse the file
  const props = extractProps(content);
  const events = extractEvents(content);
  const listeners = extractListeners(content);
  const methods = extractMethods(content);
  const handlers = extractHandlers(content);
  const privateMethods = extractPrivateMethods(content);
  const render = extractRender(content);
  const dividers = extractDividers(content);
  const setupValidationCalls = extractSetupValidationCalls(content);
  const componentDocs = extractComponentDocs(content);
  const propDocs = extractPropDocs(content);
  const eventDocs = extractEventDocs(content);
  const methodDocs = extractMethodDocs(content);
  const tokenViolations = checkDesignTokens(content);

  // Check prop validators
  for (const prop of props) {
    if (!prop.validator) {
      violations.push({
        type: 'missing-validator',
        severity: 'error',
        prop: prop.name,
        message: `Missing @Validate* decorator on prop "${prop.name}"`,
      });
    } else if (!prop.validatorMatches) {
      violations.push({
        type: 'validator-mismatch',
        severity: 'error',
        prop: prop.name,
        message: `Validator type mismatch for "${prop.name}" (${prop.type})`,
      });
    }
  }

  // Check setupValidation calls
  if (props.length > 0) {
    if (!setupValidationCalls.connectedCallback) {
      violations.push({
        type: 'missing-setup-validation',
        severity: 'error',
        method: 'connectedCallback',
        message: 'setupValidation(this) missing from connectedCallback()',
      });
    }
    if (!setupValidationCalls.componentWillUpdate) {
      violations.push({
        type: 'missing-setup-validation',
        severity: 'error',
        method: 'componentWillUpdate',
        message: 'setupValidation(this) missing from componentWillUpdate()',
      });
    }
  }

  // Check dividers
  const dividerViolations = checkDividers(content, {
    hasProps: props.length > 0 || events.length > 0,
    hasListeners: listeners.length > 0,
    hasMethods: methods.length > 0,
    hasHandlers: handlers.length > 0,
    hasPrivateMethods: privateMethods.length > 0,
    hasRender: render !== null,
  });

  violations.push(...dividerViolations);

  // Check documentation for props, events, methods, and listeners
  const docViolations = checkDocumentation(content, {
    props,
    events,
    methods,
    listeners,
    componentDocs,
    propDocs,
    eventDocs,
    methodDocs,
  });

  violations.push(...docViolations);
  violations.push(...tokenViolations);

  return {
    file: relPath,
    violations,
    metadata: {
      props,
      events,
      listeners,
      methods,
      handlers,
      componentDocs,
    },
  };
}

function extractProps(content) {
  const propPattern = /@Prop\s*\({[^}]*}\)?\s*(?:@(\w+))?\s*readonly\s+(\w+)\s*:\s*([^=\s]+)/g;
  const props = [];
  let match;

  while ((match = propPattern.exec(content)) !== null) {
    const validator = match[1];
    const name = match[2];
    const type = match[3];

    props.push({
      name,
      type: type.replace(/[<>[\]]/g, ''),
      validator: validator || null,
      validatorMatches: validator ? matchesType(validator, type) : false,
    });
  }

  return props;
}

function extractEvents(content) {
  const eventPattern = /@Event\s*\(\)\s*(\w+)/g;
  const events = [];
  let match;

  while ((match = eventPattern.exec(content)) !== null) {
    events.push(match[1]);
  }

  return events;
}

function extractListeners(content) {
  const listenerPattern = /@Listen\s*\([^)]+\)\s*(\w+)/g;
  const listeners = [];
  let match;

  while ((match = listenerPattern.exec(content)) !== null) {
    listeners.push(match[1]);
  }

  return listeners;
}

function extractMethods(content) {
  const methodPattern = /@Method\s*\(\)\s*async\s+(\w+)/g;
  const methods = [];
  let match;

  while ((match = methodPattern.exec(content)) !== null) {
    methods.push(match[1]);
  }

  return methods;
}

function extractHandlers(content) {
  const handlerPattern = /private\s+handle\w+\s*=/g;
  return handlerPattern.test(content) ? ['handlers'] : [];
}

function extractPrivateMethods(content) {
  const privatePattern = /private\s+\w+\s*\([^)]*\)\s*{/g;
  return privatePattern.test(content) ? ['private'] : [];
}

function extractRender(content) {
  return content.includes('render()') ? 'render' : null;
}

function extractDividers(content) {
  const dividerPattern = /\/\*\*\s*\n\s*\*\s*([A-Z\s]+)\s*\n\s*\*\s*(─+)\s*\n\s*\*\//g;
  const dividers = [];
  let match;

  while ((match = dividerPattern.exec(content)) !== null) {
    dividers.push({
      name: match[1].trim(),
      dashCount: match[2].length,
    });
  }

  return dividers;
}

function extractSetupValidationCalls(content) {
  const connectedCallbackMatch = /connectedCallback\s*\(\)[^{]*{([^}]*)setupValidation/;
  const componentWillUpdateMatch = /componentWillUpdate\s*\(\)[^{]*{([^}]*)setupValidation/;

  return {
    connectedCallback: connectedCallbackMatch.test(content),
    componentWillUpdate: componentWillUpdateMatch.test(content),
  };
}

async function lintScssFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(REPO_ROOT, filePath);
  const violations = [];

  const tokenViolations = checkDesignTokens(content);
  violations.push(...tokenViolations);

  return {
    file: relPath,
    violations,
  };
}

function extractComponentDocs(content) {
  const match = content.match(/\/\*\*\s*\n([\s\S]*?)\*\/\s*@Component/);
  if (!match) return { slots: [], parts: [] };

  const docBlock = match[1];
  const slotPattern = /@slot\s+([^\s-]+)?\s*-?\s*([^\n]*)/g;
  const partPattern = /@part\s+([^\s-]+)\s*-?\s*([^\n]*)/g;

  const slots = [];
  const parts = [];

  let slotMatch;
  while ((slotMatch = slotPattern.exec(docBlock)) !== null) {
    slots.push({
      name: slotMatch[1] || 'default',
      doc: slotMatch[2] || '',
    });
  }

  let partMatch;
  while ((partMatch = partPattern.exec(docBlock)) !== null) {
    parts.push({
      name: partMatch[1],
      doc: partMatch[2] || '',
    });
  }

  return { slots, parts };
}

function findDocBeforeDecorator(content, decoratorName, targetName) {
  const lines = content.split('\n');

  // Find the line with the decorator and target
  let targetLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`@${decoratorName}`) &&
        (i + 5 > lines.length || lines.slice(i, Math.min(i + 5, lines.length)).some(l => l.includes(targetName)))) {
      targetLine = i;
      break;
    }
  }

  if (targetLine === -1) return false;

  // Look backwards for a JSDoc comment (/** ... */)
  for (let i = targetLine - 1; i >= Math.max(0, targetLine - 20); i--) {
    const line = lines[i].trim();

    // If we find closing */, that's the end of a JSDoc
    if (line.endsWith('*/')) {
      // Check if there's actual content in the comment (not just whitespace)
      let hasContent = false;
      for (let j = i; j >= Math.max(0, i - 10); j--) {
        if (lines[j].includes('/**')) {
          hasContent = true;
          break;
        }
        if (lines[j].trim() && lines[j].trim() !== '*' && !lines[j].trim().startsWith('*/')) {
          hasContent = true;
        }
      }
      return hasContent;
    }

    // Stop if we hit a non-comment, non-whitespace line (except for the decorator itself)
    if (line && !line.startsWith('*') && !line.includes('@') && !line.startsWith('/**')) {
      return false;
    }
  }

  return false;
}

function extractPropDocs(content) {
  const props = extractProps(content);
  return props.map(p => ({
    name: p.name,
    documented: findDocBeforeDecorator(content, 'Prop', p.name),
  }));
}

function extractEventDocs(content) {
  const events = extractEvents(content);
  return events.map(e => ({
    name: e,
    documented: findDocBeforeDecorator(content, 'Event', e),
  }));
}

function extractMethodDocs(content) {
  const methods = extractMethods(content);
  return methods.map(m => ({
    name: m,
    documented: findDocBeforeDecorator(content, 'Method', m),
  }));
}

function checkDocumentation(content, { props, events, methods, listeners, componentDocs, propDocs, eventDocs, methodDocs }) {
  const violations = [];

  // Check props have documentation
  for (const propDoc of propDocs) {
    if (!propDoc.documented) {
      violations.push({
        type: 'missing-documentation',
        severity: 'warn',
        target: propDoc.name,
        kind: 'prop',
        message: `Missing JSDoc documentation for @Prop "${propDoc.name}"`,
      });
    }
  }

  // Check events have documentation
  for (const eventDoc of eventDocs) {
    if (!eventDoc.documented) {
      violations.push({
        type: 'missing-documentation',
        severity: 'warn',
        target: eventDoc.name,
        kind: 'event',
        message: `Missing JSDoc documentation for @Event "${eventDoc.name}"`,
      });
    }
  }

  // Check methods have documentation
  for (const methodDoc of methodDocs) {
    if (!methodDoc.documented) {
      violations.push({
        type: 'missing-documentation',
        severity: 'warn',
        target: methodDoc.name,
        kind: 'method',
        message: `Missing JSDoc documentation for @Method "${methodDoc.name}"`,
      });
    }
  }

  // Check slots and parts are documented in component-level JSDoc
  for (const slot of componentDocs.slots) {
    if (!slot.doc || slot.doc.trim() === '') {
      violations.push({
        type: 'missing-documentation',
        severity: 'warn',
        target: slot.name,
        kind: 'slot',
        message: `Missing description for @slot "${slot.name}"`,
      });
    }
  }

  for (const part of componentDocs.parts) {
    if (!part.doc || part.doc.trim() === '') {
      violations.push({
        type: 'missing-documentation',
        severity: 'warn',
        target: part.name,
        kind: 'part',
        message: `Missing description for @part "${part.name}"`,
      });
    }
  }

  return violations;
}

function checkDesignTokens(content) {
  const violations = [];

  // Skip .interfaces.ts files
  if (content.includes('export type') && !content.includes('@Prop')) {
    return violations;
  }

  // Patterns for CSS variable usage
  // Match everything between var( and closing paren/comma, including SCSS interpolation
  const cssVarPattern = /var\(\s*--([^,)]+)/g;
  const varsLocalPattern = /vars\.local\s*\([^)]*var\s*\(\s*--([^,)]+)/g;
  const modifierPattern = /--mod-[\w-]+:\s*var\s*\(\s*--([^,)]+)/g;

  // Find tokens used in vars.local() context (these are allowed to use global tokens)
  const allowedInVarsLocal = new Set();
  let match;
  while ((match = varsLocalPattern.exec(content)) !== null) {
    const tokenName = match[1].trim().split(/[\s#}]/)[0];
    if (tokenName && tokenName.startsWith('ds-')) {
      allowedInVarsLocal.add(tokenName);
    }
  }

  // Find tokens used to set modifiers (also allowed - pattern: --mod-* uses global tokens as sources)
  const allowedInModifiers = new Set();
  const modifierMatches = content.matchAll(modifierPattern);
  for (const match of modifierMatches) {
    let tokenName = match[1].trim();
    // Extract token name, stopping at space, newline, or SCSS interpolation
    tokenName = tokenName.split(/[\s#}]/)[0];
    if (tokenName && tokenName.startsWith('ds-')) {
      allowedInModifiers.add(tokenName);
    }
  }

  // Check all CSS variables
  const usedTokens = new Set();
  const cssVarMatches = content.matchAll(cssVarPattern);

  for (const match of cssVarMatches) {
    let tokenName = match[1].trim();

    // Extract token name, stopping at space, newline, or SCSS interpolation
    tokenName = tokenName.split(/[\s#}]/)[0];

    // Skip if empty or contains SCSS interpolation syntax
    if (!tokenName || tokenName.includes('#{')) {
      continue;
    }

    // Skip if already processed
    if (usedTokens.has(tokenName)) continue;
    usedTokens.add(tokenName);

    // Allowed patterns:
    // - --_* (private variables)
    // - --ds-alias-* (alias tokens)
    // - --ds-component-* (component-specific tokens)
    // - --mod-* (modifiers)
    // - In vars.local() context: --ds-* (global tokens as defaults)
    // - In modifier assignment: --ds-* (global tokens as sources for modifiers)

    const isPrivate = tokenName.startsWith('_');
    const isAlias = tokenName.startsWith('ds-alias-');
    const isComponent = tokenName.startsWith('ds-component-');
    const isModifier = tokenName.startsWith('mod-');
    const isGlobal = tokenName.startsWith('ds-') && !isAlias && !isComponent;
    const isInVarsLocal = allowedInVarsLocal.has(tokenName);
    const isInModifier = allowedInModifiers.has(tokenName);

    // Flag global tokens that aren't in allowed contexts
    if (isGlobal && !isInVarsLocal && !isInModifier) {
      violations.push({
        type: 'invalid-design-token',
        severity: 'warn',
        token: tokenName,
        message: `Use alias (--ds-alias-*) or component (--ds-component-*) tokens instead of global (--${tokenName})`,
      });
    }
  }

  return violations;
}

function checkDividers(content, sections) {
  const violations = [];
  const dividers = extractDividers(content);
  const dividerNames = dividers.map(d => d.name);

  // Check if required dividers are missing
  const requiredDividers = [];
  if (sections.hasProps) requiredDividers.push('PUBLIC PROPERTY API');
  if (sections.hasListeners) requiredDividers.push('PUBLIC LISTENERS');
  if (sections.hasMethods) requiredDividers.push('PUBLIC METHODS');
  if (sections.hasHandlers) requiredDividers.push('EVENT HANDLERS');
  if (sections.hasPrivateMethods) requiredDividers.push('PRIVATE METHODS');
  if (sections.hasRender) requiredDividers.push('RENDER');

  for (const required of requiredDividers) {
    if (!dividerNames.includes(required)) {
      violations.push({
        type: 'missing-divider',
        severity: 'error',
        section: required,
        message: `Missing divider comment for ${required}`,
      });
    }
  }

  // Check divider format (dash count)
  for (const divider of dividers) {
    if (divider.dashCount < 40 || divider.dashCount > 60) {
      violations.push({
        type: 'divider-format',
        severity: 'warn',
        section: divider.name,
        message: `Divider for ${divider.name} has ${divider.dashCount} dashes (expected ~53)`,
      });
    }
  }

  return violations;
}

function matchesType(validator, type) {
  const normalizedType = type.replace(/[<>[\]]/g, '');

  if (normalizedType === 'string' && validator === 'ValidateEmptyOrType') return true;
  if (normalizedType === 'number' && validator === 'ValidateEmptyOrType') return true;
  if (normalizedType === 'boolean' && validator === 'ValidateEmptyOrType') return true;
  if (validator === 'ValidateEmptyOrOneOf' || validator === 'ValidateRequiredAndOneOf') return true;

  return false;
}

async function fixFile(filePath, report) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const changes = [];

  // Apply fixes for missing documentation
  for (const violation of report.violations) {
    if (violation.type === 'missing-documentation') {
      const { target, kind } = violation;
      const updatedContent = addDocumentationComment(content, kind, target);
      if (updatedContent !== content) {
        content = updatedContent;
        changes.push(`Added JSDoc for @${kind.charAt(0).toUpperCase() + kind.slice(1)} "${target}"`);
      }
    }

    if (violation.type === 'missing-validator' && violation.prop) {
      // Would need more complex logic to find and add validator
      changes.push(`Would add validator for ${violation.prop}`);
    }

    if (violation.type === 'missing-setup-validation') {
      // Would need to find lifecycle method and add call
      changes.push(`Would add setupValidation() to ${violation.method}`);
    }

    if (violation.type === 'missing-divider') {
      // Would need to add divider comment
      changes.push(`Would add divider for ${violation.section}`);
    }
  }

  if (changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return {
    file: filePath,
    changes,
  };
}

function addDocumentationComment(content, kind, target) {
  const lines = content.split('\n');
  let result = [...lines];

  // Find the decorator line
  let decoratorLine = -1;
  const decoratorName = kind.charAt(0).toUpperCase() + kind.slice(1);

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`@${decoratorName}`) &&
        (i + 5 > lines.length || lines.slice(i, Math.min(i + 5, lines.length)).some(l => l.includes(target)))) {
      decoratorLine = i;
      break;
    }
  }

  if (decoratorLine === -1) return content;

  // Check if there's already a JSDoc comment
  if (decoratorLine > 0) {
    let checkLine = decoratorLine - 1;
    while (checkLine >= 0 && (lines[checkLine].trim() === '' || lines[checkLine].trim().startsWith('*'))) {
      if (lines[checkLine].includes('/**')) {
        return content; // Already has a doc comment
      }
      checkLine--;
    }
  }

  // Generate appropriate comment based on kind
  let commentText = '';
  switch (kind) {
    case 'prop':
      commentText = `The ${target} property`;
      break;
    case 'event':
      commentText = `Emitted when the ${target} event occurs`;
      break;
    case 'method':
      commentText = `Internal method for ${target}`;
      break;
    default:
      commentText = `Documentation for ${target}`;
  }

  const docComment = `  /**\n   * ${commentText}\n   */`;

  result.splice(decoratorLine, 0, docComment);

  return result.join('\n');
}

function printReport(componentName, results, shouldFix, fixes = []) {
  console.log(`\n📋 Linting: ${componentName}\n`);

  for (const result of results) {
    if (result.violations.length === 0) {
      console.log(`✓ ${result.file}`);
      console.log(`  ✓ All checks passed\n`);
    } else {
      console.log(`⚠ ${result.file}`);
      for (const violation of result.violations) {
        const icon = violation.severity === 'error' ? '✗' : '⚠';
        console.log(`  ${icon} ${violation.message}`);
      }
      console.log();
    }
  }

  if (shouldFix && fixes.length > 0) {
    console.log('\n🔧 Applied Fixes:\n');
    for (const fix of fixes) {
      console.log(`✓ ${fix.file}`);
      for (const change of fix.changes) {
        console.log(`  • ${change}`);
      }
      console.log();
    }
  }
}

module.exports = {
  lintComponent,
  lintFile,
};
