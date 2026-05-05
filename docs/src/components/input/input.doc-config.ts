/**
 * Shared configuration for Input component documentation pages.
 * Import and reuse this across all input documentation MDX files to reduce duplication.
 */

export const INPUT_DOC_CONFIG = {
  section: 'Components / Forms / Input',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-input--overview' },
    { label: 'Usage', storyId: 'components-forms-input--usage' },
    { label: 'Variants', storyId: 'components-forms-input--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-input--styling' },
    { label: 'Accessibility', storyId: 'components-forms-input--accessibility' },
  ],
}

export const INPUT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getInputTabs('usage')
 */
export const getInputTabs = (activeLabel: keyof typeof INPUT_TAB_TITLES) => {
  return INPUT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === INPUT_TAB_TITLES[activeLabel],
  }))
}
