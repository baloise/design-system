import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-footer'
const VARIANTS = ['basic', 'all-variations', 'partner-variant']

const image = screenshot(TAG)

const footerDataMock = [
  { link: 'https://www.baloise.ch/de/ueber-uns/informationen/impressum.html', label: 'Impressum' },
  {
    link: 'https://www.baloise.ch/de/ueber-uns/informationen/rechtliche-hinweise.html',
    label: 'Rechtliche Hinweise',
  },
  { link: 'https://www.baloise.ch/de/ueber-uns/informationen/datenschutz.html', label: 'Datenschutz' },
  { link: 'https://www.baloise.ch/de/ueber-uns/informationen/cookie-policy.html', label: 'Cookie Policy' },
  { link: 'https://www.baloise.ch/de/ueber-uns/informationen/fidleg.html', label: 'Fidleg' },
  { link: 'https://www.baloise.com/de/', label: 'Baloise Gruppe' },
]

const socialMediaChannelsMock = [
  { link: 'https://www.facebook.com/baloisech', label: 'Facebook' },
  { link: 'https://www.instagram.com/baloisech/', label: 'Instagram' },
  { link: 'https://www.linkedin.com/company/baloisegroup', label: 'LinkedIn' },
  { link: 'https://twitter.com/baloise_ch', label: 'Twitter' },
  { link: 'https://www.youtube.com/user/BaloiseGroup', label: 'YouTube' },
]

test.beforeAll('Setup', async ({ page }) => {
  // Mock external API responses using Playwright routing
  await page.route('https://www.baloise.ch/app-integration/v2/ch/footer/de.json', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(footerDataMock),
    }),
  )

  await page.route('https://www.baloise.ch/app-integration/v1/ch/socialmediachannels/de.json', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(socialMediaChannelsMock),
    }),
  )

  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
  await waitForChanges(page)
})

VARIANTS.forEach(variant => {
  test(variant, async ({ page }) => {
    const el = page.getByTestId(variant)
    await expect(el).toHaveScreenshot(image(`${variant}`))
  })
})
