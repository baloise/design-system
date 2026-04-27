import type { computePosition, offset, arrow, flip, shift, autoUpdate } from '@floating-ui/dom'
import { rOnLoad } from './helpers'

export interface DsFloatingUi {
  computePosition: typeof computePosition
  autoUpdate: typeof autoUpdate
  offset: typeof offset
  arrow: typeof arrow
  flip: typeof flip
  shift: typeof shift
}

class DsFloatingUiInternal {
  private lib?: DsFloatingUi

  load = async (): Promise<DsFloatingUi> => {
    return new Promise((resolve, reject) => {
      if (this.lib) {
        return resolve(this.lib)
      } else {
        rOnLoad(async () => {
          import(/* @vite-ignore */ '@floating-ui/dom')
            .then(module => {
              this.lib = module
              resolve(this.lib)
            })
            .catch(reject)
        })
      }
    })
  }
}

export const dsFloatingUi = new DsFloatingUiInternal()
