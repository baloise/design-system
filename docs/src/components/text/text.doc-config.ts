/**
 * Shared configuration for Text component documentation pages.
 * Import and reuse this across all text documentation MDX files to reduce duplication.
 */

export const TEXT_DOC_CONFIG = {
  section: 'Components / Text',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-text--overview' },
    { label: 'Usage', storyId: 'components-text--usage' },
    { label: 'Variants', storyId: 'components-text--variants-overview' },
    { label: 'Styling', storyId: 'components-text--styling' },
    { label: 'Accessibility', storyId: 'components-text--accessibility' },
  ],
}

export const TEXT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTextTabs('usage')
 */
export const getTextTabs = (activeLabel: keyof typeof TEXT_TAB_TITLES) => {
  return TEXT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TEXT_TAB_TITLES[activeLabel],
  }))
}
