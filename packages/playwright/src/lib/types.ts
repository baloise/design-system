import { Page, Response } from '@playwright/test'
import { EventSpy } from './page/event-spy'
import { E2ELocator, LocatorOptions } from './page/utils'

export type BalPageOptions = {
  /**
   * Referer header value. If provided it will take preference over the referer header value set by
   * [page.setExtraHTTPHeaders(headers)](https://playwright.dev/docs/api/class-page#page-set-extra-http-headers).
   */
  referer?: string

  /**
   * Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via
   * `navigationTimeout` option in the config, or by using the
   * [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout),
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout),
   * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number

  /**
   * When to consider operation succeeded, defaults to `load`. Events can be either:
   * - `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
   * - `'load'` - consider operation to be finished when the `load` event is fired.
   * - `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for
   *   at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
   * - `'commit'` - consider operation to be finished when network response is received and the document started
   *   loading.
   */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
}

export interface BalPage extends Page {
  locator(selector: string, options?: LocatorOptions): E2ELocator
  goto(url: string, options?: BalPageOptions): Promise<null | Response>
  mount(html: string): Promise<void>
  waitForChanges(timeoutMs?: number): Promise<void>
  spyOnEvent(eventName: string): Promise<EventSpy>
  _e2eEventsIds: number
  _e2eEvents: Map<number, any>
}
// /**
//  * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
//  * last redirect.
//  *
//  * The method will throw an error if:
//  * - there's an SSL error (e.g. in case of self-signed certificates).
//  * - target URL is invalid.
//  * - the `timeout` is exceeded during navigation.
//  * - the remote server does not respond or is unreachable.
//  * - the main resource failed to load.
//  *
//  * The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not
//  * Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling
//  * [response.status()](https://playwright.dev/docs/api/class-response#response-status).
//  *
//  * > NOTE: The method either throws an error or returns a main resource response. The only exceptions are navigation to
//  * `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
//  * > NOTE: Headless mode doesn't support navigation to a PDF document. See the
//  * [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
//  *
//  * Shortcut for main frame's [frame.goto(url[, options])](https://playwright.dev/docs/api/class-frame#frame-goto)
//  * @param url URL to navigate page to. The url should include scheme, e.g. `https://`. When a `baseURL` via the context options was
//  * provided and the passed URL is a path, it gets merged via the [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
//  */
// goto: (url: string, options?: BalPageOptions) => Promise<null | Response>
// /**
//  * Assigns HTML markup to a page.
//  * @param html - The HTML markup to assign to the page
//  */
// mount: (html: string) => Promise<void>
// /**
//  * After changes have been made to a component, such as an update to a property or attribute,
//  * we need to wait until the changes have been applied to the DOM.
//  */
// waitForChanges: (timeoutMs?: number) => Promise<void>
// /**
//  * Find an element by selector.
//  * See https://playwright.dev/docs/locators for more information.
//  */
// locator: (selector: string, options?: LocatorOptions) => E2ELocator
// /**
//  * Creates a new EventSpy and listens on the window for an event.
//  * The test will timeout if the event never fires.
//  *
//  * Usage:
//  * ```ts
//  * const ionChange = await page.spyOnEvent('ionChange');
//  * ...
//  * await ionChange.next();
//  * ```
//  */
// spyOnEvent: (eventName: string) => Promise<EventSpy>
// _e2eEventsIds: number
// _e2eEvents: Map<number, any>
