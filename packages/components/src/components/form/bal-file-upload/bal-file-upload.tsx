import { Component, Host, h, Prop, Element, Listen, State, Event, EventEmitter, Method, Watch } from '@stencil/core'
import fileSize from 'filesize.js'
import { areArraysEqual } from '@baloise/web-app-utils'
import { FileUploadRejectedFile, FileUploadRejectionReason } from './bal-file-upload.type'
import {
  FormInput,
  inputHandleBlur,
  inputHandleFocus,
  inputHandleHostClick,
  inputSetBlur,
  inputSetFocus,
  stopEventBubbling,
} from '../../../helpers/form-input.helpers'

@Component({
  tag: 'bal-file-upload',
})
export class FileUpload implements FormInput<File[]> {
  @Element() el!: HTMLElement

  private uploadId = `bal-upload-${UploadIds++}`

  nativeInput!: HTMLInputElement
  bundleSize = 0
  inputValue?: File[] | undefined

  @State() isOver = false
  @State() files: File[] = []
  @State() hasFocus = false

  @Watch('value')
  onValueChange() {
    if (!areArraysEqual(this.files, this.value)) {
      this.files = this.value
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.uploadId

  /**
   * Label of the drop area.
   */
  @Prop() label = 'Choose or drop a file...'

  /**
   * If `true` multiple file upload is possible.
   */
  @Prop() multiple = true

  /**
   * If `true` below the drop-down area it generates a file list.
   */
  @Prop() hasFileList = true

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * Accepted MIME-Types like `image/png,image/jpeg`.
   */
  @Prop() accept = ''

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
   * Input value.
   */
  @Prop() value: File[] = []

  /**
   * If `true` the file upload is disabled and shows a spinner
   */
  @Prop() loading = false

  /**
   * Overrides the default subtitle file size
   */
  @Prop() subTitle?: (file: File) => string

  /**
   * Triggers when a file is added or removed.
   */
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<File[]>

  /**
   * Triggers when a file is added.
   */
  @Event({ eventName: 'balFilesAdded' }) balFilesAddedEmitter!: EventEmitter<File[]>

  /**
   * Triggers when a file is removed.
   */
  @Event({ eventName: 'balFilesRemoved' })
  balFilesRemovedEmitter!: EventEmitter<File[]>

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
   * Triggers when a file is rejected due to not allowed MIME-Type and so on.
   */
  @Event({ eventName: 'balRejectedFile' })
  balRejectedFileEventEmitter!: EventEmitter<FileUploadRejectedFile>

  @Listen('dragenter', { capture: false, passive: false })
  dragenterHandler() {
    if (!this.disabled && !this.readonly) {
      this.isOver = true
    }
  }

  @Listen('dragover', { capture: false, passive: false })
  dragoverHandler() {
    if (!this.disabled && !this.readonly) {
      this.isOver = true
    }
  }

  @Listen('dragleave', { capture: false, passive: false })
  dragleaveHandler() {
    if (!this.disabled && !this.readonly) {
      this.isOver = false
    }
  }

  @Listen('drop', { capture: false, passive: false })
  dropHandler(event: DragEvent) {
    if (!this.disabled && !this.readonly) {
      this.isOver = false
      const dataTransfer = event.dataTransfer
      if (dataTransfer) {
        this.handleFiles(dataTransfer.files)
      }
    }
  }

  handleFiles = (files: FileList): void => {
    if (!this.disabled) {
      const list = [...this.files]
      const filesAdded: File[] = []
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index)
        if (file) {
          const rejectReasons = []

          if (this.accept && this.accept.split(' ').join('').split(',').indexOf(file.type) === -1) {
            rejectReasons.push(FileUploadRejectionReason.BAD_EXTENSION)
          }

          if (this.maxFileSize && file.size > this.maxFileSize) {
            rejectReasons.push(FileUploadRejectionReason.FILE_TOO_BIG)
          }

          const transactionFileSizeSum = this.files.map(f => f.size).reduce((a, b) => a + b, 0)
          const bundleSize = file.size + transactionFileSizeSum
          if (this.maxBundleSize && bundleSize > this.maxBundleSize) {
            rejectReasons.push(FileUploadRejectionReason.FILE_SIZE_SUM_TOO_BIG)
          }

          if (this.maxFiles && list.length + 1 > this.maxFiles) {
            rejectReasons.push(FileUploadRejectionReason.TOO_MANY_FILES)
          }

          const duplicatedFiles = list.filter(f => f.size === file.size && f.name === file.name && f.type === file.type)
          if (duplicatedFiles.length > 0) {
            rejectReasons.push(FileUploadRejectionReason.DUPLICATED_FILE)
          }

          if (rejectReasons.length > 0) {
            this.balRejectedFileEventEmitter.emit({
              file: file,
              reasons: rejectReasons,
            })
          } else {
            list.push(file)
            filesAdded.push(file)
          }
        }
      }
      if (this.files.length !== list.length) {
        this.files = [...list]
        this.balChange.emit(this.files)
      }
      if (filesAdded.length > 0) {
        this.balFilesAddedEmitter.emit(filesAdded)
      }

      this.setFileList()
    }
  }

  componentWillLoad() {
    this.onValueChange()
  }

  componentDidLoad() {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.el.addEventListener(eventName, stopEventBubbling, {
        passive: false,
      })
      document.body.addEventListener(eventName, stopEventBubbling, {
        passive: false,
      })
    })
  }

  disconnectedCallback() {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.el.removeEventListener(eventName, stopEventBubbling, false)
      document.body.removeEventListener(eventName, stopEventBubbling, false)
    })
  }

  /**
   * Sets the file list to an empty list
   */
  @Method()
  async clear(): Promise<void> {
    this.files = []
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
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput)
  }

  private removeFile(indexToRemove: number): void {
    if (!this.disabled && !this.readonly) {
      const list = []
      const removedFiles = []
      for (let index = 0; index < this.files.length; index++) {
        if (index !== indexToRemove) {
          list.push(this.files[index])
        } else {
          removedFiles.push(this.files[index])
        }
      }
      this.files = [...list]
      this.balChange.emit(this.files)
      this.balFilesRemovedEmitter.emit(removedFiles)
      this.setFileList()
    }
  }

  private onInputChange = (): void => {
    if (this.nativeInput?.files) {
      const files = this.nativeInput.files
      this.handleFiles(files)
    }
  }

  private setFileList = () => {
    const fileList = new DataTransfer()
    this.files.forEach(el => fileList.items.add(el))
    this.nativeInput.files = fileList.files
  }

  private onInputFocus = (event: FocusEvent) => inputHandleFocus(this, event)

  private onInputBlur = (event: FocusEvent) => inputHandleBlur(this, event)

  private handleClick = (event: MouseEvent) => inputHandleHostClick(this, event)

  private onInputClick = (event: MouseEvent) => {
    this.balClick.emit(event)
  }

  render() {
    const FileList = () => (
      <bal-card flat class="mt-4" style={{ display: this.files.length ? 'block' : 'none' }}>
        <bal-list disabled={this.disabled || this.loading || this.readonly} border size="large" class="p-0">
          {this.files.map((file, index) => (
            <bal-list-item disabled={this.disabled || this.loading || this.readonly}>
              <bal-list-item-icon>
                <bal-icon name="document"></bal-icon>
              </bal-list-item-icon>
              <bal-list-item-content>
                <bal-list-item-title>{file.name}</bal-list-item-title>
                <bal-list-item-subtitle>
                  {this.subTitle ? this.subTitle(file) : fileSize(file.size)}
                </bal-list-item-subtitle>
              </bal-list-item-content>
              <bal-list-item-icon
                right
                class={{
                  'file-remove': true,
                  'is-clickable': !this.disabled && !this.readonly,
                }}
                onClick={() => this.removeFile(index)}
              >
                <bal-icon
                  name="trash"
                  color={this.disabled || this.loading || this.readonly ? 'grey' : 'danger'}
                ></bal-icon>
              </bal-list-item-icon>
            </bal-list-item>
          ))}
        </bal-list>
      </bal-card>
    )

    return (
      <Host
        onClick={this.handleClick}
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
          <label class={['file-label', this.disabled || this.loading || this.readonly ? 'is-disabled' : ''].join(' ')}>
            <input
              class="file-input"
              type="file"
              name={this.name}
              multiple={this.multiple}
              disabled={this.disabled || this.loading}
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
        {this.hasFileList ? <FileList /> : ''}
      </Host>
    )
  }
}

let UploadIds = 0
