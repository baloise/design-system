/**
 * Shared configuration for Checkbox component documentation pages.
 * Import and reuse this across all checkbox documentation MDX files to reduce duplication.
 */

export const CHECKBOX_DOC_CONFIG = {
  section: 'Components / Forms / Checkbox',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-checkbox-checkbox--checkbox' },
    { label: 'Usage', storyId: 'components-forms-checkbox-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-checkbox-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-checkbox-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-checkbox-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-checkbox-testing--testing' },
  ],
}

export const CHECKBOX_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
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
