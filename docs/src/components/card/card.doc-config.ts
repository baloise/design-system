/**
 * Shared configuration for Card component documentation pages.
 * Import and reuse this across all card documentation MDX files to reduce duplication.
 */

export const CARD_DOC_CONFIG = {
  section: 'Components / Card',
  color: 'green' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-card--overview' },
    { label: 'Usage', storyId: 'components-card--usage' },
    { label: 'Variants', storyId: 'components-card--variants-overview' },
    { label: 'Styling', storyId: 'components-card--styling' },
    { label: 'Accessibility', storyId: 'components-card--accessibility' },
  ],
}

export const CARD_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getCardTabs('usage')
 */
export const getCardTabs = (activeLabel: keyof typeof CARD_TAB_TITLES) => {
  return CARD_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CARD_TAB_TITLES[activeLabel],
  }))
}
