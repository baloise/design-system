import { app } from '../../support/legacy/app'

describe('Legacy - Typeahead', () => {
  const page = app.getSelectPage()

  it('should select and assert values', () => {
    page.open()
    page.typeahead.get().clear()
    page.typeahead.get().type('Black').select(1)
    page.typeahead.get().assertValue('Black Panter')
    page.typeahead.get().contains('Black Panter')
    page.typeahead.get().assertOptions('BlackPanter')
  })
})
