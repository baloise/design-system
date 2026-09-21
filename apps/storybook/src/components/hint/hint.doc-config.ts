/**
 * Shared configuration for Hint component documentation pages.
 */

export const HINT_DOC_CONFIG = {
  section: 'Components / Hint',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-hint-hint--hint' },
    { label: 'Usage', storyId: 'components-hint-usage--usage' },
    { label: 'Variants', storyId: 'components-hint-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-hint-styling--styling' },
    { label: 'Accessibility', storyId: 'components-hint-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-hint-testing--testing' },
  ],
}

export const HINT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getHintTabs = (activeLabel: keyof typeof HINT_TAB_TITLES) => {
  return HINT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === HINT_TAB_TITLES[activeLabel],
  }))
}
