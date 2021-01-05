/// <reference types="cypress" />

import {Mixin} from './mixins';

export interface Attributable<T> {
    assertAttributeEquals(attribute: string, value: string): T;

    assertAttributeInclude(attribute: string, value: string): T;

}

export const AttributableMixin: Mixin = ({selector, creator}) => ({
    assertAttributeEquals: (attribute: string, value: string) => {
        cy.get(selector).should('have.attr', attribute).and('eq', value);
        return creator();
    },
    assertAttributeInclude: (attribute: string, value: string) => {
        cy.get(selector).should('have.attr', attribute).and('include', value);
        return creator();
    }
});
