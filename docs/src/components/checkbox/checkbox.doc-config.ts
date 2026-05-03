/**
 * Shared configuration for Checkbox component documentation pages.
 * Import and reuse this across all checkbox documentation MDX files to reduce duplication.
 */

export const CHECKBOX_DOC_CONFIG = {
  section: 'Components / Forms / Checkbox',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-checkbox--overview' },
    { label: 'Usage', storyId: 'components-forms-checkbox--usage' },
    { label: 'Variants', storyId: 'components-forms-checkbox--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-checkbox--styling' },
    { label: 'Accessibility', storyId: 'components-forms-checkbox--accessibility' },
  ],
}

export const CHECKBOX_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getCheckboxTabs('usage')
 */
export const getCheckboxTabs = (activeLabel: keyof typeof CHECKBOX_TAB_TITLES) => {
  return CHECKBOX_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === CHECKBOX_TAB_TITLES[activeLabel],
  }))
}
