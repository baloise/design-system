/**
 * Shared configuration for Modal component documentation pages.
 */

export const MODAL_DOC_CONFIG = {
  section: 'Components / Modal',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-overlays-modal-modal--modal' },
    { label: 'Usage', storyId: 'components-overlays-modal-usage--usage' },
    { label: 'Variants', storyId: 'components-overlays-modal-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-overlays-modal-styling--styling' },
    { label: 'Accessibility', storyId: 'components-overlays-modal-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-overlays-modal-testing--testing' },
  ],
}

export const MODAL_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getModalTabs = (activeLabel: keyof typeof MODAL_TAB_TITLES) => {
  return MODAL_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === MODAL_TAB_TITLES[activeLabel],
  }))
}
