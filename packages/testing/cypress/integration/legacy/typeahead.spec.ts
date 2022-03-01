import { app } from '../../support/legacy/app'

describe('Legacy - Typeahead', () => {
  const page = app.getSelectPage()

  it('should select and assert values', () => {
    page.open()
    page.typeahead.get().assertValue('Captain America')
    page.typeahead.get().contains('Captain America')
    page.typeahead.get().assertOptions('CaptainAmerica')
    page.typeahead.get().clear()
    page.typeahead.get().type('Black').select(1)
    page.typeahead.get().assertValue('Black Panter')
  })
})
