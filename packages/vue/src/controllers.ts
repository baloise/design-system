import { balModalController as coreModalController } from '@baloise/ds-core'
import { VueDelegate } from './framework-delegate'

const oldModalCreate = coreModalController.create.bind(coreModalController)
coreModalController.create = options => {
  return oldModalCreate({
    ...options,
    delegate: {
      ...(VueDelegate() as any), // eslint-disable-line
    },
  })
}

export const balModalController = coreModalController
