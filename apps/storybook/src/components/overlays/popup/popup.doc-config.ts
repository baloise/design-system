/**
 * Shared configuration for Popup component documentation pages.
 */

export const POPUP_DOC_CONFIG = {
  section: 'Components / Popup',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-popup-popup--popup' },
    { label: 'Usage', storyId: 'components-overlays-popup-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-popup-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-popup-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-popup-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-popup-testing--testing' },
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
