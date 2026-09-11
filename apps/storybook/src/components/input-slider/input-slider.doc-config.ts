/**
 * Shared configuration for InputSlider component documentation pages.
 */

export const INPUTSLIDER_DOC_CONFIG = {
  section: 'Components / Forms / InputSlider',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-inputslider-input-slider--input-slider' },
    { label: 'Usage', storyId: 'components-forms-inputslider-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-inputslider-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-inputslider-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-inputslider-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-inputslider-testing--testing' },
  ],
}

export const INPUTSLIDER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

/**
 * Helper to get tabs with active state set.
 * Usage: getInputSliderTabs('usage')
 */
export const getInputSliderTabs = (activeLabel: keyof typeof INPUTSLIDER_TAB_TITLES) => {
  return INPUTSLIDER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === INPUTSLIDER_TAB_TITLES[activeLabel],
  }))
}
