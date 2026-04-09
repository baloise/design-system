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
  test('should render ds-card with default slot', async ({ page }) => {
    await page.mount(`
      <ds-card>Card content</ds-card>
    `)

    const dsCard = new DsCard(page.locator('ds-card'))

    await dsCard.assertToBeVisible()
    await dsCard.assertToContainText('Card content')
  })

  test('should render ds-card-title', async ({ page }) => {
    await page.mount(`
      <ds-card>
        <ds-card-title>My Title</ds-card-title>
      </ds-card>
    `)

    const dsCardTitle = new DsCardTitle(page.locator('ds-card-title'))

    await dsCardTitle.assertToBeVisible()
    await dsCardTitle.assertToContainText('My Title')
  })

  test('should render ds-card-subtitle', async ({ page }) => {
    await page.mount(`
      <ds-card>
        <ds-card-subtitle>My Subtitle</ds-card-subtitle>
      </ds-card>
    `)

    const dsCardSubtitle = new DsCardSubtitle(page.locator('ds-card-subtitle'))

    await dsCardSubtitle.assertToBeVisible()
    await dsCardSubtitle.assertToContainText('My Subtitle')
  })

  test('should render ds-card-content', async ({ page }) => {
    await page.mount(`
      <ds-card>
        <ds-card-content>My Content</ds-card-content>
      </ds-card>
    `)

    const dsCardContent = new DsCardContent(page.locator('ds-card-content'))

    await dsCardContent.assertToBeVisible()
    await dsCardContent.assertToContainText('My Content')
  })

  test('should render ds-card-actions', async ({ page }) => {
    await page.mount(`
      <ds-card>
        <ds-card-actions>
          <ds-button>OK</ds-button>
        </ds-card-actions>
      </ds-card>
    `)

    const dsCardActions = new DsCardActions(page.locator('ds-card-actions'))

    await dsCardActions.assertToBeVisible()
  })

  test('should render ds-card-header', async ({ page }) => {
    await page.mount(`
      <ds-card>
        <ds-card-header>My Header</ds-card-header>
      </ds-card>
    `)

    const dsCardHeader = new DsCardHeader(page.locator('ds-card-header'))

    await dsCardHeader.assertToBeVisible()
    await dsCardHeader.assertToContainText('My Header')
  })
})
