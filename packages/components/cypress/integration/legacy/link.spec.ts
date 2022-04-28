import { Target } from '../../../../testing/src/legacy'
import { app } from '../../support/legacy/app'

describe('Link', () => {
  const page = app.getLinkPage()

  it('should contain label', () => {
    page.open()
    page.link.get().contains('Link')
    page.linkButton.get().contains('GitHub')
  })

  it('should have targe blank', () => {
    page.open()
    page.link.get().assertLinkWithoutTarget()
    page.linkButton.get().assertLinkOpeningTarget(Target.newTab)
  })

  it('should have href', () => {
    page.open()
    page.link.get().assertHrefEquals('https://design.baloise.dev/')
    page.linkButton.get().assertHrefEquals('https://github.com/baloise/design-system-components')
  })
})
