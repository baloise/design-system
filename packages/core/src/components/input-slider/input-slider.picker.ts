import noUiSlider, { type API, type target as TargetElement } from 'nouislider'
import { decimalsFromStep } from './input-slider.utils'

export interface InputSliderPickerConfig {
  targetEl: TargetElement
  labelId: string
  min: number
  max: number
  step: string
  value: number
  disabled: boolean
  invalid: boolean
  onInput: (value: number) => void
  onChange: (value: number) => void
}

export class InputSliderPickerController {
  private slider: API | undefined
  private config: InputSliderPickerConfig
  // Set while a programmatic setValue() is in flight, so the 'update'/'set' listeners it
  // triggers don't echo back out as dsInput/dsChange. Only real user interaction — or a test
  // harness driving the underlying noUiSlider instance directly — should emit those events;
  // an external `el.value = x` assignment (e.g. an Angular CVA writeValue()) must not.
  private suppressEvents = false

  constructor(config: InputSliderPickerConfig) {
    this.config = config
    this.init()
  }

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  setValue(value: number) {
    if (this.slider?.get() === value) return
    this.suppressEvents = true
    this.slider?.set(value)
    this.suppressEvents = false
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.slider?.disable()
    } else {
      this.slider?.enable()
    }
  }

  setInvalid(invalid: boolean) {
    this.handleEl?.setAttribute('aria-invalid', invalid ? 'true' : 'false')
  }

  updateRange(min: number, max: number, step: string) {
    this.slider?.updateOptions(
      {
        range: { min: Math.min(min, max), max: Math.max(min, max) },
        step: numericStep(step),
        format: buildFormat(step),
      },
      false,
    )
  }

  focus() {
    this.handleEl?.focus()
  }

  blur() {
    this.handleEl?.blur()
  }

  get handleEl(): HTMLElement | undefined {
    return this.config.targetEl.querySelector<HTMLElement>('.noUi-handle') ?? undefined
  }

  destroy() {
    this.slider?.destroy()
    this.slider = undefined
  }

  /**
   * PRIVATE
   * ------------------------------------------------------
   */

  private init() {
    const { targetEl, min, max, step, value, disabled, invalid } = this.config

    this.slider = noUiSlider.create(targetEl, {
      range: { min: Math.min(min, max), max: Math.max(min, max) },
      start: value,
      step: numericStep(step),
      format: buildFormat(step),
      // 'lower' fills the track from the start to the handle (single-handle "progress" look);
      // the remainder shows the plain track background — see input-slider.host.scss.
      connect: 'lower',
      tooltips: true,
      keyboardSupport: true,
    })

    if (disabled) this.slider.disable()

    // 'set' (not 'change') is used for the commit event: noUiSlider's own .set() API call —
    // used by the picker's setValue() and by test helpers driving the widget programmatically —
    // only fires 'update' + 'set', never 'change'. Real user interactions fire both together,
    // so 'set' covers both cases while 'change' alone would miss programmatic commits.
    this.slider.on('update', values => {
      if (this.suppressEvents) return
      this.config.onInput(Number(values[0]))
    })
    this.slider.on('set', values => {
      if (this.suppressEvents) return
      this.config.onChange(Number(values[0]))
    })

    this.connectLabelToHandle()
    this.setInvalid(invalid)
  }

  // A generic noUiSlider handle has no accessible name of its own; connect it to the
  // Field's label/description, same as SelectPickerController.connectLabelToTrigger().
  private connectLabelToHandle() {
    const handle = this.handleEl
    if (!handle) return
    handle.setAttribute('aria-labelledby', this.config.labelId)
    handle.setAttribute('aria-describedby', 'description')
  }
}

function numericStep(step: string): number | undefined {
  if (step === 'any') return undefined
  const parsed = Number(step)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

function buildFormat(step: string) {
  const decimals = decimalsFromStep(step)
  return {
    to: (value: number) => Number(value.toFixed(decimals)),
    from: (value: string) => Number(value),
  }
}
