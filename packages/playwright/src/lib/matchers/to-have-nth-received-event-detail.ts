import { expect } from '@playwright/test'
import deepEqual from 'fast-deep-equal'

import { EventSpy } from '../page/event-spy'

export function toHaveNthReceivedEventDetail(eventSpy: EventSpy, index: number, eventDetail: any) {
  if (eventSpy === null || eventSpy === undefined) {
    return {
      message: () => `expected spy to have received event, but it was not defined`,
      pass: false,
    }
  }

  if (typeof (eventSpy as any).then === 'function') {
    return {
      message: () =>
        `expected spy to have received event, but it was not resolved (did you forget an await operator?).`,
      pass: false,
    }
  }

  if (eventSpy.eventName === null || eventSpy.eventName === undefined) {
    return {
      message: () => `toHaveReceivedEventDetail did not receive an event spy`,
      pass: false,
    }
  }

  if (eventSpy.firstEvent === null || eventSpy.firstEvent === undefined) {
    return {
      message: () => `event "${eventSpy.eventName}" was not received`,
      pass: false,
    }
  }

  const event = eventSpy.events[index]

  if (event === null || event === undefined) {
    return {
      message: () => `event at index ${index} was not received`,
      pass: false,
    }
  }

  const pass = deepEqual(event.detail, eventDetail)

  expect(event.detail).toEqual(eventDetail)

  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? 'not ' : ''}equal`,
    pass: pass,
  }
}
