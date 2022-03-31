import { app } from '../../support/app'

describe('Button', () => {
  before(done => app.getButtonPage().open(done))

  it('should have no diff', () => cy.compareSnapshot('button', 0.0))
})
