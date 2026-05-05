/**
 * Shared configuration for Number-input component documentation pages.
 * Import and reuse this across all number-input documentation MDX files to reduce duplication.
 */

export const NUMBER_INPUT_DOC_CONFIG = {
  section: 'Components / Forms / Number-input',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-number-input--overview' },
    { label: 'Usage', storyId: 'components-forms-number-input--usage' },
    { label: 'Variants', storyId: 'components-forms-number-input--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-number-input--styling' },
    { label: 'Accessibility', storyId: 'components-forms-number-input--accessibility' },
  ],
}

export const NUMBER_INPUT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getNumberInputTabs('usage')
 */
export const getNumberInputTabs = (activeLabel: keyof typeof NUMBER_INPUT_TAB_TITLES) => {
  return NUMBER_INPUT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === NUMBER_INPUT_TAB_TITLES[activeLabel],
  }))
}
