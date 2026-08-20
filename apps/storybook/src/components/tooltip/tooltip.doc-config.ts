/**
 * Shared configuration for Tooltip component documentation pages.
 */

export const TOOLTIP_DOC_CONFIG = {
  section: 'Components / Tooltip',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-tooltip--tooltip' },
    { label: 'Usage', storyId: 'components-tooltip--usage' },
    { label: 'Variants', storyId: 'components-tooltip--variants-overview' },
    { label: 'Styling', storyId: 'components-tooltip--styling' },
    { label: 'Accessibility', storyId: 'components-tooltip--accessibility' },
    { label: 'Testing', storyId: 'components-tooltip--testing' },
  ],
}

export const TOOLTIP_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getTooltipTabs = (activeLabel: keyof typeof TOOLTIP_TAB_TITLES) => {
  return TOOLTIP_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TOOLTIP_TAB_TITLES[activeLabel],
  }))
}
