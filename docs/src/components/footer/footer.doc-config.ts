/**
 * Shared configuration for Footer component documentation pages.
 */

export const FOOTER_DOC_CONFIG = {
  section: 'Components / Footer',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-footer--footer' },
    { label: 'Usage', storyId: 'components-footer--usage' },
    { label: 'Variants', storyId: 'components-footer--variants-overview' },
    { label: 'Styling', storyId: 'components-footer--styling' },
    { label: 'Accessibility', storyId: 'components-footer--accessibility' },
    { label: 'Testing', storyId: 'components-footer--testing' },
  ],
}

export const FOOTER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getFooterTabs = (activeLabel: keyof typeof FOOTER_TAB_TITLES) => {
  return FOOTER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === FOOTER_TAB_TITLES[activeLabel],
  }))
}
