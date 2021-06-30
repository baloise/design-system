# Spacing

Consistent spacing creates visual balance that makes the user interface (UI) easier for users to scan. Apply consistent spacing to improve the quality of the UI.

## Principles

### Create visual rythm

We use incrementally measured spacing to create harmonious arrangements of components and text. This gives the elements a predictable rhythm, which makes the experience as a whole feel intentional and well designed.

### Precise but flexible

Beyond mathematical precision, spacing also reacts to the objects it surrounds, giving more space to larger objects, less to small. Optical adjustments can also be made if an element looks off and the spacing needs a nudge to make things feel right.

## Base grid

The Base Grid is the main metric reference of our system from which the rest of the layout structures are built. It defines the starting point of the dimensions, as well as the paddings and margins of the elements of the interface.

The grid is constructed from a base 8px module, so that both the dimensions of the elements and the distances between them will always be multiples of 8: 16, 24, 32, 40, 48 …

<docs-image text="8px-grid" link="/assets/images/spacing/8-pixel-grid.png" />

This provides a common metric pattern that creates a visual coherence and consistency between the different elements of the system and their spatial relationships.

This grid favors an efficient workflow, reducing the number of design decisions, as well as creating a shared visual language between designers and developers.

Specifying a metric unit of 8px helps maintain visual consistency and lets you take advantage of its other benefits. There may be situations, however, where a value ​​smaller than 8px is required. The 4px unit is available for these cases.

Values ​​less than 8 px are primarily associated with the anatomy of the interface's basic elements, rather than specifying the distance between elements and page composition. Using Atomic Design's terminology, these minimum measurements should be used almost exclusively to define the internal anatomy of elements like atoms or molecules.

To learn more about the 8 px grid, see the articles listed below that have served as reference and inspiration for us to adopt this pattern:

[8pt Grid](https://spec.fm/specifics/8-pt-grid)

[Intro to The 8-Point Grid System](https://tanzu.vmware.com/content/built-to-adapt/intro-to-the-8-point-grid-system-2)

## The spacing system

All spacing for components and typography is done in increments of 8px. This forms the basic unit of measurement for spacing.

<docs-image text="8px-grid" link="/assets/images/spacing/spacing-example.png" />

**8px grid**

Typography doesn’t use a traditional baseline grid. Instead, line heights are set in increments of 8px and spacing is measured from the edges of the text boxes.

<docs-image text="8px-grid" link="/assets/images/spacing/typography-spacing.png" />

Many components are sized in increments of 24px to match the line height of body text. This makes it easy to create harmonious arrangements of components and text

## Best practices

- Use multiples of 8px when defining measurements, spacing, and positioning elements.

- When necessary use 4px to make more fine tuned adjustments.

- Whenever possible, make sure that objects line up, both vertically and horizontally.

- Align your the edges of the text box to the grid, not the baseline of your text.

### How to choose spacing

<docs-image text="8px-grid" link="/assets/images/spacing/choose-spacing.png" />

Use less space between small components, or components that share a close functional relationship.

<docs-image text="8px-grid" link="/assets/images/spacing/spacing-between-components.png" />

Coordinate small and large values, to create visual groupings of related things. This helps users understand the interface and more easily find what they’re looking for. For screens with specialized layouts, adjust overall spacing based on the density of the content. For example, a simple login screen on desktop display has more room to breathe, so more space can be used.

### Common values

<docs-image text="8px-grid" link="/assets/images/spacing/spacing-button-icon.png"  />

8px between icon and text.

The [Button](/components/bal-button.html) component has this spacing built in.

<docs-image text="8px-grid" link="/assets/images/spacing/spacing-between-buttons.png" />

16px between buttons.

<docs-image text="8px-grid" link="/assets/images/spacing/spacing-between-form-fields.png" />

16 or 32px between form fields.

16px vertically, 32px horizontally. On mobile devices, horizontal spacing is 16px.
