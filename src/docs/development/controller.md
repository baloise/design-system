# Write your own Controller

Controllers programmatically control the components. For example the `balToastController` adds toasts to the DOM.

## Define Controller File

Create your controller file in the component folder like `src/components/bal-component/bal-component.controller.ts` and add the following code.
Replace the `Component` placeholder with your component name.

```typescript
// src/components/bal-component/bal-component.controller.ts

interface ComponentOptions {
  // Define your options here
}

const createComponentController = () => {

  const method = (options: ComponentOptions): HTMLBalComponentElement => {
    // Define your method logic here
  };

  return {
    method,
  };
};

export const componentController = createComponentController();
```

## Link controller to the Project

To register the controller globally we have to add it to the `src/controllers.ts` file.

```typescript
// src/controllers.ts

import {componentController} from "./components/bal-component/bal-component.controller";

export default () => {
  const win = window;
  const BalUILibrary = (win as any).BalUILibrary = (win as any).BalUILibrary || {};
  /**
   * Place your controllers here ...
   */
  BalUILibrary.componentController = componentController;
  ...
};
```
