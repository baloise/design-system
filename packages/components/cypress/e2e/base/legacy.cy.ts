import {
  AccordionAccessor,
  ButtonAccessor,
  byTestId,
  CheckboxAccessor,
  DatePickerAccessor,
  DropDownAccessor,
  IconAccessor,
  InputAccessor,
  LinkAccessor,
  ListAccessor,
  MultiSelectButtonAccessor,
  SelectButtonAccessor,
  TabsAccessor,
  Target,
  TileAccessor,
  ToastAccessor,
  TooltipAccessor,
  TypeaheadAccessor,
} from '../../../../testing/src'

describe('Legacy', () => {
  describe('Url', () => {
    before(() => cy.page('/components/bal-button/test/bal-button.cy.html'))

    it('should include url', () => {
      cy.url().should('include', '/components/bal-button') // => true
    })
  })

  describe('Accordion', () => {
    before(() => cy.page('/components/bal-accordion/test/bal-accordion.cy.html'))

    const accordion = AccordionAccessor(byTestId('accordion'))

    it('should check the AccordionAccessor', () => {
      accordion.get().contains('Show more')
      accordion.get().assertBodyNotExists()

      accordion.get().click({ multiple: true })
      accordion.get().contains('Show less')
      accordion.get().assertBodyExists()

      accordion.get().click({ multiple: true })
    })
  })

  describe('Button', () => {
    before(() => cy.page('/components/bal-button/test/bal-button.cy.html'))

    const primaryButton = ButtonAccessor(byTestId('primary-button'))
    const primaryButtonDisabled = ButtonAccessor(byTestId('primary-button-disabled'))

    it('should navigate to Button page and test enabled Button on the page', () => {
      primaryButton.get().contains('Primary')
      primaryButton.get().click()
      primaryButton.get().assertIsDisabled(false)
      primaryButton.get().assertExists()
    })

    it('should navigate to Button page and test disabled Button on the page', () => {
      primaryButtonDisabled.get().contains('Disabled')
      primaryButtonDisabled.get().assertIsDisabled()
      primaryButtonDisabled.get().assertExists()
    })

    const link = LinkAccessor(byTestId('link'))
    const linkButton = LinkAccessor(byTestId('button-link'))

    it('should contain label', () => {
      link.get().contains('Link')
      linkButton.get().contains('GitHub')
    })

    it('should have targe blank', () => {
      link.get().assertLinkWithoutTarget()
      linkButton.get().assertLinkOpeningTarget(Target.newTab)
    })

    it('should have href', () => {
      link.get().assertHrefEquals('https://design.baloise.dev/')
      linkButton.get().assertHrefEquals('https://github.com/baloise/design-system-components')
    })
  })

  describe('Checkbox', () => {
    before(() => cy.page('/components/form/bal-checkbox/test/bal-checkbox.cy.html'))

    const normalCheckboxElement = CheckboxAccessor(byTestId('checkbox-normal'))
    const multiSelect = MultiSelectButtonAccessor(byTestId('multi-select'))

    it('Can be checked and unchecked', () => {
      normalCheckboxElement.get().assertIsChecked(false)
      normalCheckboxElement.get().click()
      normalCheckboxElement.get().assertIsChecked()
      normalCheckboxElement.get().contains('Label')
    })

    it('should contain label', () => {
      multiSelect.get().select(1)
      multiSelect.get().assertIsSelected(1)
    })
  })

  describe('Datepicker', () => {
    before(() => cy.page('/components/form/bal-datepicker/test/bal-datepicker.cy.html'))

    const now = () => new Date()

    it('should be able to use the legacy accessors', () => {
      const accessor = DatePickerAccessor(byTestId('basic'))
      accessor.get().open()
      cy.getByTestId('basic').balDatepickerIsOpen().balDatepickerToggle()
      accessor.get().pick(now()).shouldHaveValue(new Date())
      cy.getByTestId('basic').clear().type('{enter}')
      accessor.get().write('12.12.2020')
      cy.getByTestId('basic').should('have.value', '12.12.2020')
    })
  })

  describe('DropDown', () => {
    before(() => cy.page('/components/form/bal-select/test/bal-select.cy.html'))

    const dropdown = DropDownAccessor(byTestId('select'))
    const typeahead = TypeaheadAccessor(byTestId('typeahead'))

    it('should navigate to Select page and assert values in Select', () => {
      dropdown.get().assertOptions('v1995', 'v1996', 'v1997', 'v1998', 'v1999', 'v2000')
    })

    it('should navigate to Select page and check if input contains value 1995', () => {
      dropdown.get().click()
      dropdown.get().select(0)
      dropdown.get().contains(1995)
    })

    it('should select and assert values', () => {
      typeahead.get().clear()
      typeahead.get().type('Black').select(1)
      typeahead.get().assertValue('Black Panter')
      typeahead.get().contains('Black Panter')
      typeahead.get().assertOptions('BlackPanter')
    })
  })

  describe('Icon', () => {
    before(() => cy.page('/components/bal-icon/test/bal-icon.cy.html'))

    const icon = IconAccessor(byTestId('icon'))

    it('should have src', () => {
      icon.get().assertIcon('info-circle')
    })
  })

  describe('Input', () => {
    before(() => cy.page('/components/form/bal-input/test/bal-input.cy.html'))

    const input = InputAccessor(byTestId('basic'))

    it('should navigate to Input page and check the value in Input field', () => {
      input.get().assertValue('')
    })
  })

  describe('Pagination', () => {
    before(() => cy.page('/components/bal-pagination/test/bal-pagination.cy.html'))

    const list = ListAccessor(byTestId('pagination'))

    it('should contain label', () => {
      list.get().assertIsSelected(2)
      list.get().select(3)
      list.get().assertIsSelected(4)
    })
  })

  describe('Radio', () => {
    before(() => cy.page('/components/form/bal-radio/test/bal-radio.cy.html'))

    const selectButton = SelectButtonAccessor(byTestId('select-button'))

    it('should select', () => {
      selectButton.get().select(1)
    })
  })

  describe('Tabs', () => {
    before(() => cy.page('/components/bal-tabs/test/bal-tabs.cy.html'))

    const tabs = TabsAccessor(byTestId('tabs'))

    it('should navigate to Tabs page and select Tab B on first Tab component on the page', () => {
      tabs.get().select(2)
    })

    it('should navigate to Tabs page and assert if name of the first Tab component on the page is Tab A', () => {
      tabs.get().assertVisible('Tab A')
    })
  })

  describe('Tile', () => {
    before(() => cy.page('/components/bal-card/test/bal-card.cy.html'))

    const tile = TileAccessor(byTestId('card'))

    it('should navigate to Select page and assert values in Select', () => {
      tile.get().containsTileContent('My title')
    })
  })

  describe('Toast', () => {
    before(() => cy.page('/components/notice/bal-toast/test/bal-toast.cy.html'))

    const toast = ToastAccessor(byTestId('toast'))

    it('should navigate to Toast page and open Toast', () => {
      toast.get().click({ multiple: true })
      toast.get().assertToast('Hi I am a default Toast! Hi I am a default Toast!')
    })
  })

  describe('Tooltip', () => {
    before(() => cy.page('/components/bal-hint/test/bal-hint.cy.html'))

    const tooltip = TooltipAccessor(byTestId('hint'))

    it('should ', () => {
      tooltip.get().hover().contains('Spider-Man')
    })
  })
})
