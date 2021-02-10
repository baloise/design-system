import { Component, Host, h, Prop, Element, Listen, State, Event, EventEmitter } from '@stencil/core'
import filesize from 'filesize.js'
import { FileUploadRejectedFile, FileUploadRejectionReason } from './bal-file-upload.type'

@Component({
  tag: 'bal-file-upload',
  styleUrl: 'bal-file-upload.scss',
  scoped: true,
  shadow: false,
})
export class FileUpload {
  @Element() element!: HTMLElement
  fileInput!: HTMLInputElement
  bundleSize: number = 0

  @State() isOver = false
  @State() files: File[] = []

  /**
   * Label of the drop area.
   */
  @Prop() label: string = 'Choose or drop a file...'

  /**
   * If `true` multiple file upload is possible.
   */
  @Prop() multiple = true

  /**
   * If `true` the button is disabled
   */
  @Prop() disabled: boolean

  /**
   * Accepted MIME-Types like `image/png,image/jpeg`.
   */
  @Prop() accept: string = ''

  /**
   * Allowed number of files in the bundle.
   */
  @Prop() maxFiles: number = undefined

  /**
   * Allowed max file size in bytes.
   */
  @Prop() maxFileSize: number = undefined

  /**
   * Allowed max bundle size in bytes.
   */
  @Prop() maxBundleSize: number = undefined

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
      if (event.dataTransfer) {
        this.handleFiles(dataTransfer.files)
      }
    }
  }

  handleFiles(files: FileList): void {
    if (!this.disabled) {
      const list = [...this.files]
      for (let index = 0; index < files.length; index++) {
        const file = files.item(index)
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
      this.files = [...list]
      this.balChangeEventEmitter.emit(this.files)
    }
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

  render() {
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
              onChange={() => this.handleFiles(this.fileInput.files)}
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
        <bal-list disabled border>
          {this.files.map((file, index) => (
            <bal-list-item>
              <bal-list-item-icon>
                <bal-icon name="document"></bal-icon>
              </bal-list-item-icon>
              <bal-list-item-content>
                <bal-list-item-title>{file.name}</bal-list-item-title>
                <bal-list-item-subtitle>{filesize(file.size)}</bal-list-item-subtitle>
              </bal-list-item-content>
              <bal-list-item-icon right class="file-remove" onClick={() => this.removeFile(index)}>
                <bal-icon name="trash" color="danger" size="small"></bal-icon>
              </bal-list-item-icon>
            </bal-list-item>
          ))}
        </bal-list>
      </Host>
    )
  }
}
