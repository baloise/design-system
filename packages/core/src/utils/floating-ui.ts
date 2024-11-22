import type { computePosition, offset, arrow, flip, shift, autoUpdate } from '@floating-ui/dom'
import { rLCP } from './helpers'

export interface BalFloatingUi {
  computePosition: typeof computePosition
  autoUpdate: typeof autoUpdate
  offset: typeof offset
  arrow: typeof arrow
  flip: typeof flip
  shift: typeof shift
}

class BalFloatingUiInternal {
  private lib?: BalFloatingUi

  load = async (): Promise<BalFloatingUi> => {
    return new Promise((resolve, reject) => {
      if (this.lib) {
        return resolve(this.lib)
      } else {
        rLCP(async () => {
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

export const balFloatingUi = new BalFloatingUiInternal()
