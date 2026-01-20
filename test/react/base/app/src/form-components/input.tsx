import { useState } from 'react'
import {
  BalCard,
  BalCardContent,
  BalCardTitle,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
  BalInput,
} from '../generated/src'

function Input({}) {
  const [value, _setValue] = useState<string | undefined>('Init Value')
  const [dirty, setDirty] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)

  function setValue(value: string | undefined) {
    _setValue(value)
    setDirty(true)
  }

  return (
    <BalCard>
      <BalCardTitle>Input</BalCardTitle>
      <BalCardContent>
        <BalField required invalid={dirty && !value} disabled={disabled}>
          <BalFieldLabel>Input Label</BalFieldLabel>
          <BalFieldControl>
            <BalInput
              placeholder="Enter text"
              value={value}
              onBalBlur={() => setDirty(true)}
              onBalChange={event => setValue(event.detail)}
            ></BalInput>
          </BalFieldControl>
          <BalFieldMessage>{dirty && !value ? 'This field is required' : ''}</BalFieldMessage>
        </BalField>
        <div className="buttons">
          <button className="button is-secondary" onClick={() => setValue('updated value')}>
            Update Input
          </button>
          <button className="button is-tertiary" onClick={() => setDisabled(false)}>
            Enable Input
          </button>
          <button className="button is-tertiary" onClick={() => setDisabled(true)}>
            Disable Input
          </button>
        </div>
      </BalCardContent>
    </BalCard>
  )
}

export default Input
