import { test } from '@baloise/ds-playwright'

test('closed popup', async ({ page, a11y }) => {
  await page.mount(`
    <ds-button id="trigger">Open</ds-button>
    <ds-popup id="popup" label="Popup">
      <p>Popup content.</p>
    </ds-popup>
    <script>
      window.addEventListener('DOMContentLoaded', () => {
        const popup = document.getElementById('popup')
        const trigger = document.getElementById('trigger')
        popup.trigger = trigger
      })
    </script>
  `)
  await a11y('ds-popup')
})

test('open popup', async ({ page, a11y }) => {
  await page.mount(`
    <ds-button id="trigger">Open</ds-button>
    <ds-popup id="popup" label="Popup">
      <p>Popup content.</p>
    </ds-popup>
  `)
  await page.evaluate(() => (document.getElementById('popup') as any).present())
  await a11y('ds-popup')
})

test('open popup closable', async ({ page, a11y }) => {
  await page.mount(`
    <ds-button id="trigger">Open</ds-button>
    <ds-popup id="popup" label="Popup" closable>
      <p>Popup content.</p>
    </ds-popup>
  `)
  await page.evaluate(() => (document.getElementById('popup') as any).present())
  await a11y('ds-popup')
})

test('open popup with backdrop', async ({ page, a11y }) => {
  await page.mount(`
    <ds-button id="trigger">Open</ds-button>
    <ds-popup id="popup" label="Popup" backdrop backdrop-dismiss>
      <p>Popup content.</p>
    </ds-popup>
  `)
  await page.evaluate(() => (document.getElementById('popup') as any).present())
  await a11y('ds-popup')
})
