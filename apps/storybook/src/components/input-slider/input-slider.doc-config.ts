/**
 * Shared configuration for InputSlider component documentation pages.
 */

export const INPUTSLIDER_DOC_CONFIG = {
  section: 'Components / InputSlider',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-inputslider--input-slider' },
    { label: 'Usage', storyId: 'components-inputslider--usage' },
    { label: 'Variants', storyId: 'components-inputslider--variants-overview' },
    { label: 'Styling', storyId: 'components-inputslider--styling' },
    { label: 'Accessibility', storyId: 'components-inputslider--accessibility' },
    { label: 'Testing', storyId: 'components-inputslider--testing' },
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
