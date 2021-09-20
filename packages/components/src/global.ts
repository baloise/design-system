const isIe11 = !!(window as any).MSInputMethodContext && !!(document as any).documentMode
const isEdgeLegacy = navigator.userAgent.indexOf('Edge/') > -1

const setupGlobalScript = (win: any = window) => {
  if (typeof win !== 'undefined') {
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
