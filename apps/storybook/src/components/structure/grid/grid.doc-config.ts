/**
 * Shared configuration for Grid component documentation pages.
 */

export const GRID_DOC_CONFIG = {
  section: 'Components / Grid',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-structure-grid-grid--grid' },
    { label: 'Usage', storyId: 'components-structure-grid-usage--usage' },
    { label: 'Variants', storyId: 'components-structure-grid-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-structure-grid-styling--styling' },
    { label: 'Accessibility', storyId: 'components-structure-grid-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-structure-grid-testing--testing' },
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
