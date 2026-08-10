import { kebabCase } from 'change-case'

/**
 * Turns a token's path into its final CSS custom property name, matching Style Dictionary's
 * `css` transformGroup (`name/kebab`, which itself uses `change-case`'s `kebabCase`) followed by
 * the `ds/css/name` transform (`transformers.ts`). Returns the bare name (no leading `--`), the
 * same shape Style Dictionary expects from a `name`-type transform - the SD transform is a thin
 * wrapper around this function, and `apps/toky`'s live preview imports it directly so both stay
 * in sync (see ADR-0021).
 */
export const tokenNameToCssVar = (pathSegments: string[], prefix = 'ds'): string => {
  let tokenName = kebabCase([prefix, ...pathSegments].join(' '))

  const isComponent = pathSegments.includes('🧩 Component')
  if (isComponent) {
    tokenName = tokenName.replace('-component', '')
  }

  // we use t-shirt sizes and need to make sure that 2xl becomes 2xl and not 2-xl
  // check if token names has number followed by xl or xs and replace it with numberxl without dash
  if (/-?([0-9]+)-(xl|xs)/.test(tokenName)) {
    tokenName = tokenName.replace(/-?([0-9]+)-(xl|xs)/, '-$1$2')
  }

  // check that no name has double dash and replace it with single dash
  if (tokenName.includes('--')) {
    tokenName = tokenName.replace(/--+/g, '-')
  }

  return tokenName
}
