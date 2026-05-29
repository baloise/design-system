/**
 * Shared configuration for Modal component documentation pages.
 */

export const MODAL_DOC_CONFIG = {
  section: 'Components / Modal',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-modal--modal' },
    { label: 'Usage', storyId: 'components-modal--usage' },
    { label: 'Variants', storyId: 'components-modal--variants-overview' },
    { label: 'Styling', storyId: 'components-modal--styling' },
    { label: 'Accessibility', storyId: 'components-modal--accessibility' },
  ],
}

export const MODAL_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
}

export const getModalTabs = (activeLabel: keyof typeof MODAL_TAB_TITLES) => {
  return MODAL_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === MODAL_TAB_TITLES[activeLabel],
  }))
}
