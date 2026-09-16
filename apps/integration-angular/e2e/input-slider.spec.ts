import { expect, Locator, test } from '@playwright/test'

// `ds-input-slider` has no native `<input>` to `fill()`: interaction goes through noUiSlider's own API on
// the shadow-DOM `[part="slider"]` element, the same trick `packages/playwright`'s `DsInputSlider` page
// object uses. Waiting a macrotask tick lets `dsChange`'s debounced (`setTimeout(0)`) emit run before this
// resolves — a raw `evaluate()` round-trip can otherwise return before it fires.
const setSliderValue = (slider: Locator, value: number) =>
  slider.evaluate(
    (el, v) =>
      new Promise<void>(resolve => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(el as any).noUiSlider.set(v)
        setTimeout(resolve, 0)
      }),
    value,
  )

// `.blur()` alone is a no-op on an element that was never focused — it never emits `dsBlur`, so the control
// would stay untouched. Real user interaction always focuses the handle first (native slider keyboard/pointer
// support does this implicitly); this drives it explicitly since `setSliderValue` above sets the value
// without going through the handle at all.
const touchHandle = async (handle: Locator) => {
  await handle.focus()
  await handle.blur()
}

test('ds-input-slider fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const slider = page.getByTestId('input-slider').locator('[part="slider"]')
  await setSliderValue(slider, 42)

  await expect(page.getByTestId('input-slider-value')).toHaveText('Input slider value: 42')
})

test('ds-input-slider reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveInputSlider = page.getByTestId('reactive-input-slider')
  const slider = reactiveInputSlider.locator('[part="slider"]')
  const handle = reactiveInputSlider.locator('.noUi-handle')

  await expect(reactiveInputSlider).toHaveAttribute('value', '60')

  await setSliderValue(slider, 65)
  await touchHandle(handle)
  await expect(page.getByTestId('reactive-input-slider-value')).toHaveText('Reactive value: 65')

  await page.getByTestId('set-reactive-input-slider-value').click()
  await expect(reactiveInputSlider).toHaveAttribute('value', '75')

  await page.getByTestId('toggle-reactive-input-slider-disabled').click()
  await expect(slider).toHaveAttribute('disabled', '')

  await page.getByTestId('toggle-reactive-input-slider-disabled').click()
  await expect(slider).not.toHaveAttribute('disabled', '')

  await setSliderValue(slider, 10)
  await touchHandle(handle)
  // `[part="inner"]` alone also matches the invalid-state `<ds-icon part="inner">`'s own, unrelated shadow
  // DOM (Playwright's CSS engine pierces every nested shadow root) — `[aria-invalid]` narrows to the
  // Field's own wrapper, the only one of the two that ever carries that attribute.
  await expect(reactiveInputSlider.locator('[part="inner"][aria-invalid]')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveInputSlider.locator('[part="description"]')).toHaveText('Value must be at least 50')
})

test('ds-input-slider reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffInputSlider = page.getByTestId('auto-invalid-off-input-slider')
  const slider = autoInvalidOffInputSlider.locator('[part="slider"]')
  const handle = autoInvalidOffInputSlider.locator('.noUi-handle')

  await setSliderValue(slider, 10)
  await touchHandle(handle)

  await expect(autoInvalidOffInputSlider.locator('[part="inner"][aria-invalid]')).not.toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(autoInvalidOffInputSlider.locator('[part="description"]')).not.toHaveAttribute('role', 'alert')
})
