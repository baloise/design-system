import { DsPagination, expect, test } from '@baloise/ds-playwright'

test.describe('dsChange — page click', () => {
  test('should fire dsChange with the clicked page number', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="10"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))
    const changeSpy = await pagination.el.spyOnEvent('dsChange')

    await pagination.clickPage(12)

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(12)
  })
})

test.describe('dsChange — next button', () => {
  test('should fire dsChange with value + 1 when clicking next', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="5"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))
    const changeSpy = await pagination.el.spyOnEvent('dsChange')

    await pagination.clickNext()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(6)
  })

  test('should not fire dsChange when already on last page', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="5" value="5"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))
    const changeSpy = await pagination.el.spyOnEvent('dsChange')

    await pagination.assertNextToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('dsChange — previous button', () => {
  test('should fire dsChange with value - 1 when clicking previous', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="5"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))
    const changeSpy = await pagination.el.spyOnEvent('dsChange')

    await pagination.clickPrevious()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(4)
  })

  test('should not fire dsChange when already on first page', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="1"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))
    const changeSpy = await pagination.el.spyOnEvent('dsChange')

    await pagination.assertPreviousToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

// test.describe('dsChange — next() method', () => {
//   test('should fire dsChange and advance page via next() method', async ({ page }) => {
//     await page.mount(`<ds-pagination page-range="2" total-pages="20" value="3"></ds-pagination>`)
//     const pagination = new DsPagination(page.locator('ds-pagination'))
//     const changeSpy = await pagination.el.spyOnEvent('dsChange')

//     await pagination.el.callMethod('next')

//     expect(changeSpy).toHaveReceivedEventTimes(1)
//     expect(changeSpy).toHaveReceivedEventDetail(4)
//   })

//   test('should not fire dsChange via next() when on last page', async ({ page }) => {
//     await page.mount(`<ds-pagination page-range="2" total-pages="5" value="5"></ds-pagination>`)
//     const pagination = new DsPagination(page.locator('ds-pagination'))
//     const changeSpy = await pagination.el.spyOnEvent('dsChange')

//     await pagination.el.callMethod('next')

//     expect(changeSpy).toHaveReceivedEventTimes(0)
//   })
// })

// test.describe('dsChange — previous() method', () => {
//   test('should fire dsChange and go back via previous() method', async ({ page }) => {
//     await page.mount(`<ds-pagination page-range="2" total-pages="20" value="3"></ds-pagination>`)
//     const pagination = new DsPagination(page.locator('ds-pagination'))
//     const changeSpy = await pagination.el.spyOnEvent('dsChange')

//     await pagination.el.callMethod('previous')

//     expect(changeSpy).toHaveReceivedEventTimes(1)
//     expect(changeSpy).toHaveReceivedEventDetail(2)
//   })

//   test('should not fire dsChange via previous() when on first page', async ({ page }) => {
//     await page.mount(`<ds-pagination page-range="2" total-pages="20" value="1"></ds-pagination>`)
//     const pagination = new DsPagination(page.locator('ds-pagination'))
//     const changeSpy = await pagination.el.spyOnEvent('dsChange')

//     await pagination.el.callMethod('previous')

//     expect(changeSpy).toHaveReceivedEventTimes(0)
//   })
// })

test.describe('disabled', () => {
  test('should hide navigation buttons when disabled', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="5" disabled></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))

    await pagination.assertToBeDisabled()
    await expect(pagination.previousButton).toBeHidden()
    await expect(pagination.nextButton).toBeHidden()
  })
})

test.describe('value', () => {
  test('should reflect the initial value as the active page', async ({ page }) => {
    await page.mount(`<ds-pagination page-range="2" total-pages="20" value="7"></ds-pagination>`)
    const pagination = new DsPagination(page.locator('ds-pagination'))

    await pagination.assertCurrentPage(7)
  })
})
