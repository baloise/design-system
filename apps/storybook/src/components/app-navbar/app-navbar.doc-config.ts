/**
 * Shared configuration for AppNavbar component documentation pages.
 */

export const APP_NAVBAR_DOC_CONFIG = {
  section: 'Components / AppNavbar',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-appnavbar--app-navbar' },
    { label: 'Usage', storyId: 'components-appnavbar--usage' },
    { label: 'Variants', storyId: 'components-appnavbar--variants-overview' },
    { label: 'Styling', storyId: 'components-appnavbar--styling' },
    { label: 'Accessibility', storyId: 'components-appnavbar--accessibility' },
    { label: 'Testing', storyId: 'components-appnavbar--testing' },
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
