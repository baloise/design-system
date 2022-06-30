import docs from './css.docs.mdx'
import { sourceCode } from '../../stories/utils'

export default {
  title: 'Design/CSS-Framework',
  parameters: {
    docs: {
      page: docs,
    },
    status: {
      type: 'stable',
    },
  },
}

export const Container = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-background-black">
  <div class="container has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container default</h2>
    </div>
  </div>
  <div class="container is-detail-page has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container detail-page</h2>
    </div>
  </div>
  <div class="container is-compact has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container compact</h2>
    </div>
  </div>
  <div class="container is-blog-page has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container blog-page</h2>
    </div>
  </div>
  <div class="container is-wide has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container wide</h2>
    </div>
  </div>
  <div class="container is-fluid has-background-success">
    <div class="has-background-grey is-flex is-justify-content-center is-align-items-center" style="height: 80px">
      <h2 class="title is-size-xx-large">container fluid</h2>
    </div>
  </div>
</div>`,
})
Container.args = {}
Container.parameters = {
  ...sourceCode(Container, Container.args, {}),
  controls: { exclude: [] },
}

export const Grid = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns">
  <div class="column has-background-green">First column</div>
  <div class="column has-background-red">Second column</div>
  <div class="column has-background-purple">Third column</div>
  <div class="column has-background-yellow">Fourth column</div>
</div>`,
})
Grid.args = {}
Grid.parameters = {
  ...sourceCode(Grid, Grid.args, {}),
  controls: { exclude: [] },
}

export const GridMultipleRows = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-multiline">
  <div class="column is-full has-background-blue has-text-white">Full column</div>
  <div class="column is-half has-background-green">Half column</div>
  <div class="column is-half has-background-red">Half column</div>
  <div class="column is-one-third has-background-purple">1 Third column</div>
  <div class="column is-two-thirds has-background-yellow">2 Third column</div>
</div>`,
})
GridMultipleRows.args = {}
GridMultipleRows.parameters = {
  ...sourceCode(GridMultipleRows, GridMultipleRows.args, {}),
  controls: { exclude: [] },
}

export const GridNested = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns">
  <div class="column is-half has-background-green">Half column</div>
  <div class="column is-half has-background-red p-none">
    <div class="columns is-mobile m-none">
      <div class="column is-half has-background-purple">Half column</div>
      <div class="column is-half has-background-yellow">Half column</div>
    </div>
  </div>
</div>`,
})
GridNested.args = {}
GridNested.parameters = {
  ...sourceCode(GridNested, GridNested.args, {}),
  controls: { exclude: [] },
}

export const GridResponsive = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns is-mobile">
  <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd has-background-red">
    <code>is-three-quarters-mobile</code><br>
    <code>is-two-thirds-tablet</code><br>
    <code>is-half-desktop</code><br>
    <code>is-one-third-widescreen</code><br>
    <code>is-one-quarter-fullhd</code>
  </div>
  <div class="column has-background-green">2</div>
  <div class="column has-background-green">3</div>
  <div class="column has-background-green">4</div>
  <div class="column has-background-green">5</div>
</div>`,
})
GridResponsive.args = {}
GridResponsive.parameters = {
  ...sourceCode(GridResponsive, GridResponsive.args, {}),
  controls: { exclude: [] },
}

export const Colors = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-background-primary p-4">
  <p class="has-text-white">Hello World!</p>
</div>`,
})
Colors.args = {}
Colors.parameters = {
  ...sourceCode(Colors, Colors.args, {}),
  controls: { exclude: [] },
}

export const BackgroundColors = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<p class="has-background-white has-text-white-inverted p-small m-none">default / white</p>
<p class="has-background-grey-light has-text-grey-light-inverted p-small m-none">grey light</p>
<p class="has-background-grey has-text-grey-inverted p-small m-none">grey</p>
<p class="has-background-primary has-text-primary-inverted p-small m-none">primary</p>
<p class="has-background-green has-text-green-inverted p-small m-none">green</p>
<p class="has-background-red has-text-red-inverted p-small m-none">red</p>
<p class="has-background-purple has-text-purple-inverted p-small m-none">purple</p>
<p class="has-background-yellow has-text-yellow-inverted p-small m-none">yellow</p>
`,
})
BackgroundColors.args = {}
BackgroundColors.parameters = {
  ...sourceCode(BackgroundColors, BackgroundColors.args, {}),
  controls: { exclude: [] },
}

export const TextColors = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<p>Default - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-hover">Light-Blue / Hover - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-active">Blue-Dark / Active - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-grey">Grey / Disabled - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-hint">Hint / Help - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-success">Success / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-warning">Warning - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
<p class="has-text-danger">Danger / Valid - Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>`,
})
TextColors.args = {}
TextColors.parameters = {
  ...sourceCode(TextColors, TextColors.args, {}),
  controls: { exclude: [] },
}

export const TypographyTitles = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="columns m-0">
  <div class="column has-background-red-1">
    <h1 class="title is-size-xxxxx-large">Display</h1>
    <h1 class="title is-size-xxxx-large">Title 1</h1>
    <h2 class="title is-size-xxx-large">Title 2</h2>
    <h3 class="title is-size-xx-large">Title 3</h3>
    <h4 class="title is-size-x-large">Title 4</h4>
    <h5 class="title is-size-normal">Title 5</h5>
  </div>
  <div class="column has-background-red-2">
    <h1 class="subtitle is-size-xxxxx-large">display</h1>
    <h1 class="subtitle is-size-xxxx-large">Subtitle 1</h1>
    <h2 class="subtitle is-size-xxx-large">Subtitle 2</h2>
    <h3 class="subtitle is-size-xx-large">Subtitle 3</h3>
    <h4 class="subtitle is-size-x-large">Subtitle 4</h4>
    <h5 class="subtitle is-size-normal">Subtitle 5</h5>
  </div>
</div>`,
})
TypographyTitles.args = {}
TypographyTitles.parameters = {
  ...sourceCode(TypographyTitles, TypographyTitles.args, {}),
  controls: { exclude: [] },
}

export const TypographyTexts = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="columns m-0">
  <div class="column has-background-purple-1">
    <p class="is-size-large">lead-text</p>
    <p class="is-size-medium">block-text</p>
    <p class="is-size-normal">normal</p>
    <p class="is-size-small">small-text</p>
    <p class="is-size-x-small">x-small-text</p>
  </div>
  <div class="column has-background-purple-2">
    <p class="is-size-large is-bold">lead-text</p>
    <p class="is-size-medium is-bold">block-text</p>
    <p class="is-size-normal is-bold">normal</p>
    <p class="is-size-small is-bold">small-text</p>
    <p class="is-size-x-small is-bold">x-small-text</p>
  </div>
</div>`,
})
TypographyTexts.args = {}
TypographyTexts.parameters = {
  ...sourceCode(TypographyTexts, TypographyTexts.args, {}),
  controls: { exclude: [] },
}

export const TypographyLink = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="columns m-0">
  <div class="column has-background-primary-1">
    <a class="is-link">Link</a>
  </div>
  <div class="column has-background-primary">
    <a class="is-link is-inverted">Link</a>
  </div>
</div>`,
})
TypographyLink.args = {}
TypographyLink.parameters = {
  ...sourceCode(TypographyLink, TypographyLink.args, {}),
  controls: { exclude: [] },
}

export const List = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <ul class="is-list">
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A vitae veniam debitis blanditiis nisi, voluptatem
    non praesentium corporis accusantium nihil, magnam quisquam! Consequuntur corrupti fuga dolorem. Laudantium
    deserunt voluptatibus inventore.
  </li>
  </ul>
  <ul class="is-list has-bullet-circle">
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, nemo vero. Ex amet beatae veniam veritatis
    vitae, labore saepe sed earum. Omnis repellendus, voluptates doloremque necessitatibus alias mollitia
    accusamus commodi!
  </li>
  </ul>
  <ul class="is-list has-bullet-check">
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima fuga, quod nobis id neque sit dolor debitis
    explicabo quisquam cum iure, quia temporibus velit? Ipsa aut aliquam tempore repudiandae vero.
  </li>
  </ul>
  <ol class="is-list">
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima fuga, quod nobis id neque sit dolor debitis
    explicabo quisquam cum iure, quia temporibus velit? Ipsa aut aliquam tempore repudiandae vero.
  </li>
  </ol>`,
})
List.args = {}
List.parameters = {
  ...sourceCode(List, List.args, {}),
  controls: { exclude: [] },
}

export const BorderAndRadius = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-border-primary p-2 mb-2 has-radius-none">Primary / None</div>
<div class="has-border-normal p-2 mb-2 has-radius-small">Normal / Small</div>
<div class="has-border-hover p-2 mb-2 has-radius">Hover / Normal</div>
<div class="has-border-active p-2 mb-2 has-radius-large">Active / Large</div>
<div class="has-border-valid p-2 mb-2 has-radius-rounded">Valid / Rounded</div>
<div class="has-border-invalid p-2 mb-2 has-radius-rounded">Invalid / Rounded</div>
<div class="has-border-warning p-2 mb-2 has-radius-rounded">Warning / Rounded</div>
<div class="has-border-disabled p-2 mb-2 has-radius-rounded">Disabled / Rounded</div>`,
})
BorderAndRadius.args = {}
BorderAndRadius.parameters = {
  ...sourceCode(BorderAndRadius, BorderAndRadius.args, {}),
  controls: { exclude: [] },
}

export const Table = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<table class="table is-fullwidth is-striped is-hoverable p-0">
  <thead>
    <th>ID</th>
    <th>Name</th>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Tony Stark</td>
    </tr>
  </tbody>
</table>`,
})
Table.args = {}
Table.parameters = {
  ...sourceCode(Table, Table.args, {}),
  controls: { exclude: [] },
}

export const Shadows = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="has-shadow p-small mb-large has-background-red-light">Shadow</div>
<div class="has-shadow-large p-small has-background-red-light">Large shadow</div>`,
})
Shadows.args = {}
Shadows.parameters = {
  ...sourceCode(Shadows, Shadows.args, {}),
  controls: { exclude: [] },
}

export const Buttons = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="buttons p-small">
  <button class="button is-primary">Primary</button>
  <button class="button is-info">Secondary</button>
  <button class="button is-text">Text</button>
  <button class="button is-link">Link</button>
  <button class="button is-light">Light</button>
  <button class="button is-success">S5s</button>
  <button class="button is-warning">W5g</button>
  <button class="button is-danger">D4r</button>
  <button class="button is-disabled">Disabled</button>
</div>
<div class="buttons has-background-primary p-small">
  <button class="button is-inverted is-primary">Primary</button>
  <button class="button is-inverted is-info">Secondary</button>
  <button class="button is-inverted is-text">Text</button>
  <button class="button is-inverted is-link"><span>Link</span></button>
  <button class="button is-inverted is-light">Light</button>
  <button class="button is-inverted is-success">S5s</button>
  <button class="button is-inverted is-warning">W5g</button>
  <button class="button is-inverted is-danger">D4r</button>
  <button class="button is-inverted is-disabled">Disabled</button>
</div>`,
})
Buttons.args = {}
Buttons.parameters = {
  ...sourceCode(Buttons, Buttons.args, {}),
  controls: { exclude: [] },
}

export const Form = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input" />
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
    <input class="input is-disabled" disabled type="text" placeholder="Text input" />
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
    <input class="input is-success" type="text" placeholder="Text input" />
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
    <input class="input is-danger" type="text" placeholder="Text input" />
  </div>
  <p class="help is-danger">This username is available</p>
</div>
<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </div>
</div>
<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea is-disabled" disabled placeholder="Textarea"></textarea>
  </div>
</div>
<div class="field">
  <label class="label">Subject</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div>
  </div>
</div>
<div class="file">
<label class="file-label">
  <input class="file-input" type="file" name="resume" />
  <span class="file-cta">
    <span class="file-icon"> icon </span>
    <span class="file-label"> Choose a file… </span>
  </span>
</label>
</div>
<div class="file is-disabled mt-4">
<label class="file-label">
  <input class="file-input" disabled type="file" name="resume" />
  <span class="file-cta">
    <span class="file-icon"> icon </span>
    <span class="file-label"> Choose a file… </span>
  </span>
</label>
</div>`,
})
Form.args = {}
Form.parameters = {
  ...sourceCode(Form, Form.args, {}),
  controls: { exclude: [] },
}

export const Spacing = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-background-grey">
    <div class="has-background-green p-large mx-medium">
      Spacings
    </div>
  </div>`,
})
Spacing.args = {}
Spacing.parameters = {
  ...sourceCode(Spacing, Spacing.args, {}),
  controls: { exclude: [] },
}

export const Spacings = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="p-xx-large has-background-primary-6 has-text-white">
  xx-large
  <div class="p-x-large has-background-primary-5">
    x-large
    <div class="p-large has-background-primary-4">
      large
      <div class="p-medium has-background-primary-3">
        medium
        <div class="p-normal has-background-purple-3">
          normal
          <div class="p-small has-background-purple-4">
            small
            <div class="p-x-small has-background-purple-5">
              x-small
              <div class="p-xx-small has-background-purple-6">
                xx-small
                <div class="p-none has-background-white has-text-primary">
                  Spacing with Paddings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
})
Spacings.args = {}
Spacings.parameters = {
  ...sourceCode(Spacings, Spacings.args, {}),
  controls: { exclude: [] },
}

export const Visibility = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="columns">
  <div class="column is-hidden-mobile has-background-success"><p>is-hidden-mobile</p></div>
  <div class="column is-hidden-tablet has-background-warning"><p>is-hidden-tablet</p></div>
  <div class="column is-hidden-desktop has-background-danger"><p>is-hidden-desktop</p></div>
</div>`,
})
Visibility.args = {}
Visibility.parameters = {
  ...sourceCode(Visibility, Visibility.args, {}),
  controls: { exclude: [] },
}

export const Flexbox = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div className="has-background-blue is-flex is-justify-content-center	is-align-items-center p-3">
  <div className="has-background-danger p-3"></div>
</div>`,
})
Flexbox.args = {}
Flexbox.parameters = {
  ...sourceCode(Flexbox, Flexbox.args, {}),
  controls: { exclude: [] },
}

export const FlexboxGap = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div className="has-background-danger is-flex fg-5">
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
</div>
<div className="has-background-danger is-flex fg-8 mt-3">
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
  <div className="has-background-blue is-flex-grow-1 p-3"></div>
</div>`,
})
FlexboxGap.args = {}
FlexboxGap.parameters = {
  ...sourceCode(FlexboxGap, FlexboxGap.args, {}),
  controls: { exclude: [] },
}

export const Opacity = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="p-4 has-background-blue has-opacity-100">
  <p class="has-text-white">Has opacity 1</p>
</div>
<div class="p-4 mt-4 has-background-blue has-opacity-80">
  <p class="has-text-white">Has opacity 0.8</p>
</div>
<div class="p-4 mt-4 has-background-blue has-opacity-60">
  <p class="has-text-white">Has opacity 0.6</p>
</div>
<div class="p-4 mt-4 has-background-blue has-opacity-30">
  <p class="has-text-white">Has opacity 0.3</p>
</div>
<div class="p-4 mt-4 has-background-blue has-opacity-0">
  <p class="has-text-white">Has opacity 0</p>
</div>`,
})
Opacity.args = {}
Opacity.parameters = {
  ...sourceCode(Opacity, Opacity.args, {}),
  controls: { exclude: [] },
}
