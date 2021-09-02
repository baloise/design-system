/// <reference types="cypress" />
import 'cypress-file-upload'
import { Mixin } from './mixins'

export interface Attachable<T> {
  /**
   * Upload file.
   */
  attachFile(fileLocation: string, attachmentMethod?: 'input' | 'drag-n-drop'): T
}

export const AttachableMixin: Mixin = ({ element, creator }) => ({
  attachFile: (fileLocation: string, attachmentMethod = 'drag-n-drop') => {
    element().attachFile(fileLocation, { subjectType: attachmentMethod ? 'input' : 'drag-n-drop', force: true })
    return creator()
  },
})
