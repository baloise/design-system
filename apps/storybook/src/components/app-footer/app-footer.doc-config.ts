/**
 * Shared configuration for AppFooter component documentation pages.
 */

export const APP_FOOTER_DOC_CONFIG = {
  section: 'Components / AppFooter',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-appfooter--app-footer' },
    { label: 'Usage', storyId: 'components-appfooter--usage' },
    { label: 'Variants', storyId: 'components-appfooter--variants-overview' },
    { label: 'Styling', storyId: 'components-appfooter--styling' },
    { label: 'Accessibility', storyId: 'components-appfooter--accessibility' },
    { label: 'Testing', storyId: 'components-appfooter--testing' },
  ],
}

export const APP_FOOTER_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getAppFooterTabs = (activeLabel: keyof typeof APP_FOOTER_TAB_TITLES) => {
  return APP_FOOTER_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === APP_FOOTER_TAB_TITLES[activeLabel],
  }))
}
