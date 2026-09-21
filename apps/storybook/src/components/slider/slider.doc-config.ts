/**
 * Shared configuration for Slider component documentation pages.
 */

export const SLIDER_DOC_CONFIG = {
  section: 'Components / Forms / Slider',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-slider-slider--slider' },
    { label: 'Usage', storyId: 'components-forms-slider-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-slider-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-slider-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-slider-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-slider-testing--testing' },
  ],
}

export const SLIDER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getSliderTabs('usage')
 */
export const getSliderTabs = (activeLabel: keyof typeof SLIDER_TAB_TITLES) => {
  return SLIDER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === SLIDER_TAB_TITLES[activeLabel],
  }))
}
