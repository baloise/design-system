# Spacing

Consistent spacing creates visual balance that makes the user interface (UI) easier for users to scan. Apply consistent spacing to improve the quality of the UI.

---
## Principles

### Create visual rythm

We use incrementally measured spacing to create harmonious arrangements of components and text. This gives the elements a predictable rhythm, which makes the experience as a whole feel intentional and well designed. 

### Precise but flexible

Beyond mathematical precision, spacing also reacts to the objects it surrounds, giving more space to larger objects, less to small. Optical adjustments can also be made if an element looks off and the spacing needs a nudge to make things feel right.

---

## Base grid

The Base Grid is the main metric reference of our system from which the rest of the layout structures are built. It defines the starting point of the dimensions, as well as the paddings and margins of the elements of the interface.

The grid is constructed from a base 8px module, so that both the dimensions of the elements and the distances between them will always be multiples of 8: 16, 24, 32, 40, 48 …

![8px-grid](/assets/images/spacing/image 1.png)

This provides a common metric pattern that creates a visual coherence and consistency between the different elements of the system and their spatial relationships.

This grid favors an efficient workflow, reducing the number of design decisions, as well as creating a shared visual language between designers and developers.

Specifying a metric unit of 8px helps maintain visual consistency and lets you take advantage of its other benefits. There may be situations, however, where a value ​​smaller than 8px is required. The 4px unit is available for these cases.

Values ​​less than 8 px are primarily associated with the anatomy of the interface's basic elements, rather than specifying the distance between elements and page composition. Using Atomic Design's terminology, these minimum measurements should be used almost exclusively to define the internal anatomy of elements like atoms or molecules. 

To learn more about the 8 px grid, see the articles listed below that have served as reference and inspiration for us to adopt this pattern:

[8pt Grid](https://spec.fm/specifics/8-pt-grid)

[Intro to The 8-Point Grid System](https://tanzu.vmware.com/content/built-to-adapt/intro-to-the-8-point-grid-system-2)
