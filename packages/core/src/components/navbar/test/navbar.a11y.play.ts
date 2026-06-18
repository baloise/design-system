import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <ds-navbar>
      <a href="/" slot="brand">Logo</a>
      <h1 slot="title">App Title</h1>
      <a href="/about" slot="menu-start">About</a>
      <button class="button" slot="menu-end">Sign In</button>
    </ds-navbar>
  `)
  await a11y('ds-navbar')
})

test('light variant', async ({ page, a11y }) => {
  await page.mount(`
    <ds-navbar light>
      <a href="/" slot="brand">Logo</a>
      <h1 slot="title">App Title</h1>
      <a href="/about" slot="menu-start">About</a>
      <button class="button" slot="menu-end">Sign In</button>
    </ds-navbar>
  `)
  await a11y('ds-navbar')
})
