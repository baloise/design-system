export const TOAST_DOC_CONFIG = {
  section: 'Components / Toast',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-toast-toast--toast' },
    { label: 'Usage', storyId: 'components-overlays-toast-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-toast-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-toast-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-toast-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-toast-testing--testing' },
  ],
}

export const TOAST_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getToastTabs = (activeLabel: keyof typeof TOAST_TAB_TITLES) => {
  return TOAST_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === TOAST_TAB_TITLES[activeLabel],
  }))
}
