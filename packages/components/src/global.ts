import { configStore } from './config/config.store'

export default function () {
  configStore.attachToWindow()
}
