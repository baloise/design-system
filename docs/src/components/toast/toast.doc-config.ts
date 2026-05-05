export const TOAST_DOC_CONFIG = {
  section: 'Components / Toast',
  color: 'yellow' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-toast--overview' },
    { label: 'Usage', storyId: 'components-toast--usage' },
    { label: 'Variants', storyId: 'components-toast--variants-overview' },
    { label: 'Styling', storyId: 'components-toast--styling' },
    { label: 'Accessibility', storyId: 'components-toast--accessibility' },
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
