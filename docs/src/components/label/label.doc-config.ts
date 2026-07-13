/**
 * Shared configuration for Label component documentation pages.
 * Import and reuse this across all label documentation MDX files to reduce duplication.
 */

export const LABEL_DOC_CONFIG = {
  section: 'Components / Forms / Label',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-label--label' },
    { label: 'Usage', storyId: 'components-forms-label--usage' },
    { label: 'Variants', storyId: 'components-forms-label--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-label--styling' },
    { label: 'Accessibility', storyId: 'components-forms-label--accessibility' },
    { label: 'Testing', storyId: 'components-forms-label--testing' },
  ],
}

export const LABEL_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getLabelTabs('usage')
 */
export const getLabelTabs = (activeLabel: keyof typeof LABEL_TAB_TITLES) => {
  return LABEL_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === LABEL_TAB_TITLES[activeLabel],
  }))
}
