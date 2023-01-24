import { areArraysEqual } from '@baloise/web-app-utils'
import { Component, Host, h, Element, State, Prop, Event, EventEmitter, Watch, Method, Listen } from '@stencil/core'
import {
  FormInput,
  inputHandleBlur,
  inputHandleFocus,
  inputHandleHostClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../utils/form-input'
import { Logger, LogInstance } from '../../../utils/log'
import { FileUploadRejectedFile } from './bal-file-upload.type'
import { FileListComponent } from './components/file-list'
import { toFileArray, toFileList } from './utils/file-list.util'
import { validateFileArray } from './utils/file-validation.util'

@Component({
  tag: 'bal-file-upload',
  styleUrls: {
    css: 'bal-file-upload.sass',
  },
})
export class FileUpload implements FormInput<File[]> {
  @Element() el!: HTMLElement

  private fileUploadId = `bal-file-upload-${FileUploadIds++}`

  nativeInput: HTMLInputElement | undefined
  private labelEl: HTMLLabelElement | undefined

  @State() files: File[] = []
  @State() hasFocus = false

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
   * Triggers when a file is added or removed.
   */
  @Event() balChange!: EventEmitter<File[]>

  /**
   * Triggers when a file is added.
   */
  @Event() balFilesAdded!: EventEmitter<File[]>

  /**
   * Triggers when a file is removed.
   */
  @Event() balFilesRemoved!: EventEmitter<File[]>

  /**
   * Triggers when a file is rejected due to not allowed MIME-Type and so on.
   */
  @Event() balRejectedFile!: EventEmitter<FileUploadRejectedFile>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this.onValueChange()
  }

  // TODO: check with storybook that we do not create more than one listener
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

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private addEventListenerDragAndDrop = () => {
    if (this.labelEl) {
      this.labelEl.addEventListener('dragenter', this.dragenter, false)
      this.labelEl.addEventListener('dragover', this.dragover, false)
      this.labelEl.addEventListener('drop', this.drop, false)
    }
  }

  private removeEventListenerDragAndDrop = () => {
    if (this.labelEl) {
      this.labelEl.removeEventListener('dragenter', this.dragenter, false)
      this.labelEl.removeEventListener('dragover', this.dragover, false)
      this.labelEl.removeEventListener('drop', this.drop, false)
    }
  }

  private dragenter = (event: Event) => {
    stopEventBubbling(event)
  }

  private dragover = (event: Event) => {
    stopEventBubbling(event)
  }

  private drop = (event: DragEvent) => {
    stopEventBubbling(event)
    if (!this.disabled && !this.readonly && !this.loading) {
      const dataTransfer = event.dataTransfer
      if (dataTransfer) {
        this.handleFiles(dataTransfer.files)
      }
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
      this.balFilesAdded.emit(validatedFiles.validFiles)
      this.files = [...this.files, ...validatedFiles.validFiles]
      this.balChange.emit(this.files)
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

  private onInputChange = (): void => {
    if (!this.disabled && !this.readonly && !this.loading) {
      if (this.nativeInput?.files) {
        this.handleFiles(this.nativeInput.files)
      }
    }
  }

  private onRemoveFile = (event: Event, index: number): void => {
    stopEventBubbling(event)

    if (index >= 0 && index < this.files.length) {
      const files = this.files
      const removedFiles = files.splice(index, 1)
      this.balFilesRemoved.emit(removedFiles)

      this.files = [...files]
      this.balChange.emit(this.files)
      this.updateFileInput()
    }
  }

  private onHostClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  private onInputFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onInputBlur = (event: FocusEvent) => inputHandleBlur(this, event)

  private onInputClick = (event: MouseEvent) => this.balClick.emit(event)

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        onClick={this.onHostClick}
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
            htmlFor={this.fileUploadId}
            class={{
              'file-label': true,
              'is-disabled': this.disabled || this.loading || this.readonly,
            }}
          >
            <input
              class="file-input"
              type="file"
              id={this.fileUploadId}
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
              ref={el => (this.nativeInput = el as HTMLInputElement)}
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
                <span class="file-label">{this.label}</span>
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
