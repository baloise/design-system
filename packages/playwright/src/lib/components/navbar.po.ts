import { expect } from '@playwright/test'
import { PageObject } from './page-object'

export class DsNavbar extends PageObject {
  readonly nav = this.el.locator('[id="nav"]')
  readonly hamburger = this.el.locator('[id="hamburger"]')
  readonly sidebar = this.el.locator('[id="sidebar"]')
  readonly sidebarPanel = this.el.locator('[id="sidebar-panel"]')
  readonly sidebarBackdrop = this.el.locator('[id="sidebar-backdrop"]')

  async toggleSidebar() {
    await this.hamburger.click()
  }

  async assertSidebarIsOpen() {
    await expect(this.sidebar).toHaveClass(/is-open/)
  }

  async assertSidebarIsClosed() {
    await expect(this.sidebar).not.toHaveClass(/is-open/)
  }

  async assertIsLight() {
    await expect(this.el).toHaveClass(/is-light/)
  }

  async assertIsNotLight() {
    await expect(this.el).not.toHaveClass(/is-light/)
  }
}
