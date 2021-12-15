import { Component, Host, h, Prop, Element, Listen, State, Event, EventEmitter, Method, Watch } from '@stencil/core'
import filesize from 'filesize.js'
import { areArraysEqual } from '@baloise/web-app-utils'
import { FileUploadRejectedFile, FileUploadRejectionReason } from './bal-file-upload.type'

@Component({
  tag: 'bal-file-upload',
})
export class FileUpload {
  @Element() element!: HTMLElement
  fileInput!: HTMLInputElement
  bundleSize: number = 0

  @State() isOver = false
  @State() files: File[] = []

  @Watch('value')
  onValueChange() {
    if (!areArraysEqual(this.files, this.value)) {
      this.files = this.value
    }
  }

  /**
   * Label of the drop area.
   */
  @Prop() label: string = 'Choose or drop a file...'

  /**
   * If `true` multiple file upload is possible.
   */
  @Prop() multiple = true

  /**
   * If `true` below the drop-down area it generates a file list.
   */
  @Prop() hasFileList = true

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled = false

  /**
   * Accepted MIME-Types like `image/png,image/jpeg`.
   */
  @Prop() accept: string = ''

  /**
   * Allowed number of files in the bundle.
   */
  @Prop() maxFiles: number | undefined = undefined

  /**
   * Allowed max file size in bytes.
   */
  @Prop() maxFileSize: number | undefined = undefined

  /**
   * Allowed max bundle size in bytes.
   */
  @Prop() maxBundleSize: number | undefined = undefined

  /**
   * Input value.
   */
  @Prop() value: File[] = []

  /**
   * Overrides the default subtitle filesize
   */
  @Prop() subTitle: ((file: File) => string) | undefined

  /**
   * Triggers when a file is added or removed.
   */
  @Event({ eventName: 'balChange' }) balChangeEventEmitter!: EventEmitter<File[]>

  /**
   * Triggers when a file is rejected due to not allowed MIME-Type and so on.
   */
  @Event({ eventName: 'balRejectedFile' }) balRejectedFileEventEmitter!: EventEmitter<FileUploadRejectedFile>

  @Listen('dragenter', { capture: false })
  dragenterHandler() {
    if (!this.disabled) {
      this.isOver = true
    }
  }

  @Listen('dragover', { capture: false })
  dragoverHandler() {
    if (!this.disabled) {
      this.isOver = true
    }
  }

  @Listen('dragleave', { capture: false })
  dragleaveHandler() {
    if (!this.disabled) {
      this.isOver = false
    }
  }

  @Listen('drop', { capture: false })
  dropHandler(event: DragEvent) {
    if (!this.disabled) {
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
          }
        }
      }
      if (this.files.length !== list.length) {
        this.files = [...list]
        this.balChangeEventEmitter.emit(this.files)
      }
    }
  }

  componentWillLoad() {
    this.onValueChange()
  }

  componentDidLoad() {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.element.addEventListener(eventName, this.preventDefaults, false)
      document.body.addEventListener(eventName, this.preventDefaults, false)
    })
  }

  disconnectedCallback() {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.element.removeEventListener(eventName, this.preventDefaults, false)
      document.body.removeEventListener(eventName, this.preventDefaults, false)
    })
  }

  /**
   * Sets the file list to an empty list
   */
  @Method()
  async clear(): Promise<void> {
    this.files = []
  }

  preventDefaults(e: Event) {
    e.preventDefault()
    e.stopPropagation()
  }

  removeFile(indexToRemove: number): void {
    if (!this.disabled) {
      const list = []
      for (let index = 0; index < this.files.length; index++) {
        if (index !== indexToRemove) {
          list.push(this.files[index])
        }
      }
      this.files = [...list]
      this.balChangeEventEmitter.emit(this.files)
    }
  }

  onChange = (): void => {
    if (this.fileInput?.files) {
      const files = this.fileInput.files
      this.handleFiles(files)
      this.fileInput.value = ''
    }
  }

  render() {
    const FileList = () => (
      <bal-list disabled border>
        {this.files.map((file, index) => (
          <bal-list-item>
            <bal-list-item-icon>
              <bal-icon name="document"></bal-icon>
            </bal-list-item-icon>
            <bal-list-item-content>
              <bal-list-item-title>{file.name}</bal-list-item-title>
              <bal-list-item-subtitle>{this.subTitle ? this.subTitle(file) : filesize(file.size)}</bal-list-item-subtitle>
            </bal-list-item-content>
            <bal-list-item-icon right class="file-remove" onClick={() => this.removeFile(index)}>
              <bal-icon name="trash" color="danger"></bal-icon>
            </bal-list-item-icon>
          </bal-list-item>
        ))}
      </bal-list>
    )

    return (
      <Host class={['bal-file-upload', this.disabled ? 'is-disabled' : ''].join(' ')}>
        <div class="file">
          <label class={['file-label', this.isOver ? 'is-hovered' : '', this.disabled ? 'is-disabled' : ''].join(' ')}>
            <input
              class="file-input"
              type="file"
              name="resume"
              multiple={this.multiple}
              disabled={this.disabled}
              accept={this.accept}
              onChange={this.onChange}
              ref={el => (this.fileInput = el as HTMLInputElement)}
            />
            <span class="file-cta">
              <span class="file-icon">
                <bal-icon name="upload" size="medium"></bal-icon>
              </span>
              <span class="file-label">{this.label}</span>
            </span>
          </label>
        </div>
        {this.hasFileList ? <FileList /> : ''}
      </Host>
    )
  }
}
