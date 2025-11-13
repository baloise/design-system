import { test } from '@baloise/ds-playwright'

const template = `
<bal-card>
  <bal-card-subtitle bold color="blue">Your Product</bal-card-subtitle>
  <bal-card-title>BaloiseCombi</bal-card-title>
  <bal-card-subtitle>Police number 70/2.937.458</bal-card-subtitle>
  <bal-card-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua.
  </bal-card-content>
  <bal-card-actions position="right">
    <bal-button color="info" outlined>Secondary Action</bal-button>
    <bal-button>Main Action</bal-button>
  </bal-card-actions>
</bal-card>
`

test('basic', async ({ page, a11y }) => {
  await page.mount(template)
  await a11y('bal-card')
})
