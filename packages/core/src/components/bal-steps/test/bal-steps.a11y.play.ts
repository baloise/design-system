import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-steps value="step-c">
      <bal-step-item value="step-a" label="Done" done>Content of Step A</bal-step-item>
      <bal-step-item value="step-b" label="Failed" failed>Content of Step B</bal-step-item>
      <bal-step-item value="step-c" label="Active">Content of Step C</bal-step-item>
      <bal-step-item value="step-d" label="Default">Content of Step D</bal-step-item>
      <bal-step-item value="step-e" label="Disabled" disabled>Content of Step E</bal-step-item>
      <bal-step-item value="step-f" label="Hidden" invisible>Content of Step F</bal-step-item>
    </bal-steps>
  `)
  await a11y('bal-steps')
})
