// An icon "word" — a prefix like the 🌈/🌐/🔗/🧩 emoji used on layer and
// group names (see KEY_BY_LAYER in flatten.ts), or a plain symbol like ▭ —
// Figma folder names aren't limited to emoji for their leading icon, so this
// matches the whole Unicode Symbol category (So/Sm/Sc/Sk), which covers both.
// Optionally followed by the variation-selector-16 codepoint some emoji are
// rendered with.
const ICON_UNIT = '\\p{S}\\uFE0F?'

// Characters allowed while typing a token name — letters, digits, spaces
// (for multi-word segments and icon prefixes), and icon symbols. Path-capable
// fields (full name/path inputs) also allow '.' and '/' as segment
// separators; single-segment fields (leaf rename, group rename) don't,
// since a separator typed there would silently reparent the token instead
// of renaming it.
const SEGMENT_CHARS_RE = new RegExp(`[^A-Za-z0-9 ${ICON_UNIT}]`, 'gu')
const PATH_CHARS_RE = new RegExp(`[^A-Za-z0-9 ./${ICON_UNIT}]`, 'gu')

const PATH_SEPARATOR_RE = /[./]/

// A segment is one or more space-separated words (or bare numbers, e.g. the
// "700" in a color scale), optionally preceded by an icon prefix like
// "🌈 " or "▭ " — sanitizeSegmentInput/sanitizePathInput already strip
// anything that isn't a letter, digit, space, or icon symbol, so this only
// needs to police casing/ordering. A word must be either PascalCase
// ("Background") or UPPERCASE ("XL"), optionally with leading digits for
// sizes like "4XL" — mixed case that's neither, e.g. "background" or "4Xl",
// is rejected.
const PASCAL_WORD = '[A-Z][A-Za-z0-9]*'
const UPPERCASE_WORD = '[0-9]*[A-Z][A-Z0-9]*'
const NUMBER = '[0-9]+'
const WORD = `(?:${PASCAL_WORD}|${UPPERCASE_WORD}|${NUMBER})`
const SEGMENT_NAME_RE = new RegExp(`^(?:${ICON_UNIT} )*${WORD}(?: ${WORD})*$`, 'u')

// Strips characters a single name segment (leaf rename, group rename) must
// never contain — including '.' and '/', which would otherwise silently
// reparent the token instead of renaming it.
export function sanitizeSegmentInput(text: string): string {
  return text.replace(SEGMENT_CHARS_RE, '')
}

// Strips characters a full name/path input must never contain, while still
// allowing '.' and '/' as segment separators.
export function sanitizePathInput(text: string): string {
  return text.replace(PATH_CHARS_RE, '')
}

// Splits a user-typed path on '.' or '/' (either is accepted as a
// separator), trimming and dropping empty segments — e.g. "Color/Danger.7"
// and "Color.Danger.7" both parse to ["Color", "Danger", "7"].
export function parseTokenPath(input: string): string[] {
  return input
    .split(PATH_SEPARATOR_RE)
    .map(segment => segment.trim())
    .filter(Boolean)
}

export function isValidSegmentName(segment: string): boolean {
  return SEGMENT_NAME_RE.test(segment)
}

// Every segment of a dot-joined token name that isn't a valid PascalCase/
// UPPERCASE (or numeric) segment — used to surface a validation error
// pointing at the exact offending segment(s) rather than rejecting the
// whole name.
export function invalidSegments(name: string): string[] {
  return parseTokenPath(name).filter(segment => !isValidSegmentName(segment))
}

// Strips a segment's leading icon prefix (e.g. "🌈 " off "🌈 Color") — the
// icon is decorative (Figma folder styling), not part of the group's
// identity, so "Color" typed without it should still be recognized as the
// same group as an existing "🌈 Color".
const LEADING_ICON_RE = new RegExp(`^(?:${ICON_UNIT} )+`, 'u')

export function stripIconPrefix(segment: string): string {
  return segment.replace(LEADING_ICON_RE, '')
}

// Rewrites a typed path's group segments (every segment but the last) to
// reuse an existing group's exact text — icon and casing included — when
// the typed segment matches one already in use at the same position, so
// typing "Color/Hirsch" nests under an existing "🌈 Color" group instead of
// silently creating a sibling group that's identical but for the icon.
// The leaf segment is always left as typed. `existingPaths` should already
// be scoped to the layer the new/renamed path belongs to.
export function resolveGroupSegments(segments: string[], existingPaths: string[][]): string[] {
  if (segments.length === 0) return []
  const resolved: string[] = []
  for (let i = 0; i < segments.length - 1; i++) {
    const typed = segments[i]
    const match = existingPaths.find(parts => {
      if (parts.length <= i) return false
      for (let j = 0; j < i; j++) {
        if (parts[j] !== resolved[j]) return false
      }
      return stripIconPrefix(parts[i]).trim().toLowerCase() === stripIconPrefix(typed).trim().toLowerCase()
    })
    resolved.push(match ? match[i] : typed)
  }
  resolved.push(segments[segments.length - 1])
  return resolved
}
