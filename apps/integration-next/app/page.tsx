import { DsButton, DsCheckbox, DsInput, DsTooltip } from '@helvetia-design/react'

export default function HomePage() {
  return (
    <main>
      <h1>ds-react Next.js SSR</h1>
      <DsButton data-testid="button">Click me</DsButton>
      <DsInput data-testid="input" name="ssr-input" />
      <DsCheckbox data-testid="checkbox">Accept</DsCheckbox>
      {/* Tooltip is on the DSD allow-list (components.server.ts's `serializeShadowRoot`); button,
          input and checkbox render `scoped`. See docs/adr/0034-ssr-mixed-serialize-shadow-root.md. */}
      <DsTooltip data-testid="tooltip" open>
        Hint
      </DsTooltip>
    </main>
  )
}
