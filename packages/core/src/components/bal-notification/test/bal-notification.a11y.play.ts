import { findPropertyValuesByTag, test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-notification>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, assumenda in ducimus modi animi enim velit
      molestiae rerum natus, ad culpa explicabo blanditiis architecto quo expedita incidunt officiis quaerat
      delectus.
    </bal-notification>
  `)
  await a11y('bal-notification')
})

const colors = findPropertyValuesByTag('bal-notification', 'color')
for (let index = 0; index < colors.length; index++) {
  const color = colors[index]
  test(`color ${color}`, async ({ page, a11y }) => {
    await page.mount(`<bal-notification color="${color}">42</bal-notification>`)
    await a11y('bal-notification')
  })
}
