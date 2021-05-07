/**
 * Transforms the given text into a highlighted html content.
 *
 * ```typescript
 * balHighlight('Some Text') // <span class="bal-highlight">Some Text</span>
 * ```
 */
export function balHighlight(value: string, search: string, cssClass: string = 'bal-highlight'): string {
  if (search && value) {
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
    pattern = pattern
      .split(' ')
      .filter(t => {
        return t.length > 0
      })
      .join('|')
    const regex = new RegExp(pattern, 'gi')
    return value.replace(regex, match => `<span class="${cssClass}">${match}</span>`)
  } else {
    return value
  }
}
