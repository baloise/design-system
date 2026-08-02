/**
 * Shared configuration for Popup component documentation pages.
 */

export const POPUP_DOC_CONFIG = {
  section: 'Components / Popup',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-popup--popup' },
    { label: 'Usage', storyId: 'components-popup--usage' },
    { label: 'Variants', storyId: 'components-popup--variants-overview' },
    { label: 'Styling', storyId: 'components-popup--styling' },
    { label: 'Accessibility', storyId: 'components-popup--accessibility' },
    { label: 'Testing', storyId: 'components-popup--testing' },
  ],
}

export const POPUP_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getPopupTabs = (activeLabel: keyof typeof POPUP_TAB_TITLES) => {
  return POPUP_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === POPUP_TAB_TITLES[activeLabel],
  }))
}
