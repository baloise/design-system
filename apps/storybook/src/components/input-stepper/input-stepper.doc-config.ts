export const INPUTSTEPPER_DOC_CONFIG = {
  section: 'Components / InputStepper',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-inputstepper--input-stepper' },
    { label: 'Usage', storyId: 'components-inputstepper--usage' },
    { label: 'Variants', storyId: 'components-inputstepper--variants-overview' },
    { label: 'Styling', storyId: 'components-inputstepper--styling' },
    { label: 'Accessibility', storyId: 'components-inputstepper--accessibility' },
    { label: 'Testing', storyId: 'components-inputstepper--testing' },
  ],
}

export const INPUTSTEPPER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getInputStepperTabs = (activeLabel: keyof typeof INPUTSTEPPER_TAB_TITLES) => {
  return INPUTSTEPPER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === INPUTSTEPPER_TAB_TITLES[activeLabel],
  }))
}
