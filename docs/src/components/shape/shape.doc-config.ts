/**
 * Shared configuration for Shape component documentation pages.
 * Import and reuse this across all shape documentation MDX files to reduce duplication.
 */

export const SHAPE_DOC_CONFIG = {
  section: 'Components / Shape',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-shape--overview' },
    { label: 'Usage', storyId: 'components-shape--usage' },
    { label: 'Variants', storyId: 'components-shape--variants-overview' },
    { label: 'Styling', storyId: 'components-shape--styling' },
    { label: 'Accessibility', storyId: 'components-shape--accessibility' },
  ],
}

export const SHAPE_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getShapeTabs('usage')
 */
export const getShapeTabs = (activeLabel: keyof typeof SHAPE_TAB_TITLES) => {
  return SHAPE_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SHAPE_TAB_TITLES[activeLabel],
  }))
}
