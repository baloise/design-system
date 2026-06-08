/**
 * Shared configuration for FileUpload component documentation pages.
 */

export const FILEUPLOAD_DOC_CONFIG = {
  section: 'Components / FileUpload',
  color: 'purple' as const,
  tabs: [
    { label: 'Overview', storyId: 'components-fileupload--file-upload' },
    { label: 'Usage', storyId: 'components-fileupload--usage' },
    { label: 'Variants', storyId: 'components-fileupload--variants-overview' },
    { label: 'Styling', storyId: 'components-fileupload--styling' },
    { label: 'Accessibility', storyId: 'components-fileupload--accessibility' },
    { label: 'Testing', storyId: 'components-fileupload--testing' },
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
