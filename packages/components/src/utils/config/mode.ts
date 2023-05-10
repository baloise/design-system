import { setMode } from '@stencil/core'
import { BalMode } from './config.types'

export const initStyleMode = (mode: BalMode) => {
  const doc = document

  if (doc) {
    doc.documentElement.setAttribute('mode', mode)
    doc.documentElement.classList.add(mode)
  }

  const isBalElement = (elm: any) => elm.tagName?.startsWith('BAL-')

  const isAllowedBalModeValue = (elmMode: string) => ['css', 'sass', 'all'].includes(elmMode)

  setMode((elm: any) => {
    while (elm) {
      const elmMode = (elm as any).mode || elm.getAttribute('mode')
      if (elmMode) {
        if (isAllowedBalModeValue(elmMode)) {
          return elmMode
        } else if (isBalElement(elm)) {
          console.warn('Invalid baloise style mode: "' + elmMode + '", expected: "css" or "sass"')
        }
      }
      elm = elm.parentElement
    }
    return mode
  })
}
