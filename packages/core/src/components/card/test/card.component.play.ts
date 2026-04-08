import {
  BalCard,
  BalCardActions,
  BalCardContent,
  BalCardHeader,
  BalCardSubtitle,
  CardTitle,
  test,
} from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-card with default slot', async ({ page }) => {
    await page.mount(`
      <bal-card>Card content</bal-card>
    `)

    const dsCard = new Card(page.locator('bal-card'))

    await dsCard.assertToBeVisible()
    await dsCard.assertToContainText('Card content')
  })

  test('should render bal-card-title', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-title>My Title</bal-card-title>
      </bal-card>
    `)

    const dsCardTitle = new CardTitle(page.locator('bal-card-title'))

    await dsCardTitle.assertToBeVisible()
    await dsCardTitle.assertToContainText('My Title')
  })

  test('should render bal-card-subtitle', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-subtitle>My Subtitle</bal-card-subtitle>
      </bal-card>
    `)

    const dsCardSubtitle = new CardSubtitle(page.locator('bal-card-subtitle'))

    await dsCardSubtitle.assertToBeVisible()
    await dsCardSubtitle.assertToContainText('My Subtitle')
  })

  test('should render bal-card-content', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-content>My Content</bal-card-content>
      </bal-card>
    `)

    const dsCardContent = new CardContent(page.locator('bal-card-content'))

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

    const dsCardActions = new CardActions(page.locator('bal-card-actions'))

    await dsCardActions.assertToBeVisible()
  })

  test('should render bal-card-header', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-header>My Header</bal-card-header>
      </bal-card>
    `)

    const dsCardHeader = new CardHeader(page.locator('bal-card-header'))

    await dsCardHeader.assertToBeVisible()
    await dsCardHeader.assertToContainText('My Header')
  })
})
