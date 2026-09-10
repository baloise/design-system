/**
 * Shared configuration for FileUpload component documentation pages.
 */

export const FILEUPLOAD_DOC_CONFIG = {
  section: 'Components / Forms / FileUpload',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-forms-fileupload-fileupload--fileupload' },
    { label: 'Usage', storyId: 'components-forms-fileupload-usage--usage' },
    { label: 'Variants', storyId: 'components-forms-fileupload-variants-overview--overview' },
    { label: 'Styling', storyId: 'components-forms-fileupload-styling--styling' },
    { label: 'Accessibility', storyId: 'components-forms-fileupload-accessibility--accessibility' },
    { label: 'Testing', storyId: 'components-forms-fileupload-testing--testing' },
  ],
}

export const FILEUPLOAD_TAB_TITLES = {
  overview: 'Overview',
  usage: 'Usage',
  variants: 'Variants',
  styling: 'Styling',
  accessibility: 'Accessibility',
  testing: 'Testing',
}

export const getFileUploadTabs = (activeLabel: keyof typeof FILEUPLOAD_TAB_TITLES) => {
  return FILEUPLOAD_DOC_CONFIG.tabs.map(tab => ({
    ...tab,
    active: tab.label === FILEUPLOAD_TAB_TITLES[activeLabel],
  }))
}
