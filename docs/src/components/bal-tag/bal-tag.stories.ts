import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import {
  createCssMappings,
  cssClasses,
  props,
  StoryFactory,
  withComponentControls,
  withContent,
  withDefaultContent,
  withRender,
} from '../../utils'

type Args = JSX.BalTag & { content: string }

const tag = 'bal-tag'
const css = createCssMappings(tag)

const meta: Meta<Args> = {
  title: 'Components/Data Display/Tag',
  args: {
    ...withDefaultContent(),
    color: undefined,
    closable: false,
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-tag' }),
  },
  ...withRender(
    ({ content, ...args }) => `
<span ${cssClasses(
      {
        ...css('color', (color: string) => `is-${color}`),
        ...css('size', (size: string) => `is-${size}`),
      },
      args,
      'tag',
    )}>
  ${
    args.icon
      ? `
  <bal-icon name="${args.icon}" size="small"></bal-icon>`
      : ''
  }${content}${
    args.closable
      ? `
  <button class="close" aria-label="remove tag"></button>`
      : ''
  }
</span>
`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const WebComponentBasic = Story({
  ...withRender(({ content, ...args }) => `<bal-tag ${props(args)}>${content}</bal-tag>`),
})

export const Closable = Story({
  args: {
    closable: true,
  },
})

export const TagGroup = Story({
  ...withRender(
    () => `
<div class="tags">
  <span class="tag">Primary</span>
  <span class="tag is-success">Success</span>
  <span class="tag is-danger">Danger</span>
</div>`,
  ),
})

export const Colors = Story({
  ...withRender(
    () => `
<div class="tags">
  <span class="tag">Default</span>
  <span class="tag is-primary">Primary</span>
  <span class="tag is-info">Info</span>
  <span class="tag is-success">Success</span>
  <span class="tag is-warning">Warning</span>
  <span class="tag is-danger">Danger</span>
</div>
<br>
<div class="tags">
  <span class="tag is-purple">Purple</span>
  <span class="tag is-red">Red</span>
  <span class="tag is-yellow">Yellow</span>
  <span class="tag is-green">Green</span>
</div>
<br>
<div class="tags">
  <span class="tag is-purple-light">Purple</span>
  <span class="tag is-red-light">Red</span>
  <span class="tag is-yellow-light">Yellow</span>
  <span class="tag is-green-light">Green</span>
</div>
<br>
<div class="tags">
  <span class="tag is-disabled">Disabled</span>
</div>
    `,
  ),
})

export const TagCard = Story({
  ...withRender(
    () => `
<article class="card is-flat is-outlined">
    <header class="card-header">
      <h3 class="title">Combi Header</h3>
      <div class="tags">
        <span class="tag is-purple-light">Tag 1</span>
        <span class="tag is-yellow-light">Tag 2</span>
      </div>
    </header>
    <div class="card-content">
      This is a card with tags positioned at the top right corner of the header.
    </div>
  </article>
      `,
  ),
})

export const TeaserCard = Story({
  ...withRender(
    () => `
<article class="card is-purple-lighter is-fullheight" aria-labelledby="teaser-card-title-1">
  <span class="tag is-purple-dark">BESTSELLER</span>
  <div class="card-content stack align-center">
    <bal-icon
      svg='&lt;svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 80"&gt;&lt;path fill="#000D6E" d="M48.92 70.5a3.208 3.208 0 1 0 6.417 0v-8.496a20.538 20.538 0 0 1-6.417 1.386v7.11zM20.685 70.5a3.208 3.208 0 1 0 6.417 0V63.44a20.302 20.302 0 0 1-6.417-1.848V70.5z"/&gt;&lt;path fill="#6C2273" d="M74.588 33.922a1.283 1.283 0 0 0-1.283 1.284v2.926a2.31 2.31 0 0 1-2.567 2.208h-1.284a23.333 23.333 0 0 0-11.55-20.535 12.14 12.14 0 0 1-1.438 5.133H35.033a12.167 12.167 0 0 1-1.514-5.775c.016-.646.085-1.29.205-1.925h-2.259a10.267 10.267 0 0 0-9.497-6.417v7.854A22.385 22.385 0 0 0 9.134 32.64H7.209A3.209 3.209 0 0 0 4 35.847v8.984a3.209 3.209 0 0 0 3.209 3.209h1.925A22.589 22.589 0 0 0 20.71 61.465a20.304 20.304 0 0 0 6.392 1.976c.77 0 1.54.128 2.31.128H48.92c2.2-.114 4.366-.583 6.417-1.386a22.921 22.921 0 0 0 13.99-19.277h1.54A4.877 4.877 0 0 0 76 38.132v-2.926a1.283 1.283 0 0 0-1.412-1.284zm-55.187-1.591a2.9 2.9 0 1 1 2.875 2.875A2.875 2.875 0 0 1 19.4 32.33z"/&gt;&lt;path fill="#B8B2FF" d="M35.033 24.938H56.39a12.14 12.14 0 0 0 1.515-5.133c.012-.231.012-.462 0-.693a12.166 12.166 0 0 0-24.18-1.874c-.12.635-.189 1.279-.205 1.925a12.167 12.167 0 0 0 1.514 5.775z"/&gt;&lt;/svg&gt;'
      color="auto"
      size="xx-large"
    ></bal-icon>
    <div class="stack-content align-center">
      <h3 class="title" id="teaser-card-title-1 is-centered">Teaser Card</h3>
      <span class="text is-centered">
        The item component can easily be combined with the card component to achieve a nice teaser layout.
      </span>
    </div>
    <a href="#" class="button">Read more</a>
  </div>
</article>
      `,
  ),
})
