/**
 * Shared configuration for Select component documentation pages.
 */

export const SELECT_DOC_CONFIG = {
  section: 'Components / Select',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-select--select' },
    { label: 'Usage', storyId: 'components-select--usage' },
    { label: 'Variants', storyId: 'components-select--variants-overview' },
    { label: 'Styling', storyId: 'components-select--styling' },
    { label: 'Accessibility', storyId: 'components-select--accessibility' },
    { label: 'Testing', storyId: 'components-select--testing' },
  ],
}

export const SELECT_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getSelectTabs = (activeLabel: keyof typeof SELECT_TAB_TITLES) => {
  return SELECT_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SELECT_TAB_TITLES[activeLabel],
  }))
}
