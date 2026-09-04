import { DsInputPhone, expect, test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
  await a11y('ds-input-phone')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-input-phone label="Phone number" initial-country="CH" value="+41791234567"></ds-input-phone>`)
  await a11y('ds-input-phone')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" initial-country="CH" placeholder="79 123 45 67"></ds-input-phone>`,
  )
  await a11y('ds-input-phone')
})

test('restricted countries', async ({ page, a11y }) => {
  await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE,FR,IT"></ds-input-phone>`)
  await a11y('ds-input-phone')
})

test('open country picker', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" countries="CH,DE,FR,IT" initial-country="CH"></ds-input-phone>`,
  )
  const phone = new DsInputPhone(page.locator('ds-input-phone'))
  await phone.open()
  await a11y('ds-input-phone')
})

test('semantics and keyboard navigation', async ({ page }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" countries="CH,DE,FR,IT" initial-country="CH"></ds-input-phone>`,
  )
  const phone = new DsInputPhone(page.locator('ds-input-phone'))

  await expect(phone.nativeInput).toHaveAccessibleName('Phone number')
  await expect(phone.trigger).toHaveRole('button')
  await expect(phone.trigger).toHaveAccessibleName(/Phone number/)

  await phone.trigger.focus()
  await page.keyboard.press('Tab')
  await expect(phone.nativeInput).toBeFocused()

  await phone.trigger.focus()
  await phone.trigger.press('Enter')
  await expect(phone.filter).toBeFocused()
  await expect(phone.listbox).toHaveRole('listbox')
  await expect(phone.listbox).toHaveAccessibleName(/.+/)

  const firstOptionId = (await phone.listbox.getByRole('option').first().getAttribute('id'))!
  const lastOptionId = (await phone.listbox.getByRole('option').last().getAttribute('id'))!

  await phone.filter.press('Home')
  await expect(phone.listbox).toHaveAttribute('aria-activedescendant', firstOptionId)
  await phone.filter.press('End')
  await expect(phone.listbox).toHaveAttribute('aria-activedescendant', lastOptionId)
  await phone.filter.press('ArrowUp')
  await expect(phone.listbox).not.toHaveAttribute('aria-activedescendant', lastOptionId)
  await phone.filter.press('ArrowDown')
  await expect(phone.listbox).toHaveAttribute('aria-activedescendant', lastOptionId)

  await phone.filter.press('Tab')
  await phone.assertClosed()
  await phone.trigger.focus()
  await phone.trigger.press('Space')
  await phone.assertOpen()
  await phone.filter.press('Escape')
  await phone.assertClosed()
  await expect(phone.trigger).toBeFocused()
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" initial-country="CH" value="+41791234567" disabled></ds-input-phone>`,
  )
  await a11y('ds-input-phone')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" initial-country="CH" value="+41791234567" readonly></ds-input-phone>`,
  )
  await a11y('ds-input-phone')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-phone label="Phone number" initial-country="CH" invalid invalid-text="Please enter a phone number"></ds-input-phone>`,
  )
  await a11y('ds-input-phone')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-input-phone label="Phone number" initial-country="CH" color="success"></ds-input-phone>`)
  await a11y('ds-input-phone')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-input-phone label="Phone number" initial-country="CH" color="warning"></ds-input-phone>`)
  await a11y('ds-input-phone')
})
