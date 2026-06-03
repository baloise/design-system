// Generator modules for each test file type

function generateVisualHtmlComplete(componentName, componentInfo, visualProps, slotsToDemo) {
  let html = `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />

    <script type="module" src="/build/design-system.esm.js"><\/script>
    <script nomodule src="/build/design-system.js"><\/script>
  </head>
  <body>
    <main class="container">
      <!-- Basic -->
      <section data-testid="basic">
        <span>Basic</span>
        <ds-${componentName}>Content</ds-${componentName}>
      </section>
`;

  // Add state sections
  visualProps.states.forEach(state => {
    html += `
      <!-- ${state.charAt(0).toUpperCase() + state.slice(1)} -->
      <section data-testid="${state}">
        <span>${state.charAt(0).toUpperCase() + state.slice(1)}</span>
        <ds-${componentName} ${state}>Content</ds-${componentName}>
      </section>
`;
  });

  // Add slot sections
  slotsToDemo.forEach(slot => {
    const testId = slot.name === 'default' ? 'slot-default' : `slot-${slot.name}`;
    const slotHtml = getSlotDemoContent(slot.name);
    html += `
      <!-- Slot: ${slot.name} -->
      <section data-testid="${testId}">
        <span>Slot: ${slot.name}</span>
        <ds-${componentName}>${slotHtml}</ds-${componentName}>
      </section>
`;
  });

  html += `
    </main>
  </body>
</html>`;

  return html;
}

function getSlotDemoContent(slotName) {
  const demos = {
    icon: '<ds-icon name="plus"></ds-icon>',
    label: 'Label Text',
    title: 'Title Text',
    badge: '<ds-badge>5</ds-badge>',
    content: 'Content Text',
    default: 'Default Content',
  };

  return demos[slotName] || `${slotName} Content`;
}

function generateVisualPlayTsComplete(componentName, variants) {
  const variantsStr = variants.length > 0
    ? `[\n    '${variants.join("',\n    '")}'${variants.length > 1 ? ',' : ''}\n  ]`
    : '[]';

  return `import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = '${componentName}'
const VARIANTS = ${variantsStr}

const image = screenshot(TAG)

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.style.html\`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(\`style-\${variant}\`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(\`/components/\${TAG}/test/\${TAG}.visual.html\`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
`;
}

function generateA11yPlayTsComplete(componentName, states) {
  let content = `import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(\`<ds-${componentName}>Content</ds-${componentName}>\`)
  await a11y('ds-${componentName}')
})

test.describe('states', () => {
`;

  states.forEach(state => {
    content += `  test('${state}', async ({ page, a11y }) => {
    await page.mount(\`<ds-${componentName} ${state}>Content</ds-${componentName}>\`)
    await a11y('ds-${componentName}')
  })

`;
  });

  content += `})
`;

  return content;
}

function generateComponentPlayTsComplete(componentName, componentInfo) {
  const className = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  let content = `import { Ds${className}, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
`;

  // Slot test
  if (componentInfo.slots.length > 0) {
    content += `  test('should render slot content', async ({ page }) => {
    await page.mount(\`<ds-${componentName}>Slot Content</ds-${componentName}>\`)
    const component = new Ds${className}(page.locator('ds-${componentName}'))

    await component.assertToContainText('Slot Content')
  })

`;
  }

  // Event tests
  if (componentInfo.events.length > 0) {
    content += `  test.describe('events', () => {\n`;

    componentInfo.events.forEach(event => {
      content += `    test('should fire ${event} event', async ({ page }) => {
      await page.mount(\`<ds-${componentName}>Content</ds-${componentName}>\`)
      const component = new Ds${className}(page.locator('ds-${componentName}'))
      const spy = await component.el.spyOnEvent('${event}')

      // TODO: trigger action that fires ${event}

      expect(spy).toHaveReceivedEventTimes(1)
    })

`;
    });

    content += `  })\n\n`;
  }

  // State tests
  if (componentInfo.stateProps.length > 0) {
    content += `  test.describe('states', () => {\n`;

    componentInfo.stateProps.forEach(state => {
      content += `    test('should handle ${state} state', async ({ page }) => {
      await page.mount(\`<ds-${componentName} ${state}>Content</ds-${componentName}>\`)
      const component = new Ds${className}(page.locator('ds-${componentName}'))

      await component.assertToBe${state.charAt(0).toUpperCase() + state.slice(1)}()
    })

`;
    });

    content += `  })\n`;
  }

  content += `})
`;

  return content;
}

function generatePageObjectComplete(componentName, componentInfo) {
  const className = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  let content = `import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class Ds${className} extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

`;

  // Part locators
  if (componentInfo.parts.length > 0) {
    componentInfo.parts.forEach(part => {
      content += `  readonly ${part} = this.el.locator('[part="${part}"]')\n`;
    });
    content += '\n';
  }

  // Action methods
  content += `  async click() {
    await this.el.click()
  }

`;

  // State assertions
  componentInfo.stateProps.forEach(state => {
    const methodName = state.charAt(0).toUpperCase() + state.slice(1);
    content += `  async assertToBe${methodName}() {
    await expect(this.el).toHaveAttribute('${state}')
  }

`;
  });

  // Text assertion
  content += `  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
`;

  return content;
}

function generateUtilSpecTsComplete(componentName, utilFunctions) {
  let content = `import { describe, it, expect } from 'vitest'
import {
  ${utilFunctions.map(f => f.name).join(',\n  ')},
} from './${componentName}.util'

`;

  utilFunctions.forEach(func => {
    content += `describe('${func.name}', () => {
  it('should handle valid inputs', () => {
    // TODO: add happy path tests
  })

  it('should handle edge cases', () => {
    // TODO: add edge case tests (undefined, null, empty string, invalid values)
  })

  it('should handle type variations', () => {
    // TODO: add tests for different input types if applicable
  })
})

`;
  });

  return content;
}

module.exports = {
  generateVisualHtmlComplete,
  generateVisualPlayTsComplete,
  generateA11yPlayTsComplete,
  generateComponentPlayTsComplete,
  generatePageObjectComplete,
  generateUtilSpecTsComplete,
  getSlotDemoContent,
};
