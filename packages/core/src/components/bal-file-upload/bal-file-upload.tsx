import { areArraysEqual } from '../../utils/array'
import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core'
import {
  FormInput,
  inputHandleBlur,
  inputHandleFocus,
  inputHandleHostClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../utils/form-input'
import { Logger, LogInstance } from '../../utils/log'
import { FileListComponent } from './components/file-list'
import { toFileArray, toFileList } from './utils/file-list.util'
import { validateFileArray } from './utils/file-validation.util'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { ariaBooleanToString } from '../../utils/aria'

@Component({
  tag: 'bal-file-upload',
  styleUrl: 'bal-file-upload.sass',
})
export class FileUpload implements FormInput<File[]>, BalAriaFormLinking {
  @Element() el!: HTMLElement

  private fileUploadId = `bal-file-upload-${FileUploadIds++}`

  nativeInput: HTMLInputElement | undefined
  private labelEl: HTMLLabelElement | undefined

  @State() files: File[] = []
  @State() focused = false
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  log!: LogInstance

  @Logger('bal-file-upload')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.fileUploadId

  /**
   * Input value.
   */
  @Prop() value: File[] = []
  private initialValue = this.value || []

  @Watch('value')
  onValueChange() {
    if (!areArraysEqual(this.files, this.value)) {
      this.files = this.value
    }
  }

  /**
   * Label of the drop area.
   */
  @Prop() label = 'Choose or drop a file...'

  /**
   * If `true` multiple file upload is possible.
   */
  @Prop() multiple = true

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` the file upload is disabled and shows a spinner
   */
  @Prop() loading = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * Accepted MIME-Types like `image/png,image/jpeg`.
   */
  @Prop() accept?: string

  /**
   * Allowed number of files in the bundle.
   */
  @Prop() maxFiles?: number

  /**
   * Allowed max file size in bytes.
   */
  @Prop() maxFileSize?: number

  /**
   * Allowed max bundle size in bytes.
   */
  @Prop() maxBundleSize?: number

  /**
   * If `true` below the drop-down area it generates a file list.
   */
  @Prop() hasFileList = true

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * Overrides the default subtitle file size
   */
  @Prop() subTitle?: (file: File) => string

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Triggers when a file is added or removed.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalFileUploadChangeDetail>

  /**
   * Triggers when a file is added.
   */
  @Event() balFilesAdded!: EventEmitter<BalEvents.BalFileUploadFilesAddedDetail>

  /**
   * Triggers when a file is removed.
   */
  @Event() balFilesRemoved!: EventEmitter<BalEvents.BalFileUploadFilesRemovedDetail>

  /**
   * Triggers when a file is rejected due to not allowed MIME-Type and so on.
   */
  @Event() balRejectedFile!: EventEmitter<BalEvents.BalFileUploadRejectedFileDetail>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balInputClick!: EventEmitter<BalEvents.BalFileUploadInputClickDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalFileUploadBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalFileUploadFocusDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this.onValueChange()
  }

  connectedCallback() {
    this.initialValue = this.value || []
    this.addEventListenerDragAndDrop()
  }

  componentDidLoad() {
    this.addEventListenerDragAndDrop()
  }

  disconnectedCallback() {
    this.removeEventListenerDragAndDrop()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  private resetHandlerTimer?: NodeJS.Timeout

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.files = [...this.initialValue]
      clearTimeout(this.resetHandlerTimer)
      this.resetHandlerTimer = setTimeout(() => {
        if (this.nativeInput) {
          this.nativeInput.files = toFileList(this.initialValue)
        }
      })
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the file list to an empty list
   */
  @Method()
  async clear(): Promise<void> {
    this.files = []
    this.updateFileInput()
  }

  /**
   * Sets focus on the native `input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    inputSetFocus(this)
  }

  /**
   * Sets blur on the native `input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    inputSetBlur(this)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement | undefined> {
    return Promise.resolve(this.nativeInput)
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private addEventListenerDragAndDrop = () => {
    if (this.labelEl) {
      this.labelEl.addEventListener('dragenter', this.onDragenter, false)
      this.labelEl.addEventListener('dragover', this.onDragover, false)
      this.labelEl.addEventListener('drop', this.onDrop, false)
    }
  }

  private removeEventListenerDragAndDrop = () => {
    if (this.labelEl) {
      this.labelEl.removeEventListener('dragenter', this.onDragenter, false)
      this.labelEl.removeEventListener('dragover', this.onDragover, false)
      this.labelEl.removeEventListener('drop', this.onDrop, false)
    }
  }

  private handleFiles = (fileList: FileList) => {
    const files = toFileArray(fileList)

    const validatedFiles = validateFileArray(this.files, files, {
      accept: this.accept,
      maxFileSize: this.maxFileSize,
      maxBundleSize: this.maxBundleSize,
      maxFiles: this.maxFiles,
    })

    if (validatedFiles.invalidFiles.length > 0) {
      this.balRejectedFile.emit(validatedFiles.invalidFiles[0])
    }

    if (validatedFiles.validFiles.length > 0) {
      this.files = [...this.files, ...validatedFiles.validFiles]
      this.balChange.emit(this.files)
      this.balFilesAdded.emit(validatedFiles.validFiles)
    }

    this.updateFileInput()
  }

  private updateFileInput = () => {
    if (this.nativeInput?.files) {
      this.nativeInput.files = toFileList(this.files)
    }
  }

  /**
   * HANDLERS
   * ------------------------------------------------------
   */

  private onDragenter = (ev: Event) => {
    stopEventBubbling(ev)
  }

  private onDragover = (ev: Event) => {
    stopEventBubbling(ev)
  }

  private onDrop = (ev: DragEvent) => {
    stopEventBubbling(ev)
    if (!this.disabled && !this.readonly && !this.loading) {
      const dataTransfer = ev.dataTransfer
      if (dataTransfer) {
        this.handleFiles(dataTransfer.files)
      }
    }
  }

  private onInputChange = (): void => {
    if (!this.disabled && !this.readonly && !this.loading) {
      if (this.nativeInput?.files) {
        this.handleFiles(this.nativeInput.files)
      }
    }
  }

  private onRemoveFile = (ev: Event, index: number): void => {
    stopEventBubbling(ev)

    if (index >= 0 && index < this.files.length) {
      const files = this.files
      const removedFiles = files.splice(index, 1)
      this.balFilesRemoved.emit(removedFiles)

      this.files = [...files]
      this.balChange.emit(this.files)
      this.updateFileInput()
    }
  }

  private onHostClick = (ev: MouseEvent) => inputHandleHostClick(this, ev)

  private onInputFocus = (ev: FocusEvent) => inputHandleFocus(this, ev)

  private onInputBlur = (ev: FocusEvent) => inputHandleBlur(this, ev)

  private onInputClick = (ev: MouseEvent) => {
    if (this.nativeInput && !this.disabled && !this.readonly && !this.loading) {
      this.nativeInput.value = ''
    }
    this.balInputClick.emit(ev)
  }
  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const id = this.ariaForm.controlId || this.fileUploadId

    return (
      <Host
        onClick={this.onHostClick}
        aria-disabled={ariaBooleanToString(this.disabled)}
        class={{
          'bal-file-upload': true,
        }}
      >
        <div
          class={{
            'file': true,
            'is-disabled': this.disabled || this.readonly || this.loading,
            'is-danger': this.invalid,
          }}
        >
          <label
            htmlFor={id}
            ref={el => (this.labelEl = el)}
            class={{
              'file-label': true,
              'is-disabled': this.disabled || this.loading || this.readonly,
            }}
          >
            <input
              class="file-input"
              type="file"
              id={id}
              aria-labelledby={this.ariaForm.labelId}
              aria-describedby={this.ariaForm.messageId}
              aria-invalid={this.invalid === true ? 'true' : 'false'}
              aria-disabled={ariaBooleanToString(this.disabled)}
              name={this.name}
              multiple={this.multiple}
              disabled={this.disabled || this.loading || this.readonly}
              readonly={this.readonly}
              required={this.required}
              accept={this.accept}
              onClick={this.onInputClick}
              onChange={this.onInputChange}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              ref={el => (this.nativeInput = el)}
              data-testid="bal-file-upload-input"
            />
            {this.loading ? (
              <span class="file-cta">
                <bal-spinner></bal-spinner>
              </span>
            ) : (
              <span class="file-cta">
                <span class="file-icon">
                  <bal-icon
                    name="upload"
                    size="medium"
                    color={
                      this.disabled || this.loading || this.readonly ? 'grey-light' : this.invalid ? 'danger' : 'blue'
                    }
                  ></bal-icon>
                </span>
                <span class="file-label" data-testid="bal-file-upload-label">
                  {this.label}
                </span>
              </span>
            )}
          </label>
        </div>
        {this.hasFileList && this.files.length > 0 ? (
          <FileListComponent
            files={this.files}
            disabled={this.disabled || this.readonly || this.loading}
            subTitle={this.subTitle}
            onRemoveFile={this.onRemoveFile}
          />
        ) : (
          ''
        )}
      </Host>
    )
  }
}

let FileUploadIds = 0
