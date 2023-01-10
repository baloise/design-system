## Component Usage

Each component set has its own module like the BalCardModule has all his sub-components already included, so no need to also try to import a BalCardTitleModule.
After importing the Baloise Design System Angular components, the components can be used inside the `bal-app` component.

**app.module.ts**

```typescript
import { BalCoreModule, BalHeadingModule } from '@baloise/design-system-components-angular';

@NgModule({
  ...
  imports: [
    BalCoreModule.forRoot(),
    // Each component set needs to be imported
    BalHeadingModule,
  ],
  ...
})
export class AppModule {}
```

**app.component.html**

```html
<bal-app>
  <main class="container">
    <bal-heading>Hello World</bal-heading>
  <main>
</bal-app>
```

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

**app.component.ts**

```ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  buttonColor = 'info'
}
```

**app.component.html**

```html
<bal-button color="info">My info button</bal-button>

<!-- To bind a value use the [] around the prop -->
<bal-button [color]="buttonColor">My info button</bal-button>
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

In Angular the events are written like that `(balEventName)="yourComponentHandler($event.detail)"`.

`$event.detail` returns the main value of the event.

**app.component.html**

```html
<bal-input placeholder="Tell us your name" [value]="myName" (balInput)="updateName($event.detail)"></bal-input>
<bal-text>My name is {{ myName }}</bal-text>
```

**app.component.ts**

```ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent {
  myName?: string

  updateName(value: string | undefined) {
    this.myName = value
  }
}
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

To create a reference to a component use the property decorator [@ViewChild](https://angular.io/api/core/ViewChild).
Mark the component in the template with `#yourReferenceName` and link it to the `@ViewChild` in the component class.
To access the method of the component use the reference directly.

**app.component.html**

```html
<bal-select #mySelect placeholder="Choose your hobby">
  <bal-select-option label="Tennis" value="tennis">Tennis</bal-select-option>
  <bal-select-option label="Soccer" value="soccer">Soccer</bal-select-option>
  <bal-select-option label="Other" value="other">Other</bal-select-option>
</bal-select>
<bal-button class="mt-normal" (click)="chooseTennis()">Choose Tennis</bal-button>
```

**app.component.ts**

```ts
import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'
import { ProxyComponent } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
})
export class MethodComponent {
  @ViewChild('mySelect') mySelect!: ProxyComponent<Components.BalSelect>

  chooseTennis(): void {
    this.mySelect.el.select('tennis')
  }
}
```
