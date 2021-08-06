/// <reference types="cypress" />
import 'cypress-file-upload';
import {Mixin} from './mixins';

export interface Attachable<T> {
  attachFile(fileLocation: string, attachmentMethod?: 'input' | 'drag-n-drop'): T;
}

export const AttachableMixin: Mixin = ({selector, creator}) => ({
  attachFile: (fileLocation: string, attachmentMethod = 'drag-n-drop') => {
    cy.get(selector).attachFile(fileLocation, {subjectType: attachmentMethod ? 'input' : 'drag-n-drop', force: true});
    return creator();
  }
});
