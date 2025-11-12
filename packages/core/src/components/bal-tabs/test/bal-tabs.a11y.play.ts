import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-tabs value="tab-b" border>
      <bal-tab-item value="tab-a" label="Tab A">
        <bal-button>Focus me</bal-button>
        Content of Tab A</bal-tab-item
      >
      <bal-tab-item value="tab-b" label="Tab B">
        <bal-button>Focus me</bal-button>
        Content of Tab B</bal-tab-item
      >
      <bal-tab-item value="tab-d" label="Tab D" disabled>
        <bal-button>Focus me</bal-button>
        Content of Tab D</bal-tab-item
      >
    </bal-tabs>
  `)
  await a11y('bal-tabs')
})


test('vertical', async ({ page, a11y }) => {
  await page.mount(`
    <bal-tabs value="tab-a" vertical border>
      <bal-tab-item value="tab-a" label="Tab A" icon="account">
        <bal-button>Focus me</bal-button>
        Content of Tab A</bal-tab-item
      >
      <bal-tab-item value="tab-b" label="Tab B" icon="account">
        <bal-button>Focus me</bal-button>
        Content of Tab B</bal-tab-item
      >
      <bal-tab-item value="tab-c" label="Tab C" icon="account" bubble>
        <bal-button>Focus me</bal-button>
        Content of Tab C</bal-tab-item
      >
      <bal-tab-item value="tab-d" label="Tab D" icon="account" disabled>
        <bal-button>Focus me</bal-button>
        Content of Tab D</bal-tab-item
      >
    </bal-tabs>
  `)
  await a11y('bal-tabs')
})

test.skip('links', async ({ page, a11y }) => {
  await page.mount(`
  <bal-tabs value="tab-a" border>
    <bal-tab-item
      value="tab-a"
      label="Link A"
      href="http://localhost:4000/components/bal-tabs/test/bal-tabs.a11y.html"
    ></bal-tab-item>
    <bal-tab-item
      value="tab-b"
      label="Link B"
      href="http://localhost:4000/components/bal-tabs/test/bal-tabs.a11y.html"
    ></bal-tab-item>
    <bal-tab-item
      value="tab-d"
      label="Link D"
      href="http://localhost:4000/components/bal-tabs/test/bal-tabs.a11y.html"
      disabled
    ></bal-tab-item>
  </bal-tabs>
  `)
  await a11y('bal-tabs')
})

