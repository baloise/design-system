/**
 * Shared configuration for Segment component documentation pages.
 * Import and reuse this across all segment documentation MDX files to reduce duplication.
 */

export const SEGMENT_DOC_CONFIG = {
  section: 'Components / Forms / Segment',
  color: 'blue' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-segment--overview' },
    { label: 'Usage', storyId: 'components-forms-segment--usage' },
    { label: 'Variants', storyId: 'components-forms-segment-variants--overview' },
    { label: 'Styling', storyId: 'components-forms-segment--styling' },
    { label: 'Accessibility', storyId: 'components-forms-segment--accessibility' },
  ],
}

export const SEGMENT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getSegmentTabs('usage')
 */
export const getSegmentTabs = (activeLabel: keyof typeof SEGMENT_TAB_TITLES) => {
  return SEGMENT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SEGMENT_TAB_TITLES[activeLabel],
  }))
}
