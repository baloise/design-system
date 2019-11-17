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

const createBalComponentController = () => {

  const method = (options: ComponentOptions): HTMLBalComponentElement => {
    // Define your method logic here
  };

  return {
    method,
  };
};

export const balComponentController = createBalComponentController();
```

## Link controller to the Project

To register the controller globally we have to add it to the `src/controllers.ts` file.

```typescript
// src/controllers.ts

import {balComponentController} from "./components/bal-component/bal-component.controller";

(window as any).balComponentController = balComponentController;
```

To make the controller accessible from the library we have to add it to the `src/index.ts` too.

```typescript
// src/index.ts

export {balToastController} from "./components/bal-compontent/bal-compontent.controller";
```
