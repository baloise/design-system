export const TOAST_DOC_CONFIG = {
  section: 'Components / Toast',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-feedback-toast--overview' },
    { label: 'Usage', storyId: 'components-feedback-toast--usage' },
    { label: 'Variants', storyId: 'components-feedback-toast--variants-overview' },
    { label: 'Styling', storyId: 'components-feedback-toast--styling' },
    { label: 'Accessibility', storyId: 'components-feedback-toast--accessibility' },
  ],
}

export const TOAST_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getToastTabs = (activeLabel: keyof typeof TOAST_TAB_TITLES) => {
  return TOAST_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TOAST_TAB_TITLES[activeLabel],
  }))
}
