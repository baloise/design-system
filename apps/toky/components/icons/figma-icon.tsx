// Figma's logomark, monochrome (currentColor) to match lucide-react's icon
// set used everywhere else in the sidebar rail — Simple Icons' well-known
// "figma" glyph, not a full-color reproduction, since every other rail icon
// (GitBranchIcon, TriangleAlertIcon, SwatchBookIcon) is single-color too.
export function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.44c0 2.503-2.034 4.54-4.588 4.54zm-3.019-4.49c0 1.665 1.354 3.019 3.019 3.019 1.717 0 3.117-1.376 3.117-3.068v-2.971H8.148a3.023 3.023 0 0 0-3.019 3.02zM15.852 15.019h-.101a4.494 4.494 0 0 1-4.49-4.49 4.494 4.494 0 0 1 4.49-4.49h.101a4.494 4.494 0 0 1 4.49 4.49 4.494 4.494 0 0 1-4.49 4.49zm-.101-7.51a3.023 3.023 0 0 0-3.019 3.02 3.023 3.023 0 0 0 3.019 3.019h.101a3.023 3.023 0 0 0 3.019-3.02 3.023 3.023 0 0 0-3.019-3.018z" />
      <path d="M8.148 15.019H8.05a4.494 4.494 0 0 1-4.392-4.49 4.494 4.494 0 0 1 4.49-4.49h4.588v8.98zm-.098-7.51a3.023 3.023 0 0 0-3.019 3.02 3.023 3.023 0 0 0 2.921 3.018h3.215V7.51H8.05zM12.736 8.981H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zM8.148 1.47a3.023 3.023 0 0 0-3.019 3.02c0 1.664 1.354 3.019 3.019 3.019h3.117V1.471H8.148z" />
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zm-3.117-1.47h3.117c1.665 0 3.019-1.355 3.019-3.02 0-1.664-1.354-3.019-3.019-3.019h-3.117V7.51z" />
    </svg>
  )
}
