import { waitAfterFramePaint } from '../helpers'

Cypress.Commands.add<any>('platform', platform => {
  Cypress.log({
    name: 'platform',
    displayName: 'platform',
    message: platform,
  })

  switch (platform) {
    case 'mobile':
      return cy.viewport(375, 667, { log: false }).then(() => waitAfterFramePaint())

    case 'tablet':
      return cy.viewport(769, 1024, { log: false }).then(() => waitAfterFramePaint())

    case 'desktop':
      return cy.viewport(1024, 1280, { log: false }).then(() => waitAfterFramePaint())

    case 'highDefinition':
      return cy.viewport(1280, 1440, { log: false }).then(() => waitAfterFramePaint())

    case 'widescreen':
      return cy.viewport(1440, 1920, { log: false }).then(() => waitAfterFramePaint())

    case 'fullhd':
      return cy.viewport(1920, 1920, { log: false }).then(() => waitAfterFramePaint())
  }
  return cy.viewport(1024, 1280, { log: false }).then(() => waitAfterFramePaint())
})
