/**
 * Public subpath (`@baloise/ds-tokens/css-preview`) for consumers outside the build pipeline —
 * currently `apps/toky`'s live token preview — that need to turn a token path/resolved value into
 * the same CSS the build actually produces, without duplicating the Style Dictionary transforms.
 * See ADR-0021.
 */
export { tokenNameToCssVar } from './css-naming.js'
export { resolvedValueToCss } from './css-value.js'
