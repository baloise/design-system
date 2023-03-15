---
'@baloise/design-system-maps': minor
---

providing Google Maps styles and markers

The map markers and styles are provided in a separate package **@baloise/design-system-maps**.

First install our maps package

```
npm install @baloise/design-system-maps
npm install @types/googlemaps --save-dev
```

### Styles

After installing import the **balMapTypeStyles** into your Google Maps config object.

```typescript
import { balMapTypeStyles } '@baloise/design-system-maps'

const myMap = new google.maps.map(myMapElement, {
  ...
  styles: balMapTypeStyles
})
```

### Markers

To set a marker import the svg `balMapMarkerDefault` and pass it as the icon url.

```typescript
import { balMapMarkerDefault } '@baloise/design-system-maps'

new google.maps.Marker({
  position: { lat: 36.6163, lng: -100.61 },
  map,
  icon: {
    url: balMapMarkerDefault,
  },
  title: 'My Marker',
})
```
