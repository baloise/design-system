import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  test.skip(true, 'Contrast issue tracked in https://github.com/baloise/design-system/issues/2189')
  await page.mount(`
    <ds-app-navbar>
      <a href="/" slot="brand">Logo</a>
      <h1 slot="title">App Title</h1>
      <a href="/about" slot="menu-start">About</a>
      <button class="button" slot="menu-end">Sign In</button>
    </ds-app-navbar>
  `)
  await a11y('ds-app-navbar')
})

test('light variant', async ({ page, a11y }) => {
  await page.mount(`
    <ds-app-navbar light>
      <a href="/" slot="brand">Logo</a>
      <h1 slot="title">App Title</h1>
      <a href="/about" slot="menu-start">About</a>
      <button class="button" slot="menu-end">Sign In</button>
    </ds-app-navbar>
  `)
  await a11y('ds-app-navbar')
})
