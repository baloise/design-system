import { DsSelect, DsPage, expect, test } from '@helvetia-design/playwright'
import { Locator } from '@playwright/test'

const COUNTRY_OPTIONS = [
  { label: 'Switzerland', value: 'ch' },
  { label: 'Germany', value: 'de' },
  { label: 'Austria', value: 'at' },
  { label: 'France', value: 'fr' },
  { label: 'Italy', value: 'it' },
]

const LANGUAGE_OPTIONS = [
  { label: 'German', value: 'de' },
  { label: 'French', value: 'fr' },
  { label: 'Italian', value: 'it' },
]

const CITY_GROUPS = [
  {
    label: 'Switzerland',
    options: [
      { label: 'Zurich', value: 'ch-zh' },
      { label: 'Basel', value: 'ch-bs' },
      { label: 'Bern', value: 'ch-be' },
    ],
  },
  {
    label: 'Germany',
    options: [
      { label: 'Berlin', value: 'de-be' },
      { label: 'Munich', value: 'de-mu' },
    ],
  },
]

const setOptions = async (page: DsPage, el: Locator, options: typeof COUNTRY_OPTIONS) => {
  await el.evaluate((node, opts) => ((node as any).options = opts), options)
  await page.waitForChanges()
}

const setOptionGroups = async (page: DsPage, el: Locator, groups: typeof CITY_GROUPS) => {
  await el.evaluate((node, g) => ((node as any).optionGroups = g), groups)
  await page.waitForChanges()
}

test.describe('dsChange', () => {
  test('should fire dsChange with the option value when selected by label', async ({ page }) => {
    await page.mount(`<ds-select label="Country"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.select('Italy')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('it')
    await select.assertValue('Italy')
  })

  test('should fire dsChange with an array of values in multiple mode', async ({ page }) => {
    await page.mount(`<ds-select label="Languages" multiple></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, LANGUAGE_OPTIONS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.selectMultiple(['German', 'Italian'])

    expect(changeSpy).toHaveReceivedEventTimes(2)
    expect(changeSpy).toHaveReceivedEventDetail(['de', 'it'])
    await select.assertValue(['German', 'Italian'])
  })
})

test.describe('closeOnSelect', () => {
  test('should close the dropdown after selecting an option in single mode', async ({ page }) => {
    await page.mount(`<ds-select label="Country"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await select.open()
    await select.assertOpen()
    await select.option('Italy').click()

    await select.assertClosed()
  })

  test('should keep the dropdown open after selecting an option in multiple mode', async ({ page }) => {
    await page.mount(`<ds-select label="Languages" multiple></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, LANGUAGE_OPTIONS)

    await select.open()
    await select.assertOpen()
    await select.option('German').click()

    await select.assertOpen()
  })

  test('should close the dropdown after selecting an option via keyboard in single mode', async ({ page }) => {
    await page.mount(`<ds-select label="Country"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await select.trigger.focus()
    await select.trigger.press('Enter')
    await select.assertOpen()
    await select.trigger.press('ArrowDown')
    await select.trigger.press('Enter')

    await select.assertClosed()
  })
})

test.describe('keyboard navigation after mouse click', () => {
  test('should keep keyboard navigation working after clicking an option in multiple mode', async ({ page }) => {
    await page.mount(`<ds-select label="Languages" multiple></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, LANGUAGE_OPTIONS)

    await select.open()
    await select.option('German').click()
    await select.assertOpen()

    await select.trigger.press('ArrowDown')
    await select.assertHighlighted('French')
  })

  test('should keep the trigger focused after clicking an option in single mode', async ({ page }) => {
    await page.mount(`<ds-select label="Country"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await select.open()
    await select.option('Italy').click()

    await expect(select.trigger).toBeFocused()
  })
})

test.describe('multiple chips', () => {
  test('should exclude the chip delete buttons from the tab order', async ({ page }) => {
    await page.mount(`<ds-select label="Languages" multiple></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, LANGUAGE_OPTIONS)

    await select.selectMultiple(['German', 'Italian'])

    const deleteButtons = select.el.locator('.ss-value-delete')
    await expect(deleteButtons).toHaveCount(2)
    for (const button of await deleteButtons.all()) {
      await expect(button).toHaveAttribute('tabindex', '-1')
    }
  })
})

test.describe('grouped options', () => {
  test('should select an option nested in a group by its label', async ({ page }) => {
    await page.mount(`<ds-select label="Location"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptionGroups(page, select.el, CITY_GROUPS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.select('Basel')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('ch-bs')
    await select.assertValue('Basel')
  })
})

test.describe('searchable', () => {
  test('should filter options by the typed text', async ({ page }) => {
    await page.mount(`<ds-select label="Country" searchable></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await select.search('Ger')

    await expect(select.option('Germany')).toBeVisible()
    await expect(select.option('France')).toBeHidden()
  })

  test('should still select the filtered option by label', async ({ page }) => {
    await page.mount(`<ds-select label="Country" searchable></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.search('Ger')
    await select.option('Germany').click()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail('de')
  })
})

test.describe('clearable', () => {
  test('should clear the selected value and fire dsChange with null', async ({ page }) => {
    await page.mount(`<ds-select label="Country" clearable value="it"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.clear()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(null)
  })
})

test.describe('disabled', () => {
  test('should not open the dropdown or fire dsChange when disabled', async ({ page }) => {
    await page.mount(`<ds-select label="Country" disabled></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)
    const changeSpy = await select.el.spyOnEvent('dsChange')

    await select.assertToBeDisabled()

    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to the initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-select name="country" label="Country" value="it"></ds-select>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await select.select('Germany')
    await select.assertValue('Germany')

    await page.getByTestId('reset').click()
    await page.waitForChanges()

    await select.assertValue('Italy')
  })
})

test.describe('slotted options', () => {
  test('should not throw when the currently selected slotted option is removed', async ({ page }) => {
    await page.mount(`
      <ds-select label="Sport">
        <ds-select-option value="running">Running</ds-select-option>
        <ds-select-option value="climbing">Climbing</ds-select-option>
        <ds-select-option value="surfing">Surfing</ds-select-option>
      </ds-select>
    `)
    const select = new DsSelect(page.locator('ds-select'))
    const pageErrors: string[] = []
    page.on('pageerror', error => pageErrors.push(error.message))

    await select.select('Running')
    await select.assertValue('Running')

    // Mirrors baloise/design-system#1879: a consumer re-filtering slotted
    // ds-select-option children (e.g. React state-driven filtering) can remove
    // the option that is currently selected.
    await select.el.evaluate(el => {
      el.querySelector('ds-select-option[value="running"]')?.remove()
    })
    await page.waitForChanges()

    expect(pageErrors).toEqual([])
  })
})

test.describe('aria-label', () => {
  test('should use the label prop as the accessible name by default', async ({ page }) => {
    await page.mount(`<ds-select label="Country"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await expect(select.trigger).toHaveAttribute('aria-labelledby', 'label')
    await expect(select.trigger).not.toHaveAttribute('aria-label')
  })

  test('should let a consumer-provided aria-label override the accessible name', async ({ page }) => {
    await page.mount(`<ds-select label="Country" aria-label="Custom name"></ds-select>`)
    const select = new DsSelect(page.locator('ds-select'))
    await setOptions(page, select.el, COUNTRY_OPTIONS)

    await expect(select.trigger).toHaveAttribute('aria-label', 'Custom name')
    await expect(select.trigger).not.toHaveAttribute('aria-labelledby')
  })
})
