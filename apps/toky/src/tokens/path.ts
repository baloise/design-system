// Characters allowed while typing a token name. Path-capable fields (full
// name/path inputs) also allow '.' and '/' as segment separators; single-
// segment fields (leaf rename, group rename) don't, since a separator typed
// there would silently reparent the token instead of renaming it.
const SEGMENT_CHARS_RE = /[^A-Za-z0-9]/g
const PATH_CHARS_RE = /[^A-Za-z0-9./]/g

const PATH_SEPARATOR_RE = /[./]/

// A segment must be PascalCase (start with a capital letter) or a bare
// number (e.g. the "700" in a color scale) — sanitizeSegmentInput/
// sanitizePathInput already strip anything that isn't a letter or digit, so
// this only needs to police casing/ordering.
const SEGMENT_NAME_RE = /^([A-Z][A-Za-z0-9]*|[0-9]+)$/

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

// Every segment of a dot-joined token name that isn't a valid PascalCase
// (or numeric) segment — used to surface a validation error pointing at the
// exact offending segment(s) rather than rejecting the whole name.
export function invalidSegments(name: string): string[] {
  return parseTokenPath(name).filter(segment => !isValidSegmentName(segment))
}

// Segment values disallowed regardless of casing — "Default" reads as a
// fallback/mode keyword rather than a real category or token name, and
// inviting it into a path invites confusion with that meaning later.
export const RESERVED_SEGMENT_WORDS: readonly string[] = ['default']

export function isReservedSegmentName(segment: string): boolean {
  return RESERVED_SEGMENT_WORDS.includes(segment.toLowerCase())
}

// Every segment of a dot-joined token name that matches a reserved word,
// compared case-insensitively — same "point at the offending segment(s)"
// shape as invalidSegments.
export function reservedSegments(name: string): string[] {
  return parseTokenPath(name).filter(isReservedSegmentName)
}
