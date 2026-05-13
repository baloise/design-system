---
name: add-component-logger
description: Use when adding a logger to a Stencil component in the Baloise Design System — wires up the Loggable interface, Logger decorator, and LogInstance field
---

# Add Component Logger

## Overview

Every Stencil component in the design system should implement the `Loggable` interface and wire up the `@Logger` decorator. This enables debug output via `window.DesignSystem.config.logger` without touching component code.

## Checklist

Work through these four steps in order on the target component file:

**1. Import**

Add `Loggable`, `Logger`, and `LogInstance` to the existing `../../utils/log` import (or add the import if missing):

```ts
import { Loggable, Logger, LogInstance } from '../../utils/log'
```

**2. Implements**

Add `Loggable` to the class `implements` list:

```ts
export class MyComponent implements ComponentInterface, Loggable {
```

**3. Field**

Add `log!: LogInstance` at the top of the class body, before any `@State` or `@Prop` declarations:

```ts
log!: LogInstance
```

**4. Decorator + method**

Add the `@Logger` block immediately after the field. Use the tag value from `@Component({ tag: '...' })` as the argument:

```ts
@Logger('ds-my-component')
createLogger(log: LogInstance) {
  this.log = log
}
```

## Result

```ts
import { Component, ComponentInterface, h, Host } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({ tag: 'ds-my-component', styleUrl: 'my-component.host.scss' })
export class MyComponent implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('ds-my-component')
  createLogger(log: LogInstance) {
    this.log = log
  }

  // ... rest of component
}
```
