import docs from './bal-list.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import {
  BalList,
  BalListItem,
  BalListItemContent,
  BalIcon,
  BalListItemIcon,
  BalListItemTitle,
  BalListItemSubtitle,
} from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalList,
  subcomponents: { BalListItem, BalListItemContent, BalListItemIcon, BalListItemTitle, BalListItemSubtitle },
  docs,
  status: 'stable',
  args: {
    inverted: false,
    disabled: false,
    border: true,
    size: 'large',
  },
})

export default component.story

export const NativeList = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <ul class="is-list ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ul>
  <ul class="is-list has-bullet-circle ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-red ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-yellow ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
  </ul>
  <ul class="is-list has-bullet-circle has-bullet-purple ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
  </ul>
  <ul class="is-list has-bullet-check ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ul>
  <ol class="is-list ${args.inverted ? 'is-inverted' : ''}">
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ol>
</div>`,
})
NativeList.args = {
  border: true,
}
NativeList.parameters = { ...component.sourceCode(NativeList), controls: { exclude: ['disabled', 'size', 'border'] } }

export const Basic = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Single-line item</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item>
    <bal-list-item-content>
      <bal-list-item-title>Two-line item</bal-list-item-title>
      <bal-list-item-subtitle>Secondary text</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item clickable>
    <bal-list-item-content>
      <bal-list-item-title>Clickable item</bal-list-item-title>
    </bal-list-item-content>
  </bal-list-item>
  <bal-list-item disabled>
    <bal-list-item-content>
      <bal-list-item-title>Disabled item</bal-list-item-title>
      <bal-list-item-subtitle>Subtitle</bal-list-item-subtitle>
    </bal-list-item-content>
  </bal-list-item>
</bal-list>`,
})
Basic.args = {
  border: true,
  size: '',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const LinkedList = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item clickable href="www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>External Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
  <bal-list-item disabled clickable href="http://www.baloise.com" target="_blank">
    <bal-list-item-content>
      <bal-list-item-title>Disabled Link</bal-list-item-title>
      <bal-list-item-subtitle>Description</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="nav-go-right" size="xsmall"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>`,
})
LinkedList.args = {
  border: true,
  size: 'large',
}
LinkedList.parameters = { ...component.sourceCode(LinkedList) }

export const DownloadList = args => ({
  components: { ...component.components, BalIcon },
  setup: () => ({ args }),
  template: `<bal-list v-bind="args">
  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="picture"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Picture</bal-list-item-title>
      <bal-list-item-subtitle>PNG - 140KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="video"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Video File</bal-list-item-title>
      <bal-list-item-subtitle>MP4 - 61MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item clickable>
    <bal-list-item-icon>
      <bal-icon name="audio"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Audio File</bal-list-item-title>
      <bal-list-item-subtitle>MP3 - 3MB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>

  <bal-list-item disabled>
    <bal-list-item-icon>
      <bal-icon name="file"></bal-icon>
    </bal-list-item-icon>
    <bal-list-item-content>
      <bal-list-item-title>Disabled Document</bal-list-item-title>
      <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
    </bal-list-item-content>
    <bal-list-item-icon right>
      <bal-icon name="download" size="small"></bal-icon>
    </bal-list-item-icon>
  </bal-list-item>
</bal-list>`,
})
DownloadList.args = {
  border: true,
  size: 'large',
}
DownloadList.parameters = { ...component.sourceCode(DownloadList) }
