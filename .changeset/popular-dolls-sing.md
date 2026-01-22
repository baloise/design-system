---
'@baloise/ds-core': major
---

**angular**: The design system now provides an Angular provider instead of the BaloiseDesignSystemModule.

This change simplifies maintenance, ensures the Angular library stays up to date, and removes support for deprecated or optional Angular parts.

The new provider is fully compatible with both Angular module-based applications and the latest Angular solutions.

**How to migrate**

1. In the app-module.ts replace the `BaloiseDesignSystemModule.forRoot(<config>)` with the provide function `provideBaloiseDesignSystem(<config>)`. `<config>` is the same type as before.

```ts
@NgModule({
  declarations: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [provideBrowserGlobalErrorListeners(), provideBaloiseDesignSystem()],
  bootstrap: [App],
})
export class AppModule {}
```

2. Remove the `BaloiseDesignSystemModule` in every other module and import the components you need instead or just all components with the bundle `BalComponentBundle`.

```ts
@NgModule({
  imports: [BalComponentBundle],
  // or component by component
  // imports: [BrowserModule, AppRoutingModule, BalLayoutBundle, BalHeading, BalButton],
  ...
})
export class SharedModule {}
```
3. Make sure only to import and use `@baloise/ds-angular`.
