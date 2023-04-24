---
'@baloise/design-system-components': major
---

add new `steps` component with options property and overflow solution

**before**

```html
<bal-tabs interface="o-steps" value="tab-a">
  <bal-tab-item done value="tab-a" label="Tab A">Content of Tab A</bal-tab-item>
</bal-tabs>
```

**after**

The interface of the components are the same as before.
Only the tag names of the component changed and to pass the `interface` property is not needed anymore.

```html
<bal-steps value="tab-a">
  <bal-step-item done value="tab-a" label="Tab A">Content of Tab A</bal-step-item>
</bal-steps>
```
