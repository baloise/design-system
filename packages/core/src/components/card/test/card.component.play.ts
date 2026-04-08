import {
  DsCard,
  DsCardActions,
  DsCardContent,
  DsCardHeader,
  DsCardSubtitle,
  DsCardTitle,
  test,
} from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-card with default slot', async ({ page }) => {
    await page.mount(`
      <bal-card>Card content</bal-card>
    `)

    const dsCard = new DsCard(page.locator('bal-card'))

    await dsCard.assertToBeVisible()
    await dsCard.assertToContainText('Card content')
  })

  test('should render bal-card-title', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-title>My Title</bal-card-title>
      </bal-card>
    `)

    const dsCardTitle = new DsCardTitle(page.locator('bal-card-title'))

    await dsCardTitle.assertToBeVisible()
    await dsCardTitle.assertToContainText('My Title')
  })

  test('should render bal-card-subtitle', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-subtitle>My Subtitle</bal-card-subtitle>
      </bal-card>
    `)

    const dsCardSubtitle = new DsCardSubtitle(page.locator('bal-card-subtitle'))

    await dsCardSubtitle.assertToBeVisible()
    await dsCardSubtitle.assertToContainText('My Subtitle')
  })

  test('should render bal-card-content', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-content>My Content</bal-card-content>
      </bal-card>
    `)

    const dsCardContent = new DsCardContent(page.locator('bal-card-content'))

    await dsCardContent.assertToBeVisible()
    await dsCardContent.assertToContainText('My Content')
  })

  test('should render bal-card-actions', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-actions>
          <bal-button>OK</bal-button>
        </bal-card-actions>
      </bal-card>
    `)

    const dsCardActions = new DsCardActions(page.locator('bal-card-actions'))

    await dsCardActions.assertToBeVisible()
  })

  test('should render bal-card-header', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-header>My Header</bal-card-header>
      </bal-card>
    `)

    const dsCardHeader = new DsCardHeader(page.locator('bal-card-header'))

    await dsCardHeader.assertToBeVisible()
    await dsCardHeader.assertToContainText('My Header')
  })
})
