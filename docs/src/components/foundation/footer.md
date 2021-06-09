# Footer

Basic footer for the Baloise Applications.

## Basic

The footer runs pure in blue or with a decorated track line below.

<docs-demo>
  <footer class="footer">
    <div class="container">Footer</div>
  </footer>
</docs-demo>

```html
<footer class="footer">
  <div class="container">Footer</div>
</footer>
```

## With Track Line

<docs-demo>
  <footer class="footer has-track-line">
    <div class="container">Footer</div>
  </footer>
</docs-demo>

```html
<footer class="footer has-track-line">
  <div class="container">Footer</div>
</footer>
```

## Sticky Footer

To stick the footer at the end of the page add the class `has-sticky-footer` to your body and apply the same structure as shown in the belows example.

```html
<body class="bal-app has-sticky-footer">
  <main>
    <div class="container">
      <!-- Page content -->
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <!-- Footer content -->
    </div>
  </footer>
</body>
```

### Angular Sticky Footer

In angular the setup for a sticky footer is slightly diffrent.

#### index.html

The class `has-sticky-footer` must be on the outer element, which contains the `main` and `footer` element.

```html
<body class="bal-app">
  <app-root class="has-sticky-footer"></app-root>
</body>
```

#### app.component.html

In the app component we define the rest of the structure.

```html
<main>
  <div class="container">
    <!-- Page content -->
    <router-outlet></router-outlet>
  </div>
</main>
<footer class="footer">
  <div class="container">
    <!-- Footer content -->
  </div>
</footer>
```
