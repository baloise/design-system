import {Mixin} from './mixins';

export interface Andable<T> {
  and(chainers: string, method?: string, value?: string): T;
}

export const AndableMixin: Mixin = ({selector, creator}) => ({
  and: function (chainers: string, method?: string, value?: string) {
    switch (arguments.length) {
      case 2:
        cy.get(selector).and(chainers, value);
        break;
      case 3:
        cy.get(selector).and(chainers, method, value);
        break;
      default:
        cy.get(selector).and(chainers);
        break;
    }
    return creator();
  }
});
