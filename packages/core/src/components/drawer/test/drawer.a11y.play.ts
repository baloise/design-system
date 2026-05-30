import { test } from '@baloise/ds-playwright'

test('closed drawer', async ({ page, a11y }) => {
  await page.mount(`
    <ds-drawer id="drawer" label="Drawer">
      <p>Drawer content.</p>
    </ds-drawer>
  `)
  await a11y('ds-drawer')
})

test('open drawer', async ({ page, a11y }) => {
  await page.mount(`
    <ds-drawer id="drawer" label="Drawer">
      <p>Drawer content.</p>
    </ds-drawer>
  `)
  await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
  await a11y('ds-drawer')
})

test('open drawer not closable', async ({ page, a11y }) => {
  await page.mount(`
    <ds-drawer id="drawer" label="Drawer" closable="false" backdrop-dismiss="false">
      <p>Drawer content.</p>
    </ds-drawer>
  `)
  await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
  await a11y('ds-drawer')
})

test('open drawer with container fluid', async ({ page, a11y }) => {
  await page.mount(`
    <ds-drawer id="drawer" label="Drawer" container="fluid">
      <p>Fluid container drawer.</p>
    </ds-drawer>
  `)
  await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
  await a11y('ds-drawer')
})
