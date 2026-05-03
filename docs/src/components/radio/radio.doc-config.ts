/**
 * Shared configuration for Radio component documentation pages.
 * Import and reuse this across all radio documentation MDX files to reduce duplication.
 */

export const RADIO_DOC_CONFIG = {
  section: 'Components / Forms / Radio',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-radio--overview' },
    { label: 'Usage', storyId: 'components-forms-radio--usage' },
    { label: 'Variants', storyId: 'components-forms-radio--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-radio--styling' },
    { label: 'Accessibility', storyId: 'components-forms-radio--accessibility' },
  ],
}

export const RADIO_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getRadioTabs('usage')
 */
export const getRadioTabs = (activeLabel: keyof typeof RADIO_TAB_TITLES) => {
  return RADIO_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === RADIO_TAB_TITLES[activeLabel],
  }))
}
