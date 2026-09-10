/**
 * Shared configuration for Form component documentation pages.
 */

export const FORM_DOC_CONFIG = {
  section: 'Components / Form',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-form-form--form' },
    { label: 'Usage', storyId: 'components-form-usage--usage' },
    { label: 'Variants', storyId: 'components-form-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-form-styling--styling' },
    { label: 'Accessibility', storyId: 'components-form-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-form-testing--testing' },
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
