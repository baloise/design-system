/**
 * Shared configuration for Steps component documentation pages.
 */

export const STEPS_DOC_CONFIG = {
  section: 'Components / Steps',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-navigation-steps-steps--steps' },
    { label: 'Usage', storyId: 'components-navigation-steps-usage--usage' },
    { label: 'Variants', storyId: 'components-navigation-steps-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-navigation-steps-styling--styling' },
    { label: 'Accessibility', storyId: 'components-navigation-steps-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-navigation-steps-testing--testing' },
  ],
}

export const STEPS_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getStepsTabs = (activeLabel: keyof typeof STEPS_TAB_TITLES) => {
  return STEPS_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === STEPS_TAB_TITLES[activeLabel],
  }))
}
