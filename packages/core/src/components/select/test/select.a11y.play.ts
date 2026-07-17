import { DsPage, DsSelect, test } from '@baloise/ds-playwright'

const COUNTRY_OPTIONS = [
  { label: 'Switzerland', value: 'ch' },
  { label: 'Germany', value: 'de' },
  { label: 'Austria', value: 'at' },
]

const CITY_GROUPS = [
  {
    label: 'Switzerland',
    options: [
      { label: 'Zurich', value: 'ch-zh' },
      { label: 'Basel', value: 'ch-bs' },
    ],
  },
  {
    label: 'Germany',
    options: [{ label: 'Berlin', value: 'de-be' }],
  },
]

const mountSelect = async (page: DsPage, html: string) => {
  await page.mount(html)
  const select = new DsSelect(page.locator('ds-select'))
  await select.el.evaluate((node, opts) => ((node as any).options = opts), COUNTRY_OPTIONS)
  await page.waitForChanges()
  return select
}

test('basic', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" description="Select your country of residence"></ds-select>`)
  await a11y('ds-select')
})

test('with value', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" value="ch"></ds-select>`)
  await a11y('ds-select')
})

test('disabled', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" disabled></ds-select>`)
  await a11y('ds-select')
})

test('readonly', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" value="ch" readonly></ds-select>`)
  await a11y('ds-select')
})

test('invalid', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" invalid invalid-text="Please select a country"></ds-select>`)
  await a11y('ds-select')
})

test('required', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" required></ds-select>`)
  await a11y('ds-select')
})

test('searchable', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" searchable></ds-select>`)
  await a11y('ds-select')
})

test('clearable', async ({ page, a11y }) => {
  await mountSelect(page, `<ds-select label="Country" clearable value="ch"></ds-select>`)
  await a11y('ds-select')
})

test('multiple', async ({ page, a11y }) => {
  await page.mount(`<ds-select label="Languages" multiple></ds-select>`)
  const select = new DsSelect(page.locator('ds-select'))
  await select.el.evaluate((node, opts) => ((node as any).options = opts), COUNTRY_OPTIONS)
  await page.waitForChanges()
  await a11y('ds-select')
})

test('grouped', async ({ page, a11y }) => {
  await page.mount(`<ds-select label="Location"></ds-select>`)
  const select = new DsSelect(page.locator('ds-select'))
  await select.el.evaluate((node, groups) => ((node as any).optionGroups = groups), CITY_GROUPS)
  await page.waitForChanges()
  await a11y('ds-select')
})

test('with dropdown open', async ({ page, a11y }) => {
  const select = await mountSelect(page, `<ds-select label="Country"></ds-select>`)
  await select.open()
  await select.option('Germany').waitFor({ state: 'visible' })
  await a11y('ds-select')
})
