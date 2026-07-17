import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { DsComponentInterface } from '@global'
import { inheritAttributes, Logger, type LogInstance, OneOf, Type, stopEventBubbling } from '@utils'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  SelectOption,
  SelectOptionGroup,
  SelectChangeDetail,
  SelectFocusDetail,
  SelectBlurDetail,
  SelectClickDetail,
} from './select.interfaces'
import { i18nDsSelect } from './select.i18n'
import SlimSelect from 'slim-select'
import type { Option, Optgroup } from 'slim-select/dist/store'

/**
 * Select renders an accessible single- or multi-select dropdown backed by Slim Select,
 * with full form association and the standard DS field wrapper (label, description, validation).
 *
 * @part inner - The inner wrapper element containing label, control, and description.
 * @part label - The label element.
 * @part control - The control container wrapping the slim-select trigger.
 * @part description - The description / validation message element.
 */
@Component({
  tag: 'ds-select',
  styleUrl: 'select.host.scss',
  shadow: true,
  formAssociated: true,
})
export class DsSelect implements DsComponentInterface, FieldInterface {
  private inheritedAttributes: { [k: string]: any } = {}
  private selectEl: HTMLSelectElement | undefined
  private popupEl: HTMLDivElement | undefined
  private slimSelect: SlimSelect | undefined
  private initialValue: string | string[] | null = null

  selectId = `ds-select-${SelectIds++}`

  log!: LogInstance
  @Logger('select')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The current value of the select.
   * In single mode: `string | null`.
   * In multiple mode: `string[]` (array of selected values).
   */
  @Prop({ mutable: true })
  value: string | string[] | null = null

  @Watch('value')
  protected valueChanged(newVal: string | string[] | null) {
    this.syncFormValue(newVal)
    if (!this.slimSelect) return
    if (Array.isArray(newVal)) {
      this.slimSelect.setSelected(newVal)
    } else if (newVal) {
      this.slimSelect.setSelected(newVal)
    } else {
      this.slimSelect.setSelected([])
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.selectId

  /**
   * The label displayed above the select field.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * The description displayed below the select field.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * Defines the color state of the select field.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * If `true`, the component renders in an invalid state.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * Validation message shown when `invalid` is true.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * If `true`, the user must select a value before submitting the form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = true

  /**
   * If `true`, the select is non-interactive and excluded from form submission.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  @Watch('disabled')
  protected disabledChanged() {
    this.syncDisabledState()
  }

  /**
   * If `true`, the value cannot be changed by the user.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  @Watch('readonly')
  protected readonlyChanged() {
    this.syncDisabledState()
  }

  /**
   * If `true`, the user can select multiple options.
   * The `value` prop and `dsChange` event will carry a `string[]` instead of `string | null`.
   */
  @Prop()
  @Type('boolean')
  readonly multiple: boolean = false

  /**
   * If `true`, a search input is shown inside the dropdown to filter options.
   */
  @Prop()
  @Type('boolean')
  readonly searchable: boolean = false

  /**
   * If `true`, a clear button is shown inside the trigger that resets the value to `null` (single mode only).
   */
  @Prop()
  @Type('boolean')
  readonly clearable: boolean = false

  /**
   * Placeholder text shown when no option is selected.
   */
  @Prop()
  @Type('string')
  readonly placeholder: string = ''

  /**
   * The list of selectable options (flat).
   * Use `optionGroups` when options should be grouped under a label.
   * If both are set, `optionGroups` takes precedence.
   */
  @Prop()
  readonly options: SelectOption[] = []

  @Watch('options')
  protected optionsChanged() {
    this.refreshSlimData()
  }

  /**
   * The list of option groups. Each group has a `label` and an `options` array.
   * When set, `options` is ignored.
   */
  @Prop()
  readonly optionGroups: SelectOptionGroup[] = []

  @Watch('optionGroups')
  protected optionGroupsChanged() {
    this.refreshSlimData()
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid automatically.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * Emitted when the selected value changes.
   * Single mode: `string | null`. Multiple mode: `string[]`.
   */
  @Event() dsChange!: EventEmitter<SelectChangeDetail>

  /**
   * Emitted when the control receives focus.
   */
  @Event() dsFocus!: EventEmitter<SelectFocusDetail>

  /**
   * Emitted when the control loses focus.
   */
  @Event() dsBlur!: EventEmitter<SelectBlurDetail>

  /**
   * Emitted when the host element is clicked.
   */
  @Event() dsClick!: EventEmitter<SelectClickDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.initialValue = this.value
    this.syncFormValue(this.value)
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    if (!this.selectEl || !this.popupEl) return

    this.slimSelect = new SlimSelect({
      select: this.selectEl,
      settings: {
        contentLocation: this.popupEl,
        contentPosition: 'relative',
        showSearch: this.searchable,
        focusSearch: this.searchable,
        searchPlaceholder: i18nDsSelect[this.language].searchPlaceholder,
        searchText: i18nDsSelect[this.language].noResults,
        placeholderText: this.placeholder || ' ',
        disabled: this.disabled || this.readonly,
        closeOnSelect: !this.multiple,
        allowDeselect: this.clearable,
        modal: 'off',
      },
      data: this.buildSlimData(),
      events: {
        afterChange: (newVal: Option[]) => this.handleAfterChange(newVal),
        afterOpen: () => {
          this.focused = true
          this.dsFocus.emit(new FocusEvent('focus'))
        },
        afterClose: () => {
          this.focused = false
          this.dsBlur.emit(new FocusEvent('blur'))
        },
      },
    })

    this.syncFormValue(this.value)
    this.initialValue = this.value

    this.connectLabelToTrigger()
    this.fixSearchListener()
    this.fixKeyboardOpen()
  }

  disconnectedCallback() {
    this.slimSelect?.destroy()
    this.slimSelect = undefined
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: MouseEvent) {
    if ((this.disabled || this.readonly) && ev.target === this.el) {
      stopEventBubbling(ev)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const form = ev.target as HTMLElement
    if (form?.contains(this.el)) {
      this.value = this.initialValue
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    if (this.searchable) {
      const searchInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('.ss-search input')
      if (searchInput) searchInput.placeholder = i18nDsSelect[state.language].searchPlaceholder
    }
  }

  /**
   * Opens the select dropdown.
   */
  @Method()
  async open(): Promise<void> {
    this.slimSelect?.open()
  }

  /**
   * Closes the select dropdown.
   */
  @Method()
  async close(): Promise<void> {
    this.slimSelect?.close()
  }

  /**
   * Sets focus on the select trigger.
   */
  @Method()
  async setFocus(): Promise<void> {
    const trigger = this.el.shadowRoot?.querySelector<HTMLElement>('.ss-main')
    trigger?.focus()
  }

  /**
   * Removes focus from the select trigger.
   */
  @Method()
  async setBlur(): Promise<void> {
    const trigger = this.el.shadowRoot?.querySelector<HTMLElement>('.ss-main')
    trigger?.blur()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private refreshSlimData() {
    if (!this.slimSelect) return
    this.slimSelect.setData(this.buildSlimData())
  }

  private buildSlimData(): (Partial<Option> | Partial<Optgroup>)[] {
    const selected = Array.isArray(this.value) ? this.value : this.value ? [this.value] : []
    const data: (Partial<Option> | Partial<Optgroup>)[] = []
    data.push({ text: this.placeholder || '', placeholder: true } as Partial<Option>)
    if (this.optionGroups.length > 0) {
      data.push(
        ...this.optionGroups.map(group => ({
          label: group.label,
          options: group.options.map(opt => ({
            text: opt.label,
            value: opt.value,
            disabled: !!opt.disabled,
            selected: selected.includes(opt.value),
          })),
        })),
      )
    } else {
      data.push(
        ...this.options.map(opt => ({
          text: opt.label,
          value: opt.value,
          disabled: !!opt.disabled,
          selected: selected.includes(opt.value),
        })),
      )
    }
    return data
  }

  private handleAfterChange(newVal: Option[]) {
    const selected = newVal.filter(o => !o.placeholder)

    if (this.multiple) {
      const values = selected.map(o => o.value)
      this.syncFormValue(values)
      this.value = values
      this.dsChange.emit(values)
    } else {
      const value = selected[0]?.value ?? null
      this.syncFormValue(value)
      this.value = value
      this.dsChange.emit(value)
    }
  }

  private syncFormValue(val: string | string[] | null) {
    if (Array.isArray(val)) {
      const formData = new FormData()
      val.forEach(v => formData.append(this.name, v))
      this.internals.setFormValue(formData)
    } else {
      this.internals.setFormValue(val)
    }
  }

  private syncDisabledState() {
    if (this.disabled || this.readonly) {
      this.slimSelect?.disable()
    } else {
      this.slimSelect?.enable()
    }
  }

  // Shadow DOM event retargeting makes e.target null inside slim-select's keyup handler.
  // Intercept during capture phase (before slim-select's bubble listener), stop propagation,
  // and drive the search programmatically from the element reference instead.
  private fixSearchListener() {
    if (!this.searchable) return
    const searchInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('.ss-search input')
    if (!searchInput) return
    searchInput.addEventListener(
      'input',
      ev => {
        ev.stopImmediatePropagation()
        this.slimSelect?.search(searchInput.value ?? '')
      },
      { capture: true },
    )
  }

  // SlimSelect's Space/Enter listener uses document.activeElement to find its trigger,
  // but Shadow DOM retargeting returns the host element instead of .ss-main after a
  // programmatic focus() call — so Space stops working after the first selection.
  // We intercept keydown on the trigger directly to reopen the dropdown ourselves.
  private fixKeyboardOpen() {
    const trigger = this.el.shadowRoot?.querySelector<HTMLElement>('.ss-main')
    if (!trigger) return
    trigger.addEventListener('keydown', ev => {
      const target = ev.target as HTMLElement
      if (
        (ev.key === ' ' || ev.key === 'Enter') &&
        target === trigger &&
        !target.classList.contains('ss-value-delete') &&
        !trigger.classList.contains('ss-open')
      ) {
        ev.preventDefault()
        this.slimSelect?.open()
      }
    })
  }

  private connectLabelToTrigger() {
    const ssMain = this.el.shadowRoot?.querySelector<HTMLElement>('.ss-main')
    if (ssMain) {
      ssMain.id = this.selectId
      ssMain.setAttribute('aria-labelledby', 'label')
      ssMain.removeAttribute('aria-label')
    }

    // <label for="..."> only focuses native labelable elements; .ss-main is a div,
    // so the browser ignores the for/id link. Wire it manually.
    const label = this.el.shadowRoot?.querySelector<HTMLLabelElement>('label')
    if (label && ssMain) {
      label.addEventListener('click', ev => {
        ev.preventDefault()
        ssMain.focus()
      })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId={this.selectId}
        onClick={ev => this.dsClick.emit(ev)}
      >
        {/* Hidden native select — slim-select enhances this and manages its own accessible trigger */}
        <select
          name={this.name}
          multiple={this.multiple}
          required={this.required}
          disabled={this.disabled}
          aria-hidden="true"
          tabindex={-1}
          ref={el => (this.selectEl = el as HTMLSelectElement)}
          {...this.inheritedAttributes}
        />
        {/* Slim-select mounts its dropdown content here via contentLocation */}
        <div
          id="popup"
          class={{
            'is-multiple': this.multiple,
          }}
          ref={el => (this.popupEl = el as HTMLDivElement)}
        />
      </Field>
    )
  }
}

let SelectIds = 0
