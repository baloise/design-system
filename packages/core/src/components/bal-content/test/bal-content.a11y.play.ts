import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-content>
      <bal-label>Label</bal-label>
      <bal-text
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ipsum, hic iste officiis doloribus,
        accusamus quibusdam accusantium ducimus reprehenderit fugiat laudantium ut inventore. Reprehenderit
        necessitatibus architecto a, consequuntur aliquid distinctio.</bal-text
      >
    </bal-content>
  `)
  await a11y('bal-content')
})
