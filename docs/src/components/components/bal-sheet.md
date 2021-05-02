# bal-sheet

<!-- START: human documentation top -->

The sheet component is used to show content over the whole page at the bottem of it.

<!-- END: human documentation top -->

## Basic

<ClientOnly> <docs-demo-bal-sheet-81></docs-demo-bal-sheet-81></ClientOnly>

```html
<bal-sheet>
  <div class="is-hidden-desktop">
    <bal-button expanded>Action for 1'234 CHF</bal-button>
    <bal-button expanded color="link">Link</bal-button>
  </div>
  <div class="is-hidden-touch">
    <div class="columns">
      <div class="column is-flex is-align-items-center is-justify-content-center">
        <h2 class="title is-size-2 has-no-margin has-text-right">1'234 CHF</h2>
      </div>
      <div class="column is-flex is-align-items-center">
        <p class="has-no-margin has-text-blue-light-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div class="column">
        <bal-button expanded color="link">Link</bal-button>
      </div>
      <div class="column">
        <bal-button expanded>Action</bal-button>
      </div>
    </div>
  </div>
</bal-sheet>
```

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

## Links

- [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-sheet)
