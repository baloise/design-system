/// <reference types="cypress" />

export class BasicLoginPage {
  /**
   * Override keykloack login
   */
  loginToKeycloak(username: string, password: string, redirectUri?: string) {
    const baseUrl = Cypress.config('baseUrl')
    const authBaseUrl = Cypress.env('auth_base_url') as string
    const authRealm = Cypress.env('auth_realm') as string
    const authClientId = Cypress.env('auth_client_id') as string

    cy.request({
      url: `${authBaseUrl}/realms/${authRealm}/protocol/openid-connect/auth`,
      failOnStatusCode: false,
      qs: {
        scope: 'openid,profile,email',
        response_type: 'code',
        redirect_uri: redirectUri ? redirectUri : baseUrl,
        client_id: authClientId,
        code_challenge_method: 'S256',
        code_challenge: 'svx9Tfc44myPS1V8AgQb5OS5mAjMoVTOaWeQlufliIw',
      },
    }).then(response => {
      const body = response.body as string
      const matches = new RegExp('ACTION="(.*?)"', 'i').exec(body)
      if (matches) {
        cy.request({
          method: 'POST',
          url: matches[1].replace(/&amp;/g, '&'),
          followRedirect: false,
          form: true,
          body: { username, password },
        })
      }
    })
    cy.reload()
  }
}
