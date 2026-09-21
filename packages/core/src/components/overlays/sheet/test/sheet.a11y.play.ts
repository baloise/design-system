import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <ds-sheet style="position: relative">
      <ds-heading level="h4" space="bottom">BaloiseCombi</ds-heading>
      <p class="text-normal mb-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <ds-button-group direction="auto" align="right" space="top">
        <ds-button>Main Action</ds-button>
        <ds-button color="secondary">Secondary Action</ds-button>
      </ds-button-group>
    </ds-sheet>`)
  await a11y('ds-sheet')
})

test.describe('container', () => {
  const CONTAINERS = [
    { label: 'default', attr: '' },
    { label: 'fluid', attr: ' container-size="fluid"' },
    { label: 'compact', attr: ' container-size="compact"' },
  ]
  CONTAINERS.forEach(({ label, attr }) => {
    test(label, async ({ page, a11y }) => {
      await page.mount(`
        <ds-sheet style="position: relative"${attr}>
          <ds-heading level="h4" space="bottom">${label}</ds-heading>
        </ds-sheet>`)
      await a11y('ds-sheet')
    })
  })
})
