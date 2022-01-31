import { balConfigStore } from './config/config.store'

export default function () {
  balConfigStore.attachToWindow()
}
