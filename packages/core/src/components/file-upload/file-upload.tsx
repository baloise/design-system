import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { DsComponentInterface } from '@global'
import { Logger, type LogInstance, stopEventBubbling, areArraysEqual, OneOf, Type } from '@utils'
import { defaultConfig, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_COLORS, InputColor } from '../input/input.interfaces'
import {
  type FileUploadChangeDetail,
  type FileUploadFilesAddedDetail,
  type FileUploadFilesRemovedDetail,
  type FileUploadRejectedFileDetail,
  type FileUploadInputClickDetail,
  type FileUploadBlurDetail,
  type FileUploadFocusDetail,
} from './file-upload.interfaces'
import { toFileArray, toFileList } from './utils/file-list.util'
import { validateFileArray } from './utils/file-validation.util'
import { formatFileSize } from './utils/file-size.util'
import { i18nDsFileUpload } from './file-upload.i18n'

/**
 * FileUpload renders a drag-drop file upload area with optional file list, validation, and form field integration.
 *
 * @part drop-zone - The main drop area where users drag files or click to select.
 * @part file-list - The list of selected files below the drop zone.
 */
@Component({
  tag: 'ds-file-upload',
  styleUrl: 'file-upload.host.scss',
  shadow: true,
})
export class FileUpload implements DsComponentInterface, FieldInterface {
  private fileUploadId = `ds-file-upload-${FileUploadIds++}`
  private initialValue: File[] = []
  private nativeInput?: HTMLInputElement
  private dropZoneEl?: HTMLDivElement

  log!: LogInstance
  @Logger('file-upload')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() files: File[] = []
  @State() focused = false
  @State() isDragOver = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the file upload (array of selected files).
   */
  @Prop({ mutable: true })
  @Type('array')
  value: File[] = []

  @Watch('value')
  valueChanged() {
    const newFiles = this.value || []
    if (!areArraysEqual(this.files, newFiles)) {
      this.files = [...newFiles]
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
  @Type('string')
  readonly name: string = this.fileUploadId

  /**
   * The label of the file upload, displayed in the drop zone area.
   */
  @Prop()
  @Type('string')
  readonly label: string = 'Choose or drop a file...'

  /**
   * The text displayed inside the drop zone. Defaults to localized "Drag and drop or choose file(s) to upload".
   */
  @Prop()
  @Type('string')
  readonly dropZoneLabel: string = ''

  /**
   * The description of the file upload, displayed below the drop zone.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * The text to display when the file upload is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * Defines the color of the file upload. The default value is `primary`.
   */
  @Prop()
  @OneOf(INPUT_COLORS)
  readonly color: InputColor = 'primary'

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * If `true` multiple file upload is possible.
   */
  @Prop()
  @Type('boolean')
  readonly multiple: boolean = true

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * If `true` the file upload is disabled and shows a spinner.
   */
  @Prop()
  @Type('boolean')
  readonly loading: boolean = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = false

  /**
   * Accepted MIME-Types like `image/png,image/jpeg`.
   */
  @Prop()
  @Type('string')
  readonly accept: string = ''

  /**
   * Allowed number of files in the bundle.
   */
  @Prop()
  @Type('number')
  readonly maxFiles?: number

  /**
   * Allowed max file size in bytes.
   */
  @Prop()
  @Type('number')
  readonly maxFileSize?: number

  /**
   * Allowed max bundle size in bytes.
   */
  @Prop()
  @Type('number')
  readonly maxBundleSize?: number

  /**
   * If `true` below the drop-zone area it generates a file list.
   */
  @Prop()
  @Type('boolean')
  readonly hasFileList: boolean = true

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * Triggers when a file is added or removed.
   */
  @Event() dsChange!: EventEmitter<FileUploadChangeDetail>

  /**
   * Triggers when a file is added.
   */
  @Event() dsFilesAdded!: EventEmitter<FileUploadFilesAddedDetail>

  /**
   * Triggers when a file is removed.
   */
  @Event() dsFilesRemoved!: EventEmitter<FileUploadFilesRemovedDetail>

  /**
   * Triggers when a file is rejected due to validation rules.
   */
  @Event() dsRejectedFile!: EventEmitter<FileUploadRejectedFileDetail>

  /**
   * Emitted when the input has clicked.
   */
  @Event() dsInputClick!: EventEmitter<FileUploadInputClickDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() dsBlur!: EventEmitter<FileUploadBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() dsFocus!: EventEmitter<FileUploadFocusDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentWillLoad() {
    this.valueChanged()
  }

  connectedCallback() {
    this.initialValue = [...(this.value || [])]
  }

  componentDidLoad() {
    this.addDragListeners()
  }

  disconnectedCallback() {
    this.removeDragListeners()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.files = [...this.initialValue]
      setTimeout(() => {
        if (this.nativeInput) {
          this.nativeInput.files = toFileList(this.initialValue)
        }
      })
    }
  }

  @Method()
  @ListenToConfig()
  async configChanged(state: { language: DsLanguage; region: DsRegion }): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the file list to an empty list.
   */
  @Method()
  async clear(): Promise<void> {
    this.files = []
    this.updateFileInput()
  }

  /**
   * Sets focus on the native `input`. Use this method instead of the global `input.focus()`.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.nativeInput?.focus()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private addDragListeners = () => {
    if (this.dropZoneEl) {
      this.dropZoneEl.addEventListener('dragenter', this.handleDragenter)
      this.dropZoneEl.addEventListener('dragover', this.handleDragover)
      this.dropZoneEl.addEventListener('dragleave', this.handleDragleave)
      this.dropZoneEl.addEventListener('drop', this.handleDrop)
    }
  }

  private removeDragListeners = () => {
    if (this.dropZoneEl) {
      this.dropZoneEl.removeEventListener('dragenter', this.handleDragenter)
      this.dropZoneEl.removeEventListener('dragover', this.handleDragover)
      this.dropZoneEl.removeEventListener('dragleave', this.handleDragleave)
      this.dropZoneEl.removeEventListener('drop', this.handleDrop)
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
      validatedFiles.invalidFiles.forEach(file => this.dsRejectedFile.emit(file))
    }

    if (validatedFiles.validFiles.length > 0) {
      this.files = [...this.files, ...validatedFiles.validFiles]
      this.dsChange.emit(this.files)
      this.dsFilesAdded.emit(validatedFiles.validFiles)
    }

    this.updateFileInput()
  }

  private updateFileInput = () => {
    if (this.nativeInput) {
      this.nativeInput.files = toFileList(this.files)
    }
  }

  /**
   * HANDLERS
   * ------------------------------------------------------
   */

  private handleDragenter = (ev: Event) => {
    stopEventBubbling(ev)
    if (!this.disabled && !this.readonly && !this.loading) {
      this.isDragOver = true
    }
  }

  private handleDragover = (ev: Event) => {
    stopEventBubbling(ev)
  }

  private handleDragleave = (ev: Event) => {
    stopEventBubbling(ev)
    this.isDragOver = false
  }

  private handleDrop = (ev: DragEvent) => {
    stopEventBubbling(ev)
    this.isDragOver = false
    if (!this.disabled && !this.readonly && !this.loading) {
      const dataTransfer = ev.dataTransfer
      if (dataTransfer) {
        this.handleFiles(dataTransfer.files)
      }
    }
  }

  private handleInputChange = (): void => {
    if (!this.disabled && !this.readonly && !this.loading) {
      if (this.nativeInput?.files) {
        this.handleFiles(this.nativeInput.files)
      }
    }
  }

  private handleInputClick = (ev: MouseEvent) => {
    if (this.nativeInput && !this.disabled && !this.readonly && !this.loading) {
      this.nativeInput.value = ''
    }
    this.dsInputClick.emit(ev)
  }

  private handleInputFocus = (ev: FocusEvent) => {
    this.focused = true
    this.dsFocus.emit(ev)
  }

  private handleInputBlur = (ev: FocusEvent) => {
    this.focused = false
    this.dsBlur.emit(ev)
  }

  private handleRemoveFile = (ev: Event, index: number): void => {
    stopEventBubbling(ev)

    if (index >= 0 && index < this.files.length) {
      const files = this.files
      const removedFiles = files.splice(index, 1)
      this.dsFilesRemoved.emit(removedFiles)

      this.files = [...files]
      this.dsChange.emit(this.files)
      this.updateFileInput()
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const isDisabled = this.disabled || this.readonly || this.loading
    const dropZoneLabel = this.dropZoneLabel || i18nDsFileUpload[this.language].dropZoneLabel
    const selectedFilesLabel = i18nDsFileUpload[this.language].selectedFilesLabel
    const removeFileLabel = i18nDsFileUpload[this.language].removeFileLabel

    return (
      <Field
        color={this.color}
        disabled={this.disabled}
        invalid={this.invalid}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId={this.fileUploadId}
      >
        <div
          id="drop-zone"
          part="drop-zone"
          ref={el => (this.dropZoneEl = el)}
          class={{
            'file-upload-drop-zone': true,
            'is-dragover': this.isDragOver,
            'is-disabled': isDisabled,
          }}
          onClick={() => !isDisabled && this.nativeInput?.click()}
        >
          {/* Accessible live region for drag state */}
          <span id="drop-zone-status" role="status" aria-live="polite">
            {this.isDragOver ? 'Drop files here' : ''}
          </span>

          {/* Hidden file input */}
          <input
            part="input"
            ref={el => (this.nativeInput = el)}
            id={this.fileUploadId}
            type="file"
            name={this.name}
            multiple={this.multiple}
            disabled={isDisabled}
            required={this.required}
            accept={this.accept || undefined}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-describedby="description"
            onClick={this.handleInputClick}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            data-testid="ds-file-upload-input"
          />

          {/* Visual drop zone content */}
          <div id="drop-zone-content" class={{ 'is-disabled': isDisabled }}>
            <slot>
              <div id="drop-zone-placeholder" class={{ 'is-disabled': isDisabled }}>
                {!this.loading && <ds-icon name="upload" size="lg"></ds-icon>}
                {this.loading && <ds-spinner variation="circle"></ds-spinner>}
                <span>{dropZoneLabel}</span>
              </div>
            </slot>
          </div>
        </div>

        {/* File list */}
        {this.hasFileList && this.files.length > 0 && (
          <ul
            id="file-list"
            part="file-list"
            role="list"
            aria-label={selectedFilesLabel}
            class={{
              'file-list': true,
              'is-disabled': isDisabled,
            }}
          >
            {this.files.map((file, index) => (
              <li id={`file-list-item-${index}`} key={file.name} class="file-list-item">
                <ds-stack direction="row" align="center">
                  <ds-icon name="document" size="md"></ds-icon>
                  <ds-content space="none">
                    <span class="file-name" title={file.name}>
                      {file.name}
                    </span>
                    <span class="file-size">{formatFileSize(file.size)}</span>
                  </ds-content>
                  <ds-button
                    size="sm"
                    icon="trash"
                    square
                    color="secondary"
                    a11yLabel={`${removeFileLabel} ${file.name}`}
                    disabled={isDisabled}
                    onKeyDown={(ev: KeyboardEvent) => {
                      if (ev.key === 'Delete') {
                        this.handleRemoveFile(ev, index)
                      }
                    }}
                    onClick={(ev: MouseEvent) => this.handleRemoveFile(ev, index)}
                  ></ds-button>
                </ds-stack>
              </li>
            ))}
          </ul>
        )}
      </Field>
    )
  }
}

let FileUploadIds = 0
