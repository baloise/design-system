import { BalPage } from '../../types'
import { addE2EListener, EventSpy } from '../event-spy'

export const spyOnEvent = async (page: BalPage, eventName: string): Promise<EventSpy> => {
  const spy = new EventSpy(eventName)

  const handle = await page.evaluateHandle(() => window)

  await addE2EListener(page, handle, eventName, (ev: CustomEvent) => spy.push(ev))

  return spy
}
