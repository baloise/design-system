const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const REPO_ROOT = path.resolve(__dirname, '../../..');

const MAPPINGS = {
  'font-family': { category: '🔤 Text', subcategory: 'Family', examples: ['Base', 'Monospace'] },
  'font-weight': { category: '🔤 Text', subcategory: 'Weight', examples: ['Regular', 'Bold'] },
  'font-size': { category: '🔤 Text', subcategory: 'Size', examples: ['Base', 'SM', 'LG'] },
  'line-height': { category: '🔤 Text', subcategory: 'LineHeight', examples: ['Base', 'Tight'] },
  'size': { category: '🔤 Text', subcategory: 'Size', examples: ['Base', 'SM', 'LG'] },
  'weight': { category: '🔤 Text', subcategory: 'Weight', examples: ['Regular', 'Bold'] },
  'gap': { category: '↔️ Space', subcategory: null, examples: ['XS', 'SM', 'MD', 'LG', 'XL'] },
  'spacing': { category: '↔️ Space', subcategory: null, examples: ['XS', 'SM', 'MD', 'LG', 'XL'] },
  'padding': { category: '↔️ Space', subcategory: null, examples: ['XS', 'SM', 'MD', 'LG', 'XL'] },
  'margin': { category: '↔️ Space', subcategory: null, examples: ['XS', 'SM', 'MD', 'LG', 'XL'] },
  'radius': { category: '🔘 Border', subcategory: 'Radius', examples: ['Base', 'LG'] },
  'border-radius': { category: '🔘 Border', subcategory: 'Radius', examples: ['Base', 'LG'] },
  'border-width': { category: '🔘 Border', subcategory: 'Width', examples: ['Base', 'Thick'] },
  'shadow': { category: '🌫️ Shadow', subcategory: null, examples: ['Box.Default', 'Text.Subtle'] },
  'box-shadow': { category: '🌫️ Shadow', subcategory: 'Box', examples: ['Default', 'Subtle'] },
  'text-shadow': { category: '🌫️ Shadow', subcategory: 'Text', examples: ['Default', 'Subtle'] },
};

const SPACE_SCALES = {
  '0.25rem': 'Space.2XS',
  '0.5rem': 'Space.XS',
  '0.75rem': 'Space.XS',
  '1rem': 'Space.SM',
  '1.25rem': 'Space.SM',
  '1.5rem': 'Space.MD',
  '2rem': 'Space.LG',
  '2.5rem': 'Space.LG',
  '3rem': 'Space.XL',
  '4rem': 'Space.2XL',
};

async function syncComponentVariables(componentName) {
  const componentPath = path.join(REPO_ROOT, 'packages/core/src/components', componentName);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component not found: ${componentName}`);
  }

  console.log(`\n📋 Syncing component variables: ${componentName}\n`);

  // Find all SCSS files
  const scssFiles = globSync(`${componentPath}/**/*.{style,host}.scss`);

  if (scssFiles.length === 0) {
    throw new Error(`No SCSS files found in ${componentName}`);
  }

  // Load Base.tokens.json
  const tokensPath = path.join(REPO_ROOT, 'packages/tokens/tokens/Base.tokens.json');
  const baseTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  // Parse all SCSS files and extract variables
  const variablesByComponent = {};

  for (const scssFile of scssFiles) {
    const content = fs.readFileSync(scssFile, 'utf-8');
    const variables = extractVariables(content);

    // Determine component name from file path
    const relativePath = path.relative(componentPath, scssFile);
    const componentDir = relativePath.split(path.sep)[0];
    const isSubComponent = relativePath.includes(path.sep);
    const compName = isSubComponent ? path.basename(path.dirname(scssFile)) : componentName;

    if (!variablesByComponent[compName]) {
      variablesByComponent[compName] = [];
    }

    variablesByComponent[compName].push(...variables);
  }

  // Analyze each variable
  const analysisResults = {};

  for (const [compName, variables] of Object.entries(variablesByComponent)) {
    console.log(`\n## Analyzing ${compName}\n`);

    const results = [];

    for (const variable of variables) {
      const analysis = analyzeVariable(variable, baseTokens);
      results.push(analysis);

      console.log(`  ${analysis.status} ${variable.name}`);
    }

    analysisResults[compName] = results;
  }

  // Show confirmation checklist
  console.log('\n\n📋 Review Changes\n');
  printChecklist(analysisResults);

  // For now, show what would be created
  console.log('\n✅ Analysis complete.');
  console.log('Next steps:');
  console.log('  1. Review the changes above');
  console.log('  2. Confirm creation of component tokens');
  console.log('  3. Run: npm run tokens');
}

function extractVariables(content) {
  const varPattern = /@include\s+vars\.local\s*\(\s*([a-z0-9\-]+)\s*,\s*([^)]+)\s*\)/g;
  const variables = [];
  let match;

  while ((match = varPattern.exec(content)) !== null) {
    const name = match[1];
    const value = match[2].trim();

    variables.push({ name, value });
  }

  return variables;
}

function analyzeVariable(variable, baseTokens) {
  const { name, value } = variable;

  // Check if value is a token reference
  if (value.includes('var(--ds-')) {
    // Already references a token
    return {
      status: '✓',
      variable: name,
      type: 'existing',
      token: extractTokenName(value),
    };
  }

  // Check if value is hardcoded
  if (isHardcodedValue(value)) {
    const spaceScale = matchSpaceScale(value);
    return {
      status: '⚠',
      variable: name,
      type: 'hardcoded',
      value: value,
      suggestion: spaceScale ? `Space.${spaceScale}` : 'Manual review needed',
    };
  }

  // Try to map property to Alias token
  const propertyMatch = getPropertyType(name);
  if (propertyMatch) {
    return {
      status: '✓',
      variable: name,
      type: 'mapped',
      category: propertyMatch.category,
      subcategory: propertyMatch.subcategory,
    };
  }

  return {
    status: '✗',
    variable: name,
    type: 'unknown',
  };
}

function extractTokenName(varValue) {
  const match = varValue.match(/var\(--ds-([^)]+)\)/);
  return match ? `--ds-${match[1]}` : null;
}

function isHardcodedValue(value) {
  // Check if it's a CSS unit value (not a var reference)
  return /^\d+\.?\d*(rem|px|em|%)$/.test(value);
}

function matchSpaceScale(pixelValue) {
  return SPACE_SCALES[pixelValue] || null;
}

function getPropertyType(variableName) {
  // Extract property part (remove component prefix)
  const parts = variableName.split('-');

  // Try exact matches first
  for (let i = 1; i < parts.length; i++) {
    const property = parts.slice(i).join('-');
    if (MAPPINGS[property]) {
      return MAPPINGS[property];
    }
  }

  // Try keyword matches
  for (const [key, mapping] of Object.entries(MAPPINGS)) {
    if (variableName.includes(key)) {
      return mapping;
    }
  }

  return null;
}

function printChecklist(results) {
  for (const [compName, analyses] of Object.entries(results)) {
    console.log(`### ${compName}\n`);
    console.log(`| Variable | Status | Category | Action |`);
    console.log(`|----------|--------|----------|--------|`);

    for (const analysis of analyses) {
      const statusIcon = analysis.status === '✓' ? '✓' : analysis.status === '⚠' ? '⚠' : '✗';
      const category = analysis.category || '—';
      const action = getAction(analysis);

      console.log(`| ${analysis.variable} | ${statusIcon} | ${category} | ${action} |`);
    }

    console.log();
  }
}

function getAction(analysis) {
  switch (analysis.type) {
    case 'existing':
      return `Uses existing token`;
    case 'mapped':
      return `Create component token`;
    case 'hardcoded':
      return `Warn: hardcoded (suggest ${analysis.suggestion})`;
    case 'unknown':
      return `No mapping found`;
    default:
      return '—';
  }
}

module.exports = {
  syncComponentVariables,
  extractVariables,
  analyzeVariable,
};
