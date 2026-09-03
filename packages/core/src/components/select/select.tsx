import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { DsComponentInterface } from '@global'
import {
  inheritAttributes,
  Logger,
  type LogInstance,
  OneOf,
  Type,
  stopEventBubbling,
  raf,
  watchInvalidTextSlot,
} from '@utils'
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
import { SelectPickerController, buildSlimData } from './select.picker'
import type { Option } from 'slim-select/dist/store'

/**
 * Select renders an accessible single- or multi-select dropdown backed by Slim Select,
 * with full form association and the standard DS field wrapper (label, description, validation).
 *
 * @slot - Optional ds-select-option / ds-select-optgroup elements, as an HTML-only alternative
 * to the options / optionGroups props. Ignored whenever options or optionGroups is non-empty.
 * @slot invalid-text - Overrides the `invalidText` prop with custom markup, shown instead of the description when `invalid` is `true`.
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
  private picker: SelectPickerController | undefined
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
  @State() slottedOptions: SelectOption[] = []
  @State() hasInvalidTextSlotContent = false

  private disconnectInvalidTextSlotWatcher?: () => void
  @State() slottedOptionGroups: SelectOptionGroup[] = []

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The current value of the select.
   * In single mode: `string | null`.
   * In multiple mode: `string[]` (array of selected values). As an HTML attribute, multiple
   * values can also be passed as a comma-separated string, e.g. `value="it,ch"`.
   */
  @Prop({ mutable: true })
  value: string | string[] | null = null

  @Watch('value')
  protected valueChanged(newVal: string | string[] | null) {
    const normalized = this.normalizeValue(newVal)
    if (normalized !== newVal) {
      this.value = normalized
      return
    }
    this.syncFormValue(normalized)
    if (!this.picker) return
    this.picker.setSelected(normalized ?? [])
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
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.value = this.normalizeValue(this.value)
    this.initialValue = this.value
    this.syncFormValue(this.value)
    this.disconnectInvalidTextSlotWatcher = watchInvalidTextSlot(this.el, hasContent => {
      this.hasInvalidTextSlotContent = hasContent
    })
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  componentDidLoad() {
    if (!this.selectEl || !this.popupEl || !this.el.shadowRoot) return

    this.readOptionsFromSlot()

    this.picker = new SelectPickerController({
      selectEl: this.selectEl,
      popupEl: this.popupEl,
      shadowRoot: this.el.shadowRoot,
      triggerId: this.selectId,
      language: this.language,
      placeholder: this.placeholder,
      searchable: this.searchable,
      disabled: this.disabled,
      readonly: this.readonly,
      multiple: this.multiple,
      clearable: this.clearable,
      data: this.buildSlimData(),
      onChange: newVal => this.handleAfterChange(newVal),
      onOpen: () => {
        this.focused = true
        this.dsFocus.emit(new FocusEvent('focus'))
      },
      onClose: () => {
        this.focused = false
        this.dsBlur.emit(new FocusEvent('blur'))
      },
    })

    this.syncFormValue(this.value)
    this.initialValue = this.value
  }

  disconnectedCallback() {
    this.picker?.destroy()
    this.picker = undefined
    this.disconnectInvalidTextSlotWatcher?.()
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
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
   * ─────────────────────────────────────────────────────
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
      this.picker?.updateSearchPlaceholder(state.language)
    }
  }

  /**
   * Opens the select dropdown.
   */
  @Method()
  async open(): Promise<void> {
    this.picker?.open()
  }

  /**
   * Closes the select dropdown.
   */
  @Method()
  async close(): Promise<void> {
    this.picker?.close()
  }

  /**
   * Sets focus on the select trigger.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.picker?.focus()
  }

  /**
   * Removes focus from the select trigger.
   */
  @Method()
  async setBlur(): Promise<void> {
    this.picker?.blur()
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleSlotChange = () => {
    this.readOptionsFromSlot()
    this.refreshSlimData()
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
      raf(() => this.picker?.close())
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  // Attributes are always strings, so `value="it,ch"` arrives as a single string in
  // multiple mode. Split it into the `string[]` the rest of the component expects.
  private normalizeValue(val: string | string[] | null): string | string[] | null {
    if (this.multiple && typeof val === 'string') {
      return val
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0)
    }
    return val
  }

  private refreshSlimData() {
    this.picker?.setData(this.buildSlimData())
  }

  private buildSlimData() {
    const options = this.options.length > 0 ? this.options : this.slottedOptions
    const optionGroups = this.optionGroups.length > 0 ? this.optionGroups : this.slottedOptionGroups
    return buildSlimData(options, optionGroups, this.placeholder, this.value)
  }

  // Reads ds-select-option / ds-select-optgroup light-DOM children (the HTML-only alternative
  // to the options / optionGroups props) into the same shape those props use.
  private readOptionsFromSlot() {
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])')
    if (!slot) return

    const assignedElements = slot.assignedElements({ flatten: true })
    const optgroups = assignedElements.filter(el => el.tagName.toLowerCase() === 'ds-select-optgroup')

    if (optgroups.length > 0) {
      this.slottedOptionGroups = optgroups.map(el => ({
        label: (el as HTMLDsSelectOptgroupElement).label,
        options: this.mapSelectOptionElements(Array.from(el.querySelectorAll('ds-select-option'))),
      }))
      this.slottedOptions = []
    } else {
      const options = assignedElements.filter(el => el.tagName.toLowerCase() === 'ds-select-option')
      this.slottedOptions = this.mapSelectOptionElements(options)
      this.slottedOptionGroups = []
    }
  }

  private mapSelectOptionElements(elements: Element[]): SelectOption[] {
    return elements.map(el => {
      const option = el as HTMLDsSelectOptionElement
      return {
        label: option.textContent?.trim() ?? '',
        value: option.value,
        disabled: option.disabled,
      }
    })
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
    this.picker?.setDisabled(this.disabled || this.readonly)
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid || this.hasInvalidTextSlotContent}
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
        >
          {/* Hidden ds-select-option / ds-select-optgroup children — the HTML-only alternative to options/optionGroups */}
          <slot onSlotchange={this.handleSlotChange}></slot>
        </div>
      </Field>
    )
  }
}

let SelectIds = 0
