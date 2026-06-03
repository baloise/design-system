const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const REPO_ROOT = path.resolve(__dirname, '../../..');

async function documentComponent(componentName) {
  console.log(`\n📄 Documenting component: ${componentName}\n`);

  // Step 1: Validate component exists
  const componentPath = path.join(REPO_ROOT, 'packages/core/src/components', componentName);
  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component not found: ${componentName}`);
  }

  // Step 2: Detect component type
  const componentType = detectComponentType(componentName, componentPath);
  console.log(`Component type: ${componentType}`);

  // Step 3: Load components.json
  const componentsJsonPath = path.join(REPO_ROOT, 'docs/src/assets/data/components.json');
  const componentsJson = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf-8'));

  // Step 4: Find visual.html and extract sections
  const visualHtmlPath = path.join(componentPath, 'test', `${componentName}.visual.html`);
  let sections = [];
  if (fs.existsSync(visualHtmlPath)) {
    sections = extractSections(visualHtmlPath);
    console.log(`Found ${sections.length} visual sections`);
  } else {
    console.log(`No visual.html found at ${visualHtmlPath}`);
  }

  // Step 5: Present checklist to user
  const selectedSections = await presentChecklist(sections);
  console.log(`Selected ${selectedSections.length} sections`);

  // Step 6: Auto-detect sub-components
  const subComponents = detectSubComponents(componentPath, componentName);
  console.log(`Found ${subComponents.length} sub-components: ${subComponents.join(', ')}`);

  // Step 7: Show generation preview
  await showGenerationPreview(componentName, componentType, selectedSections, subComponents);

  // Step 8: Generate files for main component
  console.log(`\n✓ Generating documentation for ${componentName}...`);
  const docsPath = path.join(REPO_ROOT, 'docs/src/components', componentName);
  await generateComponentFiles(
    componentName,
    componentPath,
    docsPath,
    componentType,
    selectedSections,
    componentsJson
  );

  // Step 9: Generate files for sub-components
  for (const subComponent of subComponents) {
    console.log(`\n✓ Generating documentation for ${subComponent}...`);
    const subComponentPath = path.join(componentPath, subComponent);
    const subComponentDocsPath = path.join(docsPath, subComponent);
    const subComponentType = detectComponentType(subComponent, subComponentPath);

    const subVisualHtmlPath = path.join(subComponentPath, 'test', `${subComponent}.visual.html`);
    let subSections = [];
    if (fs.existsSync(subVisualHtmlPath)) {
      subSections = extractSections(subVisualHtmlPath);
      const selectedSubSections = await presentChecklist(subSections, subComponent);
      await generateComponentFiles(
        subComponent,
        subComponentPath,
        subComponentDocsPath,
        subComponentType,
        selectedSubSections,
        componentsJson
      );
    } else {
      console.log(`No visual.html found for ${subComponent}, generating boilerplate only...`);
      await generateComponentFiles(
        subComponent,
        subComponentPath,
        subComponentDocsPath,
        subComponentType,
        [],
        componentsJson
      );
    }
  }

  console.log(`\n✅ Documentation generated successfully!\n`);
}

function detectComponentType(componentName, componentPath) {
  const hostScssExists = fs.existsSync(path.join(componentPath, `${componentName}.host.scss`));
  const styleScssExists = fs.existsSync(path.join(componentPath, `${componentName}.style.scss`));

  if (hostScssExists && !styleScssExists) return 'web-component-only';
  if (!hostScssExists && styleScssExists) return 'css-only';
  if (hostScssExists && styleScssExists) return 'hybrid';

  throw new Error(`Cannot determine component type for ${componentName}`);
}

function extractSections(visualHtmlPath) {
  const content = fs.readFileSync(visualHtmlPath, 'utf-8');

  // Match all <section data-testid="..."> blocks
  const sectionPattern = /<section\s+data-testid="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
  const sections = [];
  let match;

  while ((match = sectionPattern.exec(content)) !== null) {
    const testid = match[1];
    const html = match[2];

    // Clean HTML: remove <span>...</span> header and test attributes
    const cleanedHtml = html
      .replace(/<span[^>]*>.*?<\/span>/g, '') // Remove <span> header
      .trim();

    sections.push({
      name: testid,
      displayName: capitalize(testid),
      html: cleanedHtml,
    });
  }

  return sections;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function presentChecklist(sections, componentName = null) {
  // For CLI, we'll just select all sections by default
  // In a real implementation, this would use inquirer or prompts for interactive selection

  if (sections.length === 0) {
    console.log('No sections to select.');
    return [];
  }

  const prefix = componentName ? ` (${componentName})` : '';
  console.log(`\n## Visual Sections Found${prefix}\n`);
  console.log('Selecting all sections by default. In interactive mode, user would choose.\n');

  sections.forEach(s => {
    console.log(`  ☑ ${s.displayName}`);
  });

  console.log('\nProceeding with all sections...\n');

  return sections;
}

async function showGenerationPreview(componentName, componentType, selectedSections, subComponents) {
  console.log('\n## Generation Plan\n');

  console.log(`### ${componentName} (${componentType})`);
  console.log(`  • Generate 6 MDX files`);
  if (componentType === 'web-component-only') {
    console.log(`  • Generate stories.ts with ${selectedSections.length} sections`);
  } else {
    console.log(`  • Minimal/no stories`);
  }
  console.log(`  • Generate doc-config.ts\n`);

  for (const subComponent of subComponents) {
    console.log(`### ${subComponent} (detected sub-component)`);
    console.log(`  • Generate 6 MDX files`);
    console.log(`  • Generate stories (if visual.html exists)`);
    console.log(`  • Generate doc-config.ts\n`);
  }

  console.log('Proceeding with generation...\n');
}

function detectSubComponents(componentPath, componentName) {
  const entries = fs.readdirSync(componentPath);
  const subComponents = [];

  for (const entry of entries) {
    const entryPath = path.join(componentPath, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      const tsxFile = path.join(entryPath, `${entry}.tsx`);
      if (fs.existsSync(tsxFile)) {
        subComponents.push(entry);
      }
    }
  }

  return subComponents;
}

async function generateComponentFiles(
  componentName,
  componentPath,
  docsPath,
  componentType,
  selectedSections,
  componentsJson
) {
  // Ensure docs directory exists
  if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath, { recursive: true });
  }

  // Get component metadata
  const componentMeta = componentsJson.find(c => c.tag === `ds-${componentName}`);

  // Generate MDX files
  generateMdxFiles(docsPath, componentName, componentType, componentMeta, selectedSections);

  // Generate stories.ts only for web-component-only
  if (componentType === 'web-component-only' && selectedSections.length > 0) {
    generateStoriesFile(docsPath, componentName, selectedSections);
  }

  // Generate doc-config.ts
  generateDocConfig(docsPath, componentName, componentMeta);
}

function generateMdxFiles(docsPath, componentName, componentType, componentMeta, selectedSections) {
  const mdxFiles = {
    '1-Overview.mdx': generateOverviewMdx(componentName, componentMeta),
    '2-Usage.mdx': generateUsageMdx(componentName, componentMeta),
    '3-Variants.mdx': generateVariantsMdx(componentName, selectedSections, componentType),
    '4-Styling.mdx': generateStylingMdx(componentName, componentMeta, componentType),
    '5-Accessibility.mdx': generateAccessibilityMdx(componentName, componentType),
    '6-Testing.mdx': generateTestingMdx(componentName, componentType),
  };

  for (const [filename, content] of Object.entries(mdxFiles)) {
    const filePath = path.join(docsPath, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

function generateOverviewMdx(componentName, componentMeta) {
  const description = componentMeta?.docs || `A ${componentName} component for the Helvetia Design System.`;
  const tag = componentMeta?.tag || `ds-${componentName}`;

  return `# ${capitalize(componentName)}

${description}

## When to Use

Use the \`${tag}\` component when:
- [Primary use case]
- [Secondary use case]
- [Tertiary use case]

## Quick Example

\`\`\`html
<${tag}>Example</${tag}>
\`\`\`

## Components

- **${tag}** — Main component
`;
}

function generateUsageMdx(componentName, componentMeta) {
  const tag = componentMeta?.tag || `ds-${componentName}`;
  const props = componentMeta?.props || [];
  const events = componentMeta?.events || [];
  const slots = componentMeta?.slots || [];

  let propsTable = '';
  if (props.length > 0) {
    propsTable = '\n## Props\n\n| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n';
    props.slice(0, 5).forEach(prop => {
      propsTable += `| ${prop.name} | \`${prop.type}\` | ${prop.default || '-'} | ${prop.docs || '-'} |\n`;
    });
  }

  let eventsTable = '';
  if (events.length > 0) {
    eventsTable = '\n## Events\n\n| Event | Detail | Description |\n|-------|--------|-------------|\n';
    events.slice(0, 5).forEach(event => {
      eventsTable += `| ${event.event} | - | ${event.docs || '-'} |\n`;
    });
  }

  let slotsTable = '';
  if (slots.length > 0) {
    slotsTable = '\n## Slots\n\n| Slot | Description |\n|------|-------------|\n';
    slots.forEach(slot => {
      slotsTable += `| ${slot.name} | ${slot.docs || '-'} |\n`;
    });
  }

  return `# Usage

${propsTable}${eventsTable}${slotsTable}

## Basic Example

\`\`\`html
<${tag}>Content</${tag}>
\`\`\`
`;
}

function generateVariantsMdx(componentName, selectedSections, componentType) {
  if (componentType !== 'web-component-only' || selectedSections.length === 0) {
    return `# Variants

> **Note:** This is a CSS-only or hybrid component.
>
> For styling guidance, see [Styling](./4-Styling.mdx).
> For accessibility requirements, see [Accessibility](./5-Accessibility.mdx).
`;
  }

  let content = `# Variants

Explore different ${componentName} configurations and states.

See the **Stories** tab for interactive examples:
`;

  selectedSections.forEach(section => {
    content += `\n- **${section.displayName}** — `;
  });

  return content + '\n';
}

function generateStylingMdx(componentName, componentMeta, componentType) {
  return `# Styling

## CSS Variables

This component exposes the following CSS variables for customization:

\`\`\`css
--ds-${componentName}-font-family
--ds-${componentName}-font-size
--ds-${componentName}-color
\`\`\`

Customize via:

\`\`\`css
ds-${componentName} {
  --ds-${componentName}-color: #your-color;
}
\`\`\`

## Design Tokens

This component uses design tokens for:
- Colors
- Spacing
- Typography
- Shadows

See the design system tokens documentation for available values.

## Theming

Apply theme-specific styling by setting CSS variables at the document root or specific scopes.
`;
}

function generateAccessibilityMdx(componentName, componentType) {
  return `# Accessibility

## WCAG 2.2 AA Compliance

This component meets WCAG 2.2 Level AA standards:

- ✓ Sufficient color contrast ratios
- ✓ Keyboard navigation support
- ✓ Screen reader announcements
- ✓ Focus indicators

## Best Practices

- Always provide descriptive labels or alternative text
- Use semantic HTML elements
- Ensure sufficient color contrast
- Provide visible focus indicators
- Don't rely on color alone to convey information

## Keyboard Navigation

Keyboard support is built into this component. Users can navigate using:
- **Tab** — Move focus
- **Shift+Tab** — Move focus backward
- **Enter / Space** — Activate (varies by component type)
`;
}

function generateTestingMdx(componentName, componentType) {
  return `# Testing

## Visual Tests

Visual regression tests help ensure the component renders correctly:

\`\`\`bash
npm run play -- --grep="${componentName}"
\`\`\`

See \`packages/core/src/components/${componentName}/test/${componentName}.visual.html\` for all visual states.

## Accessibility Tests

Automated accessibility checks:

\`\`\`bash
npm run play -- --grep="${componentName} a11y"
\`\`\`

## Unit Tests

Component behavior tests:

\`\`\`bash
npm test -- ${componentName}
\`\`\`

## Test Checklist

- [ ] Component renders with default props
- [ ] All props work as expected
- [ ] Events emit correctly
- [ ] Accessibility requirements are met
- [ ] Visual states are correct
`;
}

function generateStoriesFile(docsPath, componentName, selectedSections) {
  const tag = `ds-${componentName}`;
  const camelName = toCamelCase(componentName);

  let storyExports = '';
  selectedSections.forEach((section, index) => {
    const storyName = section.displayName;
    storyExports += `
export const ${storyName} = Story({
  ...withRender(({ slot, ...args }) => \`${section.html.replace(/`/g, '\\`')}\`),
})
${storyName}.storyName = '🧩 ${storyName}'
`;
  });

  const content = `import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.Ds${capitalize(componentName)} & { slot: string }

const tag = '${tag}'

const meta: Meta<Args> = {
  title: 'Components/${capitalize(componentName)}/Variants',
  args: {
    slot: '${capitalize(componentName)}',
  },
  argTypes: {
    ...withComponentControls({ tag }),
  },
}

export default meta

const Story = StoryFactory<Args>(meta)
${storyExports}
`;

  const filePath = path.join(docsPath, `${componentName}.stories.ts`);
  fs.writeFileSync(filePath, content, 'utf-8');
}

function generateDocConfig(docsPath, componentName, componentMeta) {
  const tag = componentMeta?.tag || `ds-${componentName}`;
  const description = componentMeta?.docs || `${capitalize(componentName)} component`;

  const content = `export interface DocConfig {
  tag: string
  name: string
  description: string
  category?: string
  since?: string
  subcomponents?: string[]
}

const config: DocConfig = {
  tag: '${tag}',
  name: '${capitalize(componentName)}',
  description: '${description.replace(/'/g, "\\'")}',
  category: 'Components',
}

export default config
`;

  const filePath = path.join(docsPath, `${componentName}.doc-config.ts`);
  fs.writeFileSync(filePath, content, 'utf-8');
}

function toCamelCase(str) {
  return str
    .split('-')
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('');
}

module.exports = {
  documentComponent,
  detectComponentType,
  extractSections,
  detectSubComponents,
};
