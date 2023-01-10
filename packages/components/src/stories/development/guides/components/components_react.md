## Component Usage

After importing the Baloise Design System React components, the components can be used inside the `BalApp` component.

**App.tsx**

```tsx
import React from "react";
import { BalApp, BalHeading } from "@baloise/design-system-components-react";

function App() {
  return (
    <BalApp>
      <main class="container">
        <BalHeading>Hello World</BalHeading>
      <main>
    </BalApp>
  );
}

export default App;
```

Import the components that are used inside the template and that is it.

## Properties

Properties are custom attributes/properties exposed publicly on an HTML element. They allow developers to pass data to
a component to render or otherwise use. Like to set a value for a input or change the color of a button.

To demonstrate how to interact with properties we try to change the color property of the button component.

<bal-app>
  <bal-button color="info">My info button</bal-button>
</bal-app>

```html
<!-- with color info -->
<bal-button color="info">My info button</bal-button>
```

If the property is of type `boolean` it is enough to just set the property without a value:

<bal-app>
  <bal-button disabled>My disabled button</bal-button>
</bal-app>

```html
<!-- disabled button -->
<bal-button disabled>My disabled button</bal-button>
```

### Bind properties

```tsx
import React from "react";
import { BalButton } from "@baloise/design-system-components-react";

function App() {
  const [color, setColor] = useState('info');

  return (
    <BalButton color='info'>My info button</BalButton>
    <BalButton color={color}>My info button</BalButton>
  );
}

export default App;
```

## Events

The most of the Baloise Design System components can emit data and events using the Custom events.

To demonstrate how to interact with events we try to listen to the input event of an input component.

<bal-app>
  <bal-input placeholder="Tell us your name"></bal-input>
</bal-app>

```html
<!-- simple text input -->
<bal-input placeholder="Tell us your name"></bal-input>
```

Each event in React is prefixed with `on`. `balInput` becomes `onBalInput`.
`$event.detail` returns the main value of the event.

```tsx
import { useState } from 'react'
import { BalInput, BalText } from '@baloise/design-system-components-react'

function EventComponent() {
  const [myName, setMyName] = useState<string | undefined>()

  return (
    <div>
      <BalInput placeholder="Tell us your name" value={myName} onBalInput={e => setMyName(e.detail)}></BalInput>
      <BalText>My name is {myName}</BalText>
    </div>
  )
}

export default EventComponent
```

## Methods

Some of the Baloise Design System components offering methods to setFocus or returning native HTML elements.

To demonstrate the usage of the methods we try to set the value of the bal-select to tennis.

<bal-app>
  <bal-select placeholder="Choose your hobby">
    <bal-select-option label="Tennis" value="tennis">
      Tennis
    </bal-select-option>
    <bal-select-option label="Soccer" value="soccer">
      Soccer
    </bal-select-option>
    <bal-select-option label="Other" value="other">
      Other
    </bal-select-option>
  </bal-select>
</bal-app>

To access the component use [useRef](https://reactjs.org/docs/hooks-reference.html#useref) in React.
Link then the ref with the element, after that the methods of the component can be accessed.

```tsx
import { BalSelect, BalSelectOption, BalButton } from '@baloise/design-system-components-react'
import { useRef } from 'react'

function MethodComponent() {
  const selectRef = useRef<HTMLBalSelectElement>(null)

  function chooseTennis() {
    selectRef.current?.select('tennis')
  }

  return (
    <div>
      <BalSelect ref={selectRef} placeholder="Choose your hobby">
        <BalSelectOption label="Tennis" value="tennis">
          Tennis
        </BalSelectOption>
        <BalSelectOption label="Soccer" value="soccer">
          Soccer
        </BalSelectOption>
        <BalSelectOption label="Other" value="other">
          Other
        </BalSelectOption>
      </BalSelect>
      <BalButton class="mt-normal" onClick={() => chooseTennis()}>
        Choose Tennis
      </BalButton>
    </div>
  )
}

export default MethodComponent
```
