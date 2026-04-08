import {
  BalCard,
  BalCardActions,
  BalCardContent,
  BalCardHeader,
  BalCardSubtitle,
  BalCardTitle,
  test,
} from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-card with default slot', async ({ page }) => {
    await page.mount(`
      <bal-card>Card content</bal-card>
    `)

    const balCard = new BalCard(page.locator('bal-card'))

    await balCard.assertToBeVisible()
    await balCard.assertToContainText('Card content')
  })

  test('should render bal-card-title', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-title>My Title</bal-card-title>
      </bal-card>
    `)

    const balCardTitle = new BalCardTitle(page.locator('bal-card-title'))

    await balCardTitle.assertToBeVisible()
    await balCardTitle.assertToContainText('My Title')
  })

  test('should render bal-card-subtitle', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-subtitle>My Subtitle</bal-card-subtitle>
      </bal-card>
    `)

    const balCardSubtitle = new BalCardSubtitle(page.locator('bal-card-subtitle'))

    await balCardSubtitle.assertToBeVisible()
    await balCardSubtitle.assertToContainText('My Subtitle')
  })

  test('should render bal-card-content', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-content>My Content</bal-card-content>
      </bal-card>
    `)

    const balCardContent = new BalCardContent(page.locator('bal-card-content'))

    await balCardContent.assertToBeVisible()
    await balCardContent.assertToContainText('My Content')
  })

  test('should render bal-card-actions', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-actions>
          <bal-button>OK</bal-button>
        </bal-card-actions>
      </bal-card>
    `)

    const balCardActions = new BalCardActions(page.locator('bal-card-actions'))

    await balCardActions.assertToBeVisible()
  })

  test('should render bal-card-header', async ({ page }) => {
    await page.mount(`
      <bal-card>
        <bal-card-header>My Header</bal-card-header>
      </bal-card>
    `)

    const balCardHeader = new BalCardHeader(page.locator('bal-card-header'))

    await balCardHeader.assertToBeVisible()
    await balCardHeader.assertToContainText('My Header')
  })
})
