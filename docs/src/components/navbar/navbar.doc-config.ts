/**
 * Shared configuration for Navbar component documentation pages.
 */

export const NAVBAR_DOC_CONFIG = {
  section: 'Components / Navbar',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navbar--navbar' },
    { label: 'Usage', storyId: 'components-navbar--usage' },
    { label: 'Variants', storyId: 'components-navbar--variants-overview' },
    { label: 'Styling', storyId: 'components-navbar--styling' },
    { label: 'Accessibility', storyId: 'components-navbar--accessibility' },
    { label: 'Testing', storyId: 'components-navbar--testing' },
  ],
}

export const NAVBAR_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getNavbarTabs = (activeLabel: keyof typeof NAVBAR_TAB_TITLES) => {
  return NAVBAR_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === NAVBAR_TAB_TITLES[activeLabel],
  }))
}
