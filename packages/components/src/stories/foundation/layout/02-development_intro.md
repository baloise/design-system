<bal-doc-banner id="story--foundation-typography-code--heading-and-display" subtitle="Foundation/Layout" color="purple">Code</bal-doc-banner>

<bal-doc-lead>This is the recommended layout structure for our Web Applications.</bal-doc-lead>

The layout is constructed with a container to give the content a max-width and a standard space to the right and left side of the screen. Navbar should be used for web applications and the Navigation for Webpages. The footer component automatically grabs the necessary links from our CMS so that they are always up to date.

- The `.container` is a simple utility class that allows you to center content on larger viewports and to reduce the main space.
  - Use `container is-compact` for sales funnels to reduce the max-width to a minimum.
  - [Documentation to the container](?path=/docs/foundation-grid-overview--page#containers)
- `.has-sticky-footer` css-class sticks the footer element to the bottom of the page.
