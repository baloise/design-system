import { useState } from 'react'
import { DsButton, DsCheckbox, DsInput } from '@baloise/ds-react'

export const App = () => {
  const [clicks, setClicks] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <main>
      <h1>ds-react smoke test</h1>

      <p data-testid="clicks">Clicks: {clicks}</p>
      <DsButton data-testid="button" onDsClick={() => setClicks(count => count + 1)}>
        Click me
      </DsButton>

      <p data-testid="input-value">Input value: {inputValue}</p>
      <DsInput
        data-testid="input"
        name="smoke-test-input"
        value={inputValue}
        onDsInput={event => setInputValue(event.detail ?? '')}
      />

      <p data-testid="checked">Checked: {String(checked)}</p>
      <DsCheckbox data-testid="checkbox" checked={checked} onDsChange={event => setChecked(event.detail)}>
        Accept
      </DsCheckbox>
    </main>
  )
}

export default App
