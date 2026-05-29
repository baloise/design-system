/**
 * Shared configuration for Steps component documentation pages.
 */

export const STEPS_DOC_CONFIG = {
  section: 'Components / Steps',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-steps--steps' },
    { label: 'Usage', storyId: 'components-steps--usage' },
    { label: 'Variants', storyId: 'components-steps--variants-overview' },
    { label: 'Styling', storyId: 'components-steps--styling' },
    { label: 'Accessibility', storyId: 'components-steps--accessibility' },
    { label: 'Testing', storyId: 'components-steps--testing' },
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
