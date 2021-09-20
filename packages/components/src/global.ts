const setupGlobalScript = (win: any = window, doc: any = document) => {
  if (typeof win !== 'undefined' && typeof doc !== 'undefined') {
    const isIe11 = !!win.MSInputMethodContext && !!doc.documentMode
    const isEdgeLegacy = navigator.userAgent.indexOf('Edge/') > -1

    win.BaloiseDesignSystem = win.BaloiseDesignSystem || {
      isSupportedBrowser: () => {
        return !isIe11 && !isEdgeLegacy
      },
    }
  }
}

export default function () {
  setupGlobalScript()
}
