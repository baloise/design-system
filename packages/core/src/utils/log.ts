import { ComponentInterface } from '@stencil/core'
import { dsBrowser } from './browser'

export interface DsLogger {
  components: string[]
  custom: boolean
  lifecycle: boolean
  render: boolean
  event: boolean
}

export interface Loggable {
  log: LogInstance
  createLogger(log: LogInstance): void
}

export type LogInstance = (message?: any, ...optionalParams: any[]) => void

export const defaultLoggerConfig: DsLogger = {
  components: [],
  event: false,
  lifecycle: false,
  render: false,
  custom: false,
}

const getConfig = () => {
  let loggerConfig = defaultLoggerConfig

  if (
    dsBrowser.hasWindow &&
    (window as any).DesignSystem &&
    (window as any).DesignSystem.config &&
    (window as any).DesignSystem.config.logger
  ) {
    loggerConfig = (window as any).DesignSystem.config.logger
  }

  return loggerConfig
}

const buildLogger = (tag: string) => {
  const l = (type: 'lifecycle' | 'event' | 'custom' | 'render', message?: any, ...optionalParams: any[]) => {
    const config = getConfig()

    if (config.components.includes(tag) && config[type]) {
      console.log(message, ...optionalParams)
    }
  }

  return {
    custom: (message?: any, ...optionalParams: any[]) => l('custom', ` ➡️ [${tag}] - ${message}`, ...optionalParams),
    lifecycle: (lifecycleName: string, ...optionalParams: any[]) =>
      l(
        'lifecycle',
        `${
          lifecycleName === 'connectedCallback'
            ? '🟢'
            : lifecycleName === 'disconnectedCallback'
              ? '🔴'
              : lifecycleName === 'componentDidLoad'
                ? '🏁'
                : ' ➡️'
        } [${tag}] - (${lifecycleName})`,
        ...optionalParams,
      ),
    event: (eventName: string, ...optionalParams: any[]) =>
      l('event', `🔥 [${tag}] - (${eventName})`, ...optionalParams),
    render: (...optionalParams: any[]) => l('render', `🖌️ [${tag}] - (render)`, ...optionalParams),
  }
}

export function Logger(tag = 'unknown') {
  return function (target: ComponentInterface, _propertyKey: string, _descriptor: PropertyDescriptor) {
    const { connectedCallback, disconnectedCallback, render, componentDidLoad, createLogger } = target

    const log = buildLogger(tag)

    target.connectedCallback = function () {
      log.lifecycle(`connectedCallback`, this)

      const events = Object.keys(this)
        .filter(n => n.startsWith('ds'))
        .filter(n => typeof this[n] === 'object')

      for (let index = 0; index < events.length; index++) {
        const event = events[index]
        const emitter = this[event]
        this[event] = {
          emit: (...args: any) => {
            log.event(event, this, ...args)
            return emitter.emit.call(this, ...args)
          },
        }
      }

      createLogger.call(this, log.custom)
      return connectedCallback && connectedCallback.call(this)
    }

    target.disconnectedCallback = function () {
      log.lifecycle(`disconnectedCallback`, this)
      return disconnectedCallback && disconnectedCallback.call(this)
    }

    target.componentDidLoad = function () {
      log.lifecycle(`componentDidLoad`, this)
      return componentDidLoad && componentDidLoad.call(this)
    }

    target.render = function () {
      log.render(this)
      return (render as any).call(this)
    }
  }
}
