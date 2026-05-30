/**
 * Shared configuration for Drawer component documentation pages.
 */

export const DRAWER_DOC_CONFIG = {
  section: 'Components / Drawer',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-drawer--drawer' },
    { label: 'Usage', storyId: 'components-drawer--usage' },
    { label: 'Variants', storyId: 'components-drawer--variants-overview' },
    { label: 'Styling', storyId: 'components-drawer--styling' },
    { label: 'Accessibility', storyId: 'components-drawer--accessibility' },
    { label: 'Testing', storyId: 'components-drawer--testing' },
  ],
}

export const DRAWER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getDrawerTabs = (activeLabel: keyof typeof DRAWER_TAB_TITLES) => {
  return DRAWER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === DRAWER_TAB_TITLES[activeLabel],
  }))
}
