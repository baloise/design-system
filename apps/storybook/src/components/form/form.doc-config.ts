/**
 * Shared configuration for Form component documentation pages.
 */

export const FORM_DOC_CONFIG = {
  section: 'Components / Forms / Form',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-form-form--form' },
    { label: 'Usage', storyId: 'components-forms-form-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-form-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-form-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-form-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-form-testing--testing' },
  ],
}

export const FORM_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getFormTabs('usage')
 */
export const getFormTabs = (activeLabel: keyof typeof FORM_TAB_TITLES) => {
  return FORM_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === FORM_TAB_TITLES[activeLabel],
  }))
}
