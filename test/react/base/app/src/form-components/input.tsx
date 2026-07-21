import { useState } from 'react'
import {
  BalButton,
  BalButtonGroup,
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
        <BalButtonGroup>
          <BalButton color="secondary" onClick={() => setValue('updated value')}>
            Update Input
          </BalButton>
          <BalButton color="tertiary" onClick={() => setDisabled(false)}>
            Enable Input
          </BalButton>
          <BalButton color="tertiary" onClick={() => setDisabled(true)}>
            Disable Input
          </BalButton>
        </BalButtonGroup>
      </BalCardContent>
    </BalCard>
  )
}

export default Input
