import { toHaveFirstReceivedEventDetail } from './to-have-first-received-event-detail'
import { toHaveNthReceivedEventDetail } from './to-have-nth-received-event-detail'
import { toHaveReceivedEvent } from './to-have-received-event'
import { toHaveReceivedEventDetail } from './to-have-received-event-detail'
import { toHaveReceivedEventTimes } from './to-have-received-event-times'

export const matchers = {
  toHaveReceivedEvent,
  toHaveReceivedEventDetail,
  toHaveReceivedEventTimes,
  toHaveFirstReceivedEventDetail,
  toHaveNthReceivedEventDetail,
}
