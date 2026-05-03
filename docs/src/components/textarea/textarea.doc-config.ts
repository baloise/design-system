/**
 * Shared configuration for Textarea component documentation pages.
 * Import and reuse this across all textarea documentation MDX files to reduce duplication.
 */

export const TEXTAREA_DOC_CONFIG = {
  section: 'Components / Forms / Textarea',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-textarea--overview' },
    { label: 'Usage', storyId: 'components-forms-textarea--usage' },
    { label: 'Variants', storyId: 'components-forms-textarea--variants-overview' },
    { label: 'Styling', storyId: 'components-forms-textarea--styling' },
    { label: 'Accessibility', storyId: 'components-forms-textarea--accessibility' },
  ],
}

export const TEXTAREA_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getTextareaTabs('usage')
 */
export const getTextareaTabs = (activeLabel: keyof typeof TEXTAREA_TAB_TITLES) => {
  return TEXTAREA_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TEXTAREA_TAB_TITLES[activeLabel],
  }))
}
