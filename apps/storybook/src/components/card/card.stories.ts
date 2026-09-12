import type { JSX } from '@baloise/ds-core'
import {
  BrandIconInvestSaveChfPurple,
  BrandIconInvestSaveChfRed,
  BrandIconSavingComfortKidsTangerine,
} from '@baloise/ds-assets'
import type { Meta } from '@storybook/html-vite'
import { lorem1, props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsCard & { slot: string; slotHeader: string }

const meta: Meta<Args> = {
  title: 'Components/Card/Variants',
  args: {
    slotHeader: 'Heading',
    slot: lorem1,
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-card' }),
  },
  ...withRender(
    ({ slot, slotHeader, ...args }) => `
<ds-card ${props(args)}>
  <ds-card-header>
    <ds-card-title>${slotHeader}</ds-card-title>
    <ds-close></ds-close>
  </ds-card-header>
  <ds-card-content>
    ${slot}
  </ds-card-content>
  <ds-card-actions>
    <ds-button color="secondary">Button</ds-button>
    <ds-button>Button</ds-button>
  </ds-card-actions>
</ds-card>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

// Basic
// ------------------------------------------------------

export const Basic = Story({})
Basic.storyName = '🧩 Basic'

export const BasicHtml = Story({
  ...withRender(
    ({ slot, slotHeader }) => `
<article class="ds-card">
  <header class="ds-card-header">
    <h3 class="ds-title">${slotHeader}</h3>
    <ds-close></ds-close>
  </header>
  <div class="ds-card-content">
    ${slot}
  </div>
  <footer class="ds-card-actions">
    <button class="ds-button is-secondary">Button</button>
    <button class="ds-button">Button</button>
  </footer>
</article>`,
  ),
})
BasicHtml.storyName = '🌍 Basic'

// Tile
// ------------------------------------------------------

export const Tile = Story({
  ...withRender(
    ({ slot }) => `
<ds-card tile>
  <ds-tag position="right" color="yellow" size="sm">Discount</ds-tag>
  <ds-card-header>
    <ds-brand-icon tile size="sm" svg='${BrandIconSavingComfortKidsTangerine}' color="yellow"></ds-brand-icon>
    <ds-card-title>Tile</ds-card-title>
    <ds-card-subtitle>Subtitle</ds-card-subtitle>
    <ds-toggle dense></ds-toggle>
  </ds-card-header>
  <ds-card-content>
    ${slot}
  </ds-card-content>
</ds-card>`,
  ),
})
Tile.storyName = '🧩 Tile'

export const TileHtml = Story({
  ...withRender(
    ({ slot }) => `
<article class="ds-card is-tile">
  <span class="ds-tag is-right is-yellow is-sm">Discount</span>
  <header class="ds-card-header">
    <ds-brand-icon size="sm" tile svg='${BrandIconSavingComfortKidsTangerine}' color="yellow"></ds-brand-icon>
    <h3 class="ds-title">Tile</h3>
    <p>Subtitle</p>
    <ds-toggle dense></ds-toggle>
  </header>
  <div class="ds-card-content">
    ${slot}
  </div>
</article>`,
  ),
})
TileHtml.storyName = '🌍 Tile'

// Centered
// ------------------------------------------------------

export const Centered = Story({
  ...withRender(
    ({ slot, slotHeader }) => `
<ds-card color="yellow-light" align="center">
  <ds-card-header>
    <ds-card-title>${slotHeader}</ds-card-title>
  </ds-card-header>
  <ds-card-content>
    ${slot}
  </ds-card-content>
  <ds-card-actions>
    <ds-button>Button</ds-button>
  </ds-card-actions>
</ds-card>`,
  ),
})
Centered.storyName = '🧩 Centered'

export const CenteredHtml = Story({
  ...withRender(
    ({ slot, slotHeader }) => `
<article class="ds-card align-center is-yellow-light">
  <header class="ds-card-header">
    <h3 class="ds-title">${slotHeader}</h3>
  </header>
  <div class="ds-card-content">
    ${slot}
  </div>
  <footer class="ds-card-actions">
    <button class="ds-button">Button</button>
  </footer>
</article>`,
  ),
})
CenteredHtml.storyName = '🌍 Centered'

// Colors
// ------------------------------------------------------

export const Colors = Story({
  ...withRender(
    () => `
<ds-card>
  <ds-card-header><ds-card-title>Default</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="primary">
  <ds-card-header><ds-card-title>Primary</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="grey">
  <ds-card-header><ds-card-title>Grey</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="dashed">
  <ds-card-header><ds-card-title>Dashed</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="red">
  <ds-card-header><ds-card-title>Red</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="red-dark">
  <ds-card-header><ds-card-title>Red Dark</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="yellow">
  <ds-card-header><ds-card-title>Yellow</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="yellow-dark">
  <ds-card-header><ds-card-title>Yellow Dark</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="purple">
  <ds-card-header><ds-card-title>Purple</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="purple-dark">
  <ds-card-header><ds-card-title>Purple Dark</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="green">
  <ds-card-header><ds-card-title>Green</ds-card-title></ds-card-header>
</ds-card>
<ds-card color="green-dark">
  <ds-card-header><ds-card-title>Green Dark</ds-card-title></ds-card-header>
</ds-card>`,
  ),
})
Colors.storyName = '🧩 Colors'

export const ColorsHtml = Story({
  ...withRender(
    () => `
<article class="ds-card">
  <header class="ds-card-header"><h3 class="ds-title">Default</h3></header>
</article>
<article class="ds-card is-primary">
  <header class="ds-card-header"><h3 class="ds-title">Primary</h3></header>
</article>
<article class="ds-card is-grey">
  <header class="ds-card-header"><h3 class="ds-title">Grey</h3></header>
</article>
<article class="ds-card is-dashed">
  <header class="ds-card-header"><h3 class="ds-title">Dashed</h3></header>
</article>
<article class="ds-card is-red">
  <header class="ds-card-header"><h3 class="ds-title">Red</h3></header>
</article>
<article class="ds-card is-red-dark">
  <header class="ds-card-header"><h3 class="ds-title">Red Dark</h3></header>
</article>
<article class="ds-card is-yellow">
  <header class="ds-card-header"><h3 class="ds-title">Yellow</h3></header>
</article>
<article class="ds-card is-yellow-dark">
  <header class="ds-card-header"><h3 class="ds-title">Yellow Dark</h3></header>
</article>
<article class="ds-card is-purple">
  <header class="ds-card-header"><h3 class="ds-title">Purple</h3></header>
</article>
<article class="ds-card is-purple-dark">
  <header class="ds-card-header"><h3 class="ds-title">Purple Dark</h3></header>
</article>
<article class="ds-card is-green">
  <header class="ds-card-header"><h3 class="ds-title">Green</h3></header>
</article>
<article class="ds-card is-green-dark">
  <header class="ds-card-header"><h3 class="ds-title">Green Dark</h3></header>
</article>`,
  ),
})
ColorsHtml.storyName = '🌍 Colors'

// Spaces
// ------------------------------------------------------

export const Spaces = Story({
  ...withRender(
    ({ slot }) => `
<ds-card space="sm">
  <ds-card-header><ds-card-title>Small</ds-card-title></ds-card-header>
  <ds-card-content>${slot}</ds-card-content>
</ds-card>
<ds-card>
  <ds-card-header><ds-card-title>Normal</ds-card-title></ds-card-header>
  <ds-card-content>${slot}</ds-card-content>
</ds-card>
<ds-card space="lg">
  <ds-card-header><ds-card-title>Large</ds-card-title></ds-card-header>
  <ds-card-content>${slot}</ds-card-content>
</ds-card>`,
  ),
})
Spaces.storyName = '🧩 Spaces'

export const SpacesHtml = Story({
  ...withRender(
    ({ slot }) => `
<article class="ds-card has-space-sm">
  <header class="ds-card-header">
    <h3 class="ds-title">Small</h3>
  </header>
  <div class="ds-card-content">${slot}</div>
</article>
<article class="ds-card">
  <header class="ds-card-header">
    <h3 class="ds-title">Normal</h3>
  </header>
  <div class="ds-card-content">${slot}</div>
</article>
<article class="ds-card has-space-lg">
  <header class="ds-card-header">
    <h3 class="ds-title">Large</h3>
  </header>
  <div class="ds-card-content">${slot}</div>
</article>`,
  ),
})
SpacesHtml.storyName = '🌍 Spaces'

// Combi Header
// ------------------------------------------------------

export const CombiHeader = Story({
  ...withRender(
    () => `
<div class="ds-stack">
  <ds-card>
    <ds-card-header>
      <ds-card-title>
        Combi Header with a very long title that should be wrapping to the next line
        <ds-tag-group>
          <ds-tag color="purple-light">Tag 1</ds-tag>
          <ds-tag color="yellow-light">Tag 2</ds-tag>
        </ds-tag-group>
      </ds-card-title>

      <div class="ds-stack as-row align-center">
        <ds-button-group>
          <ds-button color="secondary">Button</ds-button>
          <ds-button>Button</ds-button>
        </ds-button-group>
        <ds-toggle dense></ds-toggle>
      </div>

      <ds-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit</ds-card-subtitle>
    </ds-card-header>
  </ds-card>

  <ds-card>
    <ds-card-header>
      <ds-card-title>
        Combi Header
        <ds-tag color="purple-light">Tag 1</ds-tag>
      </ds-card-title>
      <ds-close></ds-close>
      <ds-card-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit</ds-card-subtitle>
    </ds-card-header>
  </ds-card>
</div>`,
  ),
})
CombiHeader.storyName = '🧩 Combi Header'

export const CombiHeaderHtml = Story({
  ...withRender(
    () => `
<div class="ds-stack">
  <article class="ds-card">
    <header class="ds-card-header">
      <h3 class="ds-title">
        Combi Header with a very long title that should be wrapping to the next line
        <div class="ds-tags">
          <span class="ds-tag is-purple-light">Tag 1</span>
          <span class="ds-tag is-yellow-light">Tag 2</span>
        </div>
      </h3>

      <div class="ds-stack as-row align-center">
        <div class="ds-buttons flex-1 is-right">
          <button class="ds-button is-secondary is-sm">Button</button>
          <button class="ds-button is-sm">Button</button>
        </div>
        <ds-toggle dense></ds-toggle>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    </header>
  </article>
  <article class="ds-card">
    <header class="ds-card-header">
      <h3 class="ds-title">Combi Header <span class="ds-tag is-purple-light">Tag 1</span></h3>

      <ds-close></ds-close>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    </header>
  </article>
</div>`,
  ),
})
CombiHeaderHtml.storyName = '🌍 Combi Header'

// Fullheight
// ------------------------------------------------------

export const Fullheight = Story({
  ...withRender(
    () => `
<div class="ds-grid">
  <div class="ds-col is-one-third">
    <ds-card color="purple" fullheight>
      <ds-tag color="purple-dark" position="left">BESTSELLER</ds-tag>
      <ds-card-content>
        <div class="ds-stack align-center">
          <ds-brand-icon svg='${BrandIconInvestSaveChfPurple}'></ds-brand-icon>
          <div class="ds-stack-content align-top-center">
            <ds-card-title>Teaser Card</ds-card-title>
            <span class="ds-text is-centered">
              The item component can easily be combined with the card component to achieve a nice teaser layout.
            </span>
          </div>
        </div>
      </ds-card-content>
      <ds-card-actions align="center">
        <ds-button>Read more</ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
  <div class="ds-col is-one-third">
    <ds-card color="yellow" fullheight>
      <ds-tag color="yellow-dark" position="center">BESTSELLER</ds-tag>
      <ds-card-content>
        <div class="ds-stack align-center">
          <ds-brand-icon svg='${BrandIconSavingComfortKidsTangerine}'></ds-brand-icon>
          <div class="ds-stack-content align-top-center">
            <ds-card-title>Auto Height</ds-card-title>
            <span class="ds-text is-centered">The height of the cards adjust to the longest in the row.</span>
          </div>
        </div>
      </ds-card-content>
      <ds-card-actions align="center">
        <ds-button>Read more</ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
  <div class="ds-col is-one-third">
    <ds-card color="red" fullheight>
      <ds-tag color="red-dark" position="right">BESTSELLER</ds-tag>
      <ds-card-content>
        <div class="ds-stack align-center">
          <ds-brand-icon svg='${BrandIconInvestSaveChfRed}'></ds-brand-icon>
          <div class="ds-stack-content align-top-center">
            <ds-card-title>Item Component</ds-card-title>
            <span class="ds-text is-centered">
              Item is used to easily group components and not be concerned about the correct spacing.
            </span>
          </div>
        </div>
      </ds-card-content>
      <ds-card-actions align="center">
        <ds-button>Read more</ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
</div>`,
  ),
})
Fullheight.storyName = '🧩 Fullheight'

export const FullheightHtml = Story({
  ...withRender(
    () => `
<div class="ds-grid">
  <div class="ds-col is-one-third">
    <article class="ds-card is-purple is-fullheight">
      <span class="ds-tag is-purple-dark is-left">BESTSELLER</span>
      <div class="ds-card-content ds-stack align-center">
        <ds-brand-icon svg='${BrandIconInvestSaveChfPurple}'></ds-brand-icon>
        <div class="ds-stack-content align-top-center">
          <h3 class="ds-heading">Teaser Card</h3>
          <span class="ds-text is-centered">
            The item component can easily be combined with the card component to achieve a nice teaser layout.
          </span>
        </div>
        <a href="#" class="ds-button">Read more</a>
      </div>
    </article>
  </div>
  <div class="ds-col is-one-third">
    <article class="ds-card is-yellow is-fullheight">
      <span class="ds-tag is-yellow-dark is-center">BESTSELLER</span>
      <div class="ds-card-content ds-stack align-center">
        <ds-brand-icon svg='${BrandIconSavingComfortKidsTangerine}'></ds-brand-icon>
        <div class="ds-stack-content align-top-center">
          <h3 class="ds-heading is-centered">Auto Height</h3>
          <span class="ds-text is-centered">The height of the cards adjust to the longest in the row.</span>
        </div>
        <a href="#" class="ds-button">Read more</a>
      </div>
    </article>
  </div>
  <div class="ds-col is-one-third">
    <article class="ds-card is-red is-fullheight">
      <span class="ds-tag is-red-dark is-right">BESTSELLER</span>
      <div class="ds-card-content ds-stack align-center">
        <ds-brand-icon svg='${BrandIconInvestSaveChfRed}'></ds-brand-icon>
        <div class="ds-stack-content align-top-center">
          <h3 class="ds-heading is-centered">Item Component</h3>
          <span class="ds-text is-centered">
            Item is used to easily group components and not be concerned about the correct spacing.
          </span>
        </div>
        <a href="#" class="ds-button">Read more</a>
      </div>
    </article>
  </div>
</div>`,
  ),
})
FullheightHtml.storyName = '🌍 Fullheight'

// Images
// ------------------------------------------------------

export const Images = Story({
  ...withRender(
    () => `
<div class="ds-grid">
  <div class="ds-col is-one-third">
    <ds-card dense space="sm">
      <picture>
        <img src="/assets/images/placeholder.png" alt="placeholder" />
      </picture>
      <ds-card-header>
        <h3>
          <span class="ds-title">Dense Card</span>
          <span class="ds-subtitle">Subtitle</span>
        </h3>
      </ds-card-header>
      <ds-card-content>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </ds-card-content>
      <ds-card-actions>
        <ds-button icon="plus" color="link" flat> Button </ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
  <div class="ds-col is-one-third">
    <ds-card color="purple-light" space="sm">
      <picture>
        <img src="/assets/images/placeholder.png" alt="placeholder" />
      </picture>
      <ds-card-header>
        <h3>
          <span class="ds-title">Default Card</span>
          <span class="ds-subtitle">Subtitle</span>
        </h3>
      </ds-card-header>
      <ds-card-content>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </ds-card-content>
      <ds-card-actions>
        <ds-button icon="plus" color="link" flat> Button </ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
  <div class="ds-col is-one-third">
    <ds-card image-teaser space="sm">
      <a slot="picture" class="ds-image-link" href="#" aria-hidden="true" tabindex="-1">
        <picture>
          <img src="/assets/images/placeholder.png" alt="placeholder" />
        </picture>
      </a>

      <ds-tag size="sm">Tag</ds-tag>

      <ds-card-header>
        <h3>
          <span class="ds-title">Image Teaser Card</span>
          <span class="ds-subtitle">Subtitle</span>
        </h3>
      </ds-card-header>
      <ds-card-content>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </ds-card-content>
      <ds-card-actions>
        <ds-button color="secondary" wide> Button </ds-button>
      </ds-card-actions>
    </ds-card>
  </div>
</div>`,
  ),
})
Images.storyName = '🧩 Images'

export const ImagesHtml = Story({
  ...withRender(
    () => `
<div class="ds-grid">
  <div class="ds-col is-one-third">
    <article class="ds-card is-dense has-space-sm">
      <picture>
        <img src="/assets/images/placeholder.png" alt="placeholder" />
      </picture>
      <div class="ds-card-content">
        <h3>
          <span class="ds-title">Dense Card</span>
          <span class="ds-subtitle">Subtitle</span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
          reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
          iusto. Distinctio, ab?
        </p>
      </div>
      <footer class="ds-card-actions">
        <button class="ds-button is-link is-flat">
          <ds-icon name="plus"></ds-icon>
          Button
        </button>
      </footer>
    </article>
  </div>
  <div class="ds-col is-one-third">
    <article class="ds-card is-purple-light has-space-sm">
      <picture>
        <img src="/assets/images/placeholder.png" alt="placeholder" />
      </picture>
      <div class="ds-card-content">
        <h3>
          <span class="ds-title">Default Card</span>
          <span class="ds-subtitle">Subtitle</span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
          reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
          iusto. Distinctio, ab?
        </p>
      </div>
      <footer class="ds-card-actions">
        <button class="ds-button is-link is-flat">
          <ds-icon name="plus"></ds-icon>
          Button
        </button>
      </footer>
    </article>
  </div>
  <div class="ds-col is-one-third">
    <div class="ds-image-teaser">
      <picture>
        <img src="/assets/images/placeholder.png" alt="placeholder" />
      </picture>
      <article class="ds-card has-space-sm">
        <span class="ds-tag is-sm">Tag</span>
        <div class="ds-card-content">
          <h3>
            <span class="ds-title">Image Teaser Card</span>
            <span class="ds-subtitle">Subtitle</span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
            reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
            iusto. Distinctio, ab?
          </p>
        </div>
        <footer class="ds-card-actions">
          <button class="ds-button is-secondary is-wide">Button</button>
        </footer>
      </article>
    </div>
  </div>
</div>`,
  ),
})
ImagesHtml.storyName = '🌍 Images'

// Image Teaser
// ------------------------------------------------------

export const ImageTeaser = Story({
  ...withRender(
    () => `
<ds-card image-teaser="wide">
  <a slot="picture" class="ds-image-link" href="#" aria-hidden="true" tabindex="-1">
    <picture>
      <img src="/assets/images/placeholder.png" alt="placeholder" />
    </picture>
  </a>

  <ds-card-header>
    <h3>
      <span class="ds-title">Image Teaser Default</span>
      <span class="ds-subtitle">Full width on mobile</span>
    </h3>
  </ds-card-header>

  <ds-card-content>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit, reprehenderit
    sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo iusto. Distinctio,
    ab?
  </ds-card-content>

  <ds-card-actions>
    <ds-button> Button </ds-button>
  </ds-card-actions>
</ds-card>

<hr class="ds-divider has-space-md" />

<ds-card image-teaser="wide-center">
  <a slot="picture" class="ds-image-link" href="#" aria-hidden="true" tabindex="-1">
    <picture>
      <img src="/assets/images/placeholder.png" alt="placeholder" />
    </picture>
  </a>

  <ds-card-header>
    <h3>
      <span class="ds-title">Image Teaser Center</span>
      <span class="ds-subtitle">Full width on mobile</span>
    </h3>
  </ds-card-header>

  <ds-card-content>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit, reprehenderit
    sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo iusto. Distinctio,
    ab?
  </ds-card-content>

  <ds-card-actions>
    <ds-button> Button </ds-button>
  </ds-card-actions>
</ds-card>

<hr class="ds-divider has-space-md" />

<ds-card image-teaser="wide-right">
  <a slot="picture" class="ds-image-link" href="#" aria-hidden="true" tabindex="-1">
    <picture>
      <img src="/assets/images/placeholder.png" alt="placeholder" />
    </picture>
  </a>

  <ds-card-header>
    <h3>
      <span class="ds-title">Image Teaser Right</span>
      <span class="ds-subtitle">Full width on mobile</span>
    </h3>
  </ds-card-header>

  <ds-card-content>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit, reprehenderit
    sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo iusto. Distinctio,
    ab?
  </ds-card-content>

  <ds-card-actions>
    <ds-button> Button </ds-button>
  </ds-card-actions>
</ds-card>`,
  ),
})
ImageTeaser.storyName = '🧩 Image Teaser'

export const ImageTeaserHtml = Story({
  ...withRender(
    () => `
<article class="ds-image-teaser is-wide">
  <a class="ds-image-link" href="#" aria-hidden="true" tabindex="-1">
    <picture>
      <img src="/assets/images/placeholder.png" alt="placeholder" />
    </picture>
  </a>
  <div class="ds-card">
    <div class="ds-card-content">
      <h3>
        <span class="ds-title">Image Teaser Default</span>
        <span class="ds-subtitle">Full width on mobile</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </p>
    </div>
    <footer class="ds-card-actions">
      <button class="ds-button">Button</button>
    </footer>
  </div>
</article>

<hr class="ds-divider has-space-md" />

<article class="ds-image-teaser is-wide is-center">
  <picture>
    <img src="/assets/images/placeholder.png" alt="placeholder" />
  </picture>
  <div class="ds-card">
    <div class="ds-card-content">
      <h3>
        <span class="ds-title">Image Teaser Center</span>
        <span class="ds-subtitle">Full width on mobile</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </p>
    </div>
    <footer class="ds-card-actions">
      <button class="ds-button">Button</button>
    </footer>
  </div>
</article>

<hr class="ds-divider has-space-md" />

<article class="ds-image-teaser is-wide is-right">
  <picture>
    <img src="/assets/images/placeholder.png" alt="placeholder" />
  </picture>
  <div class="ds-card">
    <div class="ds-card-content">
      <h3>
        <span class="ds-title">Image Teaser Right</span>
        <span class="ds-subtitle"">Full width on mobile</span>
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ipsum laudantium earum est odit,
        reprehenderit sit ad cum deleniti sequi delectus recusandae temporibus minima impedit officiis explicabo
        iusto. Distinctio, ab?
      </p>
    </div>
    <footer class="ds-card-actions">
      <button class="ds-button">Button</button>
    </footer>
  </div>
</article>`,
  ),
})
ImageTeaserHtml.storyName = '🌍 Image Teaser'
