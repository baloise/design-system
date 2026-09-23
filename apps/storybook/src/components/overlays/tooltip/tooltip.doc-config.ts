/**
 * Shared configuration for Tooltip component documentation pages.
 */

export const TOOLTIP_DOC_CONFIG = {
  section: 'Components / Tooltip',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-tooltip-tooltip--tooltip' },
    { label: 'Usage', storyId: 'components-overlays-tooltip-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-tooltip-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-tooltip-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-tooltip-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-tooltip-testing--testing' },
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
