import { DsButton, DsCheckbox, DsInput } from '@helvetia-design/react'

export default function HomePage() {
  return (
    <main>
      <h1>ds-react Next.js SSR</h1>
      <DsButton data-testid="button">Click me</DsButton>
      <DsInput data-testid="input" name="ssr-input" />
      <DsCheckbox data-testid="checkbox">Accept</DsCheckbox>
    </main>
  )
}
