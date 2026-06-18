import { DsNavbar, test } from '@baloise/ds-playwright'
import { expect } from '@playwright/test'

test('should fire dsMenuOpenStart and dsMenuOpenEnd events', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 600 })

  await page.mount(`
      <ds-navbar>
        <a href="/" slot="brand">Logo</a>
        <a href="/about" slot="menu-start">About</a>
      </ds-navbar>
    `)

  const navbar = new DsNavbar(page.locator('ds-navbar'))
  const openStartSpy = await navbar.el.spyOnEvent('dsMenuOpenStart')
  const openEndSpy = await navbar.el.spyOnEvent('dsMenuOpenEnd')

  await navbar.toggleSidebar()

  expect(openStartSpy).toHaveReceivedEventTimes(1)
  expect(openEndSpy).toHaveReceivedEventTimes(1)
})

test('should fire dsMenuCloseStart and dsMenuCloseEnd events', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 600 })

  await page.mount(`
      <ds-navbar open>
        <a href="/" slot="brand">Logo</a>
        <a href="/about" slot="menu-start">About</a>
      </ds-navbar>
    `)

  const navbar = new DsNavbar(page.locator('ds-navbar'))
  const closeStartSpy = await navbar.el.spyOnEvent('dsMenuCloseStart')
  const closeEndSpy = await navbar.el.spyOnEvent('dsMenuCloseEnd')

  await navbar.toggleSidebar()
  await page.waitForChanges()

  expect(closeStartSpy).toHaveReceivedEventTimes(1)
  expect(closeEndSpy).toHaveReceivedEventTimes(1)
})

test('toggleSidebar should toggle sidebar state', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 600 })

  await page.mount(`
      <ds-navbar>
        <a href="/" slot="brand">Logo</a>
        <a href="/about" slot="menu-start">About</a>
      </ds-navbar>
    `)

  const navbar = new DsNavbar(page.locator('ds-navbar'))

  // Toggle to open
  await navbar.toggleSidebar()
  await navbar.assertSidebarIsOpen()

  // Toggle to close
  await navbar.toggleSidebar()
  await navbar.assertSidebarIsClosed()
})

test('should open sidebar when hamburger is clicked', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 600 })

  await page.mount(`
      <ds-navbar>
        <a href="/" slot="brand">Logo</a>
        <a href="/about" slot="menu-start">About</a>
      </ds-navbar>
    `)

  const navbar = new DsNavbar(page.locator('ds-navbar'))

  await navbar.toggleSidebar()
  await navbar.assertSidebarIsOpen()
})

test('should close sidebar when backdrop is clicked', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 600 })

  await page.mount(`
      <ds-navbar open>
        <a href="/" slot="brand">Logo</a>
        <a href="/about" slot="menu-start">About</a>
      </ds-navbar>
    `)

  const navbar = new DsNavbar(page.locator('ds-navbar'))

  await page.keyboard.press('Escape')

  await navbar.assertSidebarIsClosed()
})
