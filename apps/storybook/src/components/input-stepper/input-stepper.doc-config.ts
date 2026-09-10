export const INPUTSTEPPER_DOC_CONFIG = {
  section: 'Components / Forms / InputStepper',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-inputstepper-input-stepper--input-stepper' },
    { label: 'Usage', storyId: 'components-forms-inputstepper-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-inputstepper-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-inputstepper-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-inputstepper-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-inputstepper-testing--testing' },
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
