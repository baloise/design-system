import { isDescendant, rIC } from '../../utils/helpers'
import { NavMenuLinkItem } from './models/bal-nav-menu-link-item'
import { NavMetaLinkItem } from './models/bal-nav-meta-link-item'

export type TabInformationDetail = {
  activeMetaLinkValue: string
  activeMenuLinkValue: string
  linkItems: NavMetaLinkItem[]
}

export type TabInformation = {
  indexOfActiveTab: number
  indexOfNextTab: number
  indexOfPreviousTab: number
  tabs: NavMenuLinkItem[]
}

/**
 * Gathers information about the tabs in the navigation.
 * This information are shared for the tab key down handling and the flyout focus out handling.
 */
export const gatherTabInformation = (detail: TabInformationDetail): TabInformation => {
  const links = detail.linkItems.find(item => item.value === detail.activeMetaLinkValue)?.mainLinkItems

  // the selected tab in the main navigation
  const indexOfActiveTab = links?.findIndex(link => link.value === detail.activeMenuLinkValue)
  const indexOfNextTab = indexOfActiveTab + 1
  const indexOfPreviousTab = indexOfActiveTab - 1

  return {
    tabs: links || [],
    indexOfActiveTab,
    indexOfNextTab,
    indexOfPreviousTab,
  }
}

export type TabKeyDownDetail = {
  el: HTMLElement
  navId: string
  isFlyoutActive: boolean
  isBackwards: boolean
  item: NavMenuLinkItem
  stopEventBubbling: () => void
  closeFlyout: () => void
}

export const handleTabKeyDown = (
  { tabs, indexOfNextTab, indexOfActiveTab }: TabInformation,
  detail: TabKeyDownDetail,
) => {
  // the current focused tab in the main navigation
  const indexOfFocusedTab = tabs?.findIndex(link => link.value === detail.item.value)

  // if last tab is focused and would leave the tab navigation, close the flyout
  if (!detail.isBackwards && indexOfFocusedTab === tabs.length - 1) {
    detail.stopEventBubbling()
    detail.closeFlyout()
    rIC(() => {
      focusNextElement(document.activeElement as HTMLElement, detail.el)
    })
    return
  }

  // only change focus to the first link in the flyout when navigating from active tab to next tab
  if (!detail.isBackwards && indexOfFocusedTab === indexOfActiveTab) {
    const flyout = detail.el.querySelector<HTMLBalNavMenuFlyoutElement>(`#${detail.navId}-menu-flyout`)
    if (flyout) {
      const firstLink = flyout.querySelector<HTMLElement>('a, button, [tabindex="0"]')
      if (firstLink) {
        detail.stopEventBubbling()
        firstLink.focus({ preventScroll: true })
      }
    }
  }

  // only change focus to the last link in the flyout when navigating back from
  // next tab (from the active tab) to active tab (has flyout open)
  if (detail.isBackwards && indexOfFocusedTab === indexOfNextTab) {
    const flyout = detail.el.querySelector(`#${detail.navId}-menu-flyout`)
    if (flyout) {
      const flyoutLinks = flyout.querySelectorAll<HTMLElement>('a, button, [tabindex="0"]')
      const lastLink = flyoutLinks[flyoutLinks.length - 1]
      if (lastLink) {
        detail.stopEventBubbling()
        lastLink.focus({ preventScroll: true })
      }
    }
  }
}

export type FlyoutFocusOutDetail = {
  el: HTMLElement
  isBackwards: boolean
}

export const handleFlyoutFocusOut = (info: TabInformation, detail: FlyoutFocusOutDetail) => {
  const targetItem = detail.isBackwards ? info.tabs[info.indexOfActiveTab] : info.tabs[info.indexOfNextTab]

  if (targetItem) {
    const tab = detail.el.querySelector(
      `button[data-value="${targetItem.value}"], a[data-value="${targetItem.value}"]`,
    ) as HTMLBalTabsElement

    if (tab) {
      tab.focus({ preventScroll: true })
    }
  }
}

/**
 * Focuses the next focusable element after the current element outside of the bal-nav element.
 */
const focusNextElement = (current: HTMLElement, balNavEl: HTMLElement) => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]

  const focusableElements = Array.from(document.querySelectorAll<HTMLElement>(focusableSelectors.join(',')))
    // visible elements only
    .filter(el => el.offsetParent !== null)
    // exclude elements inside the bal-nav
    .filter(el => !isDescendant(balNavEl, el))

  const index = focusableElements.indexOf(current)
  const next = focusableElements[index + 1]

  if (next) next.focus()
}
