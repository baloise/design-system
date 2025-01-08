import { Components, newBalTabOption } from '../support/utils'

describe('bal-tabs', () => {
  it('should fire change event with options', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalTabs, HTMLBalTabsElementEventMap>(`<bal-tabs></bal-tabs>`, {
      props: {
        value: 'tab-b',
        border: true,
        fullwidth: true,
        options: [
          newBalTabOption({ label: 'Tab A', value: 'tab-a' }),
          newBalTabOption({ label: 'Tab B', value: 'tab-b' }),
          newBalTabOption({ label: 'Tab C', value: 'tab-c' }),
        ],
      },
      events: {
        balChange: onBalChangeSpy,
      },
    })
    cy.get('.bal-tabs').find('.bal-tabs__nav__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
  })

  it('should fire change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalTabs, HTMLBalTabsElementEventMap>(
      `
    <bal-tabs>
      <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
      <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
      <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
      <bal-tab-item value="tab-d" label="Tab D" invisible>Hidden Content of Tab D</bal-tab-item>
      <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
      <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank"
        >Content of Tab link</bal-tab-item
      >
    </bal-tabs>`,
      {
        props: {
          value: 'tab-b',
          border: true,
          fullwidth: true,
        },
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )
    cy.get('.bal-tabs').find('.bal-tabs__nav__item').eq(0).click()

    cy.get('@balChange').should('have.been.calledOnce')
    cy.get('@balChange').shouldHaveEventDetail('tab-a')
  })

  it('hidden item should not be visible', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalTabs, HTMLBalTabsElementEventMap>(
      `
    <bal-tabs>
      <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
      <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
      <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
      <bal-tab-item value="tab-d" label="Tab D" invisible>Hidden Content of Tab D</bal-tab-item>
      <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
      <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank"
        >Content of Tab link</bal-tab-item
      >
    </bal-tabs>`,
      {
        props: {
          value: 'tab-b',
          border: true,
          fullwidth: true,
        },
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )
    cy.get('.bal-tabs').find('.bal-tabs__nav__item').should('have.length', 5)
  })

  it('disabled item should not send a change event', () => {
    const onBalChangeSpy = cy.spy().as('balChange')

    cy.mount<Components.BalTabs, HTMLBalTabsElementEventMap>(
      `
    <bal-tabs>
      <bal-tab-item value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
      <bal-tab-item value="tab-b" label="Tab B">Content of Tab B</bal-tab-item>
      <bal-tab-item bubble value="tab-c" label="Tab C">Content of Tab C</bal-tab-item>
      <bal-tab-item value="tab-d" label="Tab D" invisible>Hidden Content of Tab D</bal-tab-item>
      <bal-tab-item value="tab-e" label="Tab E" disabled>Content of Tab E</bal-tab-item>
      <bal-tab-item value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank"
        >Content of Tab link</bal-tab-item
      >
    </bal-tabs>`,
      {
        props: {
          value: 'tab-b',
          border: true,
          fullwidth: true,
        },
        events: {
          balChange: onBalChangeSpy,
        },
      },
    )
    cy.get('.bal-tabs').find('.bal-tab-item').eq(4).spyEvent('balNavigate')

    cy.get('.bal-tabs').find('.bal-tabs__nav__item').eq(3).click()
    cy.get('@balChange').should('not.have.been.called')
    cy.get('@balNavigate').should('not.have.been.called')
  })
})
