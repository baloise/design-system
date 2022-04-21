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
      return cy.viewport(820, 1180, { log: false })
  }
  return cy.viewport(1024, 600, { log: false })
})
