/**
 * `el.children` filtered by `predicate` — the `:scope > selector` pattern without `:scope`, which
 * Stencil's mock-doc query engine (used during SSR) doesn't support.
 */
export const directChildren = <T extends Element = Element>(el: Element, predicate: (child: Element) => boolean): T[] =>
  Array.from(el.children).filter(predicate) as T[]

export const byTagName =
  (tagName: string) =>
  (child: Element): boolean =>
    child.tagName === tagName
