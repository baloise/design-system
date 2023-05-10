import { FunctionalComponent, h } from '@stencil/core'
import fileSize from 'filesize.js'
import { BEM } from '../../../../utils-new/bem'

const bemListEl = BEM.block('file-upload').element('list')

export interface FileListComponentProps {
  files: File[]
  disabled: boolean
  subTitle?: (file: File) => string
  onRemoveFile: (event: Event, index: number) => void
}

export const FileListComponent: FunctionalComponent<FileListComponentProps> = ({
  files,
  disabled,
  subTitle,
  onRemoveFile,
}) => {
  return (
    <bal-card class={{ ...bemListEl.class() }} flat>
      <bal-list disabled={disabled} border size="large">
        {files.map((file, index) => (
          <bal-list-item disabled={disabled}>
            <bal-list-item-icon>
              <bal-icon name="document"></bal-icon>
            </bal-list-item-icon>
            <bal-list-item-content>
              <bal-list-item-title>{file.name}</bal-list-item-title>
              <bal-list-item-subtitle>{subTitle ? subTitle(file) : fileSize(file.size)}</bal-list-item-subtitle>
            </bal-list-item-content>
            <bal-list-item-icon
              right
              class={{
                'file-remove': true,
                'is-clickable': !disabled,
              }}
              onClick={event => onRemoveFile(event, index)}
            >
              <bal-icon name="trash" color={disabled ? 'grey' : 'danger'}></bal-icon>
            </bal-list-item-icon>
          </bal-list-item>
        ))}
      </bal-list>
    </bal-card>
  )
}
