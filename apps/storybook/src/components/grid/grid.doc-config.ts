/**
 * Shared configuration for Grid component documentation pages.
 */

export const GRID_DOC_CONFIG = {
  section: 'Components / Grid',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-grid-grid--grid' },
    { label: 'Usage', storyId: 'components-grid-usage--usage' },
    { label: 'Variants', storyId: 'components-grid-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-grid-styling--styling' },
    { label: 'Accessibility', storyId: 'components-grid-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-grid-testing--testing' },
  ],
}

export const GRID_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getGridTabs = (activeLabel: keyof typeof GRID_TAB_TITLES) => {
  return GRID_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === GRID_TAB_TITLES[activeLabel],
  }))
}
