/**
 * Shared configuration for AppNavbar component documentation pages.
 */

export const APP_NAVBAR_DOC_CONFIG = {
  section: 'Components / AppNavbar',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navigation-appnavbar-app-navbar--app-navbar' },
    { label: 'Usage', storyId: 'components-navigation-appnavbar-usage--usage' },
    { label: 'Variants', storyId: 'components-navigation-appnavbar-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-navigation-appnavbar-styling--styling' },
    { label: 'Accessibility', storyId: 'components-navigation-appnavbar-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-navigation-appnavbar-testing--testing' },
  ],
}

export const APP_NAVBAR_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getAppNavbarTabs = (activeLabel: keyof typeof APP_NAVBAR_TAB_TITLES) => {
  return APP_NAVBAR_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === APP_NAVBAR_TAB_TITLES[activeLabel],
  }))
}
