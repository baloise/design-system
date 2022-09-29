Cypress.Commands.add<any>('platform', platform => {
  Cypress.log({
    name: 'platform',
    displayName: 'platform',
    message: platform,
  })

  switch (platform) {
    case 'mobile':
      return cy.viewport(375, 667, { log: false })

    case 'tablet':
      return cy.viewport(769, 1024, { log: false })

    case 'desktop':
      return cy.viewport(1024, 1280, { log: false })

    case 'highDefinition':
      return cy.viewport(1280, 1440, { log: false })

    case 'widescreen':
      return cy.viewport(1440, 1920, { log: false })

    case 'fullhd':
      return cy.viewport(1920, 1920, { log: false })
  }
  return cy.viewport(1024, 1280, { log: false })
})
