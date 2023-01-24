import { Component, Host, h, Element, State, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { stopEventBubbling } from '../../../utils/form-input'
import { toFileArray, toFileList } from './utils/file-list.util'

@Component({
  tag: 'bal-file-upload',
  styleUrls: {
    css: 'bal-file-upload.sass',
  },
})
export class FileUpload {
  @Element() el!: HTMLElement

  private inputEl: HTMLInputElement | undefined
  private labelEl: HTMLLabelElement | undefined

  private fileUploadId = `bal-file-upload-${FileUploadIds++}`

  @State() files: File[] = []

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.fileUploadId

  //   dropbox = document.getElementById("dropbox");
  // dropbox.addEventListener("dragenter", dragenter, false);
  // dropbox.addEventListener("dragover", dragover, false);
  // dropbox.addEventListener("drop", drop, false);

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.addEventListenerDragAndDrop()
  }

  componentDidLoad() {
    this.addEventListenerDragAndDrop()
  }

  disconnectedCallback() {
    this.removeEventListenerDragAndDrop()
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

    const dt = event.dataTransfer
    if (dt) {
      const files = dt.files

      this.handleFiles(files)
    }
  }

  private handleFiles = (fileList: FileList) => {
    const files = toFileArray(fileList)

    this.files = [...this.files, ...files]

    const newFileList = toFileList(this.files)
    console.log('-> fileList', fileList)
    console.log('-> newFileList', newFileList)

    // 1. Validate incoming files @mladenplaninicic
    // 2. Merger with state @mladenplaninicic
    // 3. Create FileListComponent @hirsch88
    // 4. Styling
    // 5. Add missing props and methods

    if (this.inputEl?.files) {
      this.inputEl.files = fileList
    }
  }

  private onInputChange = (): void => {
    if (this.inputEl?.files) {
      const files = this.inputEl.files
      this.handleFiles(files)
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('file-upload')
    const bemInputEl = block.element('input')
    const bemLabelEl = block.element('label')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <input
          class={{ ...bemInputEl.class() }}
          type="file"
          id={this.fileUploadId}
          name={this.name}
          multiple
          accept="image/*"
          onChange={this.onInputChange}
          ref={inputEl => (this.inputEl = inputEl)}
        />
        <label class={{ ...bemLabelEl.class() }} htmlFor={this.fileUploadId} ref={labelEl => (this.labelEl = labelEl)}>
          Select some files
        </label>
        List of Files
      </Host>
    )
  }
}

let FileUploadIds = 0
