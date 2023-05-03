---
'@baloise/design-system-components-table': major
---

upgrade to `AG-Grid` v29. Breaking changes are the theming that changed from SASS variables to CSS variables.
Moreover, our styles are just an extension to the `AG-Grid` styles. 
Therefor please import them before the Baloise styles also check out our [documentation](https://design.baloise.dev/?path=/docs/components-table--basic#aggrid)

**before**

```scss
@import '@baloise/design-system-components-table/scss';
```

**after**

```scss
@import 'ag-grid-community/styles/ag-grid';
@import 'ag-grid-community/styles/ag-theme-alpine';
@import '@baloise/design-system-components-table/css/design-system-table';
```
