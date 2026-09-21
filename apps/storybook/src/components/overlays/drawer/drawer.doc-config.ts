/**
 * Shared configuration for Drawer component documentation pages.
 */

export const DRAWER_DOC_CONFIG = {
  section: 'Components / Drawer',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-drawer-drawer--drawer' },
    { label: 'Usage', storyId: 'components-overlays-drawer-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-drawer-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-drawer-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-drawer-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-drawer-testing--testing' },
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
