import { test } from '@baloise/ds-playwright'

test('closed modal', async ({ page, a11y }) => {
  await page.mount(`
    <ds-modal id="modal">
      <ds-modal-header>Modal Title</ds-modal-header>
      <ds-modal-body><p>Modal body content.</p></ds-modal-body>
    </ds-modal>
  `)
  await a11y('ds-modal')
})

test('open modal', async ({ page, a11y }) => {
  await page.mount(`
    <ds-modal id="modal" open>
      <ds-modal-header>Modal Title</ds-modal-header>
      <ds-modal-body><p>Modal body content.</p></ds-modal-body>
    </ds-modal>
  `)
  await a11y('ds-modal')
})

test('open modal not closable', async ({ page, a11y }) => {
  await page.mount(`
    <ds-modal id="modal" open closable="false">
      <ds-modal-header>Modal Title</ds-modal-header>
      <ds-modal-body><p>Modal body content.</p></ds-modal-body>
    </ds-modal>
  `)
  await a11y('ds-modal')
})

test('open modal with direct slots', async ({ page, a11y }) => {
  await page.mount(`
    <ds-modal id="modal" open>
      <span slot="header">Modal Title</span>
      <div slot="body"><p>Modal body content.</p></div>
    </ds-modal>
  `)
  await a11y('ds-modal')
})
