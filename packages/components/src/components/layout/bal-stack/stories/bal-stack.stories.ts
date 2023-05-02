import docs from './bal-stack.docs.mdx'
import { BalComponentStory, sourceCode } from '../../../../stories/utils'
import {
  BalStack,
  BalLabel,
  BalText,
  BalButton,
  BalIcon,
  BalHeading,
  BalContent,
  BalCard,
  BalCardContent,
} from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Layout/Stack',
  component: BalStack,
  subcomponents: { BalLabel, BalText, BalButton, BalIcon, BalHeading, BalContent, BalCard, BalCardContent },
  docs,
  argTypes: {},
  args: {},
})

export default component.story

const excludedControls = []

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stack v-bind="args">
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-content>
    <bal-label>My Item</bal-label>
    <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
  </bal-content>
  <bal-button>Button</bal-button>
</bal-stack>`,
})

export const Basic = Template.bind({})
Basic.args = {
  layout: '',
  align: '',
  space: '',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const Alignment = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-stack v-bind="args">
  <bal-icon name="date" size="medium"></bal-icon>
  <bal-content align="center">
    <bal-label>My Item</bal-label>
    <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
  </bal-content>
  <bal-button>Button</bal-button>
</bal-stack>`,
})
Alignment.args = {
  layout: 'vertical',
  align: 'center',
  space: 'large',
}
Alignment.parameters = {
  ...component.sourceCode(Alignment),
  controls: { exclude: excludedControls },
}

export const Direction = Template.bind({})
Direction.args = {
  layout: 'vertical',
  align: '',
  space: '',
}
Direction.parameters = { ...component.sourceCode(Direction), controls: { exclude: excludedControls } }

export const Space = args => ({
  components: {
    ...component.components,
  },
  setup: () => ({ args }),
  template: `<div>
  <bal-stack class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Default</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="large" class="has-background-red-2 my-large">
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space Large</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="x-large" class="has-background-red-2 my-large">
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space X-Large</bal-label>
    </bal-content>
  </bal-stack>
  <bal-stack space="xx-large" class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
    <bal-content class="has-background-green-2">
      <bal-label>Space XX-Large</bal-label>
    </bal-content>
  </bal-stack>
</div>`,
})
Space.args = {}
Space.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-stack>
<bal-content>
  <bal-label>Space Default</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space Default</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space Default</bal-label>
</bal-content>
</bal-stack>
<bal-stack space="large">
<bal-content>
  <bal-label>Space Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space Large</bal-label>
</bal-content>
</bal-stack>
<bal-stack space="x-large">
<bal-content>
  <bal-label>Space X-Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space X-Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space X-Large</bal-label>
</bal-content>
</bal-stack>
<bal-stack space="xx-large">
<bal-content>
  <bal-label>Space XX-Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space XX-Large</bal-label>
</bal-content>
<bal-content>
  <bal-label>Space XX-Large</bal-label>
</bal-content>
</bal-stack>`,
      components: [],
    }),
    Space.args,
    {},
  ),
  controls: { exclude: excludedControls },
}

export const Padding = args => ({
  components: {
    ...component.components,
  },
  setup: () => ({ args }),
  template: `<div>
  <bal-stack py="medium" class="has-background-red-2">
    <bal-content class="has-background-green-2">
      <bal-label>Padding Horizontal Medium</bal-label>
    </bal-content>
  </bal-stack>
  <br/>
  <bal-stack px="medium" class="has-background-red-2">
  <bal-content class="has-background-green-2">
    <bal-label>Padding Vertical Medium</bal-label>
  </bal-content>
</bal-stack>
</div>`,
})
Padding.args = {}
Padding.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-stack py="medium">
    <bal-content>
      <bal-label>Padding Horizontal Medium</bal-label>
    </bal-content>
  </bal-stack>
  <br/>
  <bal-stack px="medium">
  <bal-content>
    <bal-label>Padding Vertical Medium</bal-label>
  </bal-content>
</bal-stack>`,
      components: [],
    }),
    Padding.args,
    {},
  ),
  controls: { exclude: excludedControls },
}

export const TeaserCards = args => ({
  components: {
    ...component.components,
  },
  setup: () => {
    const svgPigRed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path fill="#ffaca6" d="M30 24c.331 0 .654.031.974.076A9.388 9.388 0 0 0 31.446 22h.608C33.127 22 34 21.167 34 20.144V19a.5.5 0 0 0-1 0v1.144c0 .472-.425.856-.946.856H31.5c0-2.851-1.251-5.374-3.183-7.022-.055-.048-.109-.097-.166-.144a8.498 8.498 0 0 0-.567-.416 7.966 7.966 0 0 0-.367-.24c-.083-.05-.159-.112-.244-.16 0 .008-.002.015-.003.022-.159-.09-.313-.188-.478-.266a7.89 7.89 0 0 0-3.4-.774h-6.388A3.998 3.998 0 0 0 13 9.5v3.06l-.008.002c-.076.03-.144.073-.219.105-.24.104-.478.214-.707.34-.134.074-.261.158-.39.239-.17.107-.338.216-.5.335a8.617 8.617 0 0 0-.821.688c-.117.11-.234.218-.344.335-.141.149-.272.309-.403.469-.083.101-.177.193-.256.298h.01A9.148 9.148 0 0 0 7.988 18H7.25C6.56 18 6 18.56 6 19.25v3.5c0 .69.56 1.25 1.25 1.25h.738c.772 2.336 2.412 4.228 4.512 5.225a7.89 7.89 0 0 0 3.4.775h7.18c.488-3.387 3.401-6 6.92-6zm-16.875-5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z"/><circle cx="13.125" cy="17.875" r="1.125" fill="none"/><path fill="#d9304c" d="M12.5 32.75a1.25 1.25 0 0 0 2.5 0v-2.803a7.916 7.916 0 0 1-2.5-.721v3.524z"/><path fill="#000d6e" d="M23.532 15.024h-6a.5.5 0 0 1 0-1h6a.5.5 0 0 1 0 1zM29.985 24.969a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-2.878 7.019c.459 0 .729-.252.837-.648l.644.262c-.171.544-.671 1.021-1.472 1.021-.914 0-1.607-.68-1.607-1.62 0-.945.693-1.625 1.612-1.625.806 0 1.301.495 1.467 1.021l-.644.261c-.108-.392-.383-.648-.842-.648-.536 0-.914.396-.914.991.001.588.379.985.919.985zm4.55.576h-.67v-1.297h-1.193v1.297h-.671v-3.129h.671v1.233h1.193v-1.233h.67v3.129zm2.667-1.855v.581h-1.242v1.273h-.671v-3.129h2.08v.581h-1.409v.693h1.242z"/></svg>`
    const svgPigYellow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path fill="#fa9319" d="M30 25c-3.31 0-6 2.69-6 6 0 1.79.79 3.4 2.04 4.5.42.38.91.7 1.43.94.77.36 1.62.56 2.53.56s1.76-.2 2.53-.56a5.71 5.71 0 0 0 1.43-.94A5.982 5.982 0 0 0 36 31c0-3.31-2.69-6-6-6z"/><path fill="#fae052" d="M33.5 18.5a.5.5 0 0 0-.5.5v1.144c0 .472-.425.856-.946.856H31.5c0-2.851-1.251-5.374-3.183-7.022-.055-.048-.109-.097-.166-.144a8.498 8.498 0 0 0-.567-.416 7.966 7.966 0 0 0-.367-.24c-.083-.05-.159-.112-.244-.16 0 .008-.002.015-.003.022-.159-.09-.313-.188-.478-.266a7.89 7.89 0 0 0-3.4-.774h-6.388A3.998 3.998 0 0 0 13 9.5v3.06l-.008.002c-.076.03-.144.073-.219.105-.24.104-.478.214-.707.34-.134.074-.261.158-.39.239-.17.107-.338.216-.5.335a8.617 8.617 0 0 0-.821.688c-.117.11-.234.218-.344.335-.141.149-.272.309-.403.469-.083.101-.177.193-.256.298h.01A9.148 9.148 0 0 0 7.988 18H7.25C6.56 18 6 18.56 6 19.25v3.5c0 .69.56 1.25 1.25 1.25h.738c.772 2.336 2.412 4.228 4.512 5.225a7.89 7.89 0 0 0 3.4.775h7.175c.475-3.401 3.395-6.031 6.925-6.031.334 0 .661.032.983.077.22-.653.389-1.333.463-2.047h.608C33.127 22 34 21.167 34 20.144V19a.5.5 0 0 0-.5-.5zm-20.375.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z"/><circle cx="13.125" cy="17.875" r="1.125" fill="none"/><path fill="#fa9319" d="M12.5 32.75a1.25 1.25 0 0 0 2.5 0v-2.803a7.916 7.916 0 0 1-2.5-.721v3.524z"/><path fill="#000d6e" d="M23.5 14h-6a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1z"/><path fill="none" d="M32.202 31.929c.091 0 .171-.048.243-.113-.072.065-.152.113-.244.113h.001zM31.908 32.165zM32.509 30.783c-.081-.105-.185-.174-.302-.176l-.003-.297h-.002l.004.3c.118-.001.222.068.303.173zM32.041 31.882zM27.805 31.928c-.097 0-.181-.052-.255-.125.074.073.158.125.254.125a.342.342 0 0 0 .175-.051 2.51 2.51 0 0 0-.001-.003.329.329 0 0 1-.173.054zM27.801 29.764l-.002-.284-.002.003.002.282v.006l.005.627-.003-.629v-.005z"/><path fill="none" d="M27.801 29.764l-.002-.284-.003.003.002.282v.006l.005.627-.003-.629.001-.005zM32.509 30.783c-.081-.105-.185-.174-.302-.176l-.003-.297h-.002l.004.3c.118-.001.222.068.303.173zM27.805 31.928c-.097 0-.181-.052-.255-.125.074.073.158.125.254.125a.342.342 0 0 0 .175-.051 2.51 2.51 0 0 0-.001-.003.329.329 0 0 1-.173.054zM31.086 33.785l-.013-.199-.033-.471.033.471zM31.908 32.165zM28.912 33.902l.004.005-.003-.005zM32.202 31.929c.091 0 .171-.048.243-.113-.072.065-.152.113-.244.113h.001zM32.041 31.882zM31.085 33.906l.001-.002zM31.086 33.904"/><path fill="#000d6e" d="M27.47 34.25c.06-.02.12-.04.18-.05l1.26-.3.001.001.001-.017.033-.789a2.372 2.372 0 0 1-.771-.808c-.008-.013-.018-.024-.026-.038l-.01-.022a2.564 2.564 0 0 1-.161-.348.342.342 0 0 1-.175.051c-.096 0-.18-.052-.254-.125l-.006-.005a.751.751 0 0 1-.203-.533c0-.182.051-.348.135-.468.084-.12.2-.195.329-.195v-.205l-.005-.627v-.006l-.002-.282.003-.003.01-.01c.365-.175.983-.535 1.837-.086.73.384 1.962.753 2.557.925h.002l.003.297c.117.002.221.071.302.176a.79.79 0 0 1 .155.483.74.74 0 0 1-.22.55.361.361 0 0 1-.243.113H32.2h-.001l-.009-.003a.36.36 0 0 1-.149-.043c-.037.099-.085.191-.133.283a2.42 2.42 0 0 1-.868.95l.033.471.013.199v.12l.004-.004 1.26.3c.06.01.12.03.18.05.18.055.329.121.476.187.04.018.091.031.129.05v-3.734c0-.098-.015-.189-.022-.285a4.035 4.035 0 0 0-.212-1.064c-.012-.035-.028-.066-.041-.101-.049-.127-.098-.254-.159-.372a3.23 3.23 0 0 0-.269-.44c-.012-.022-.027-.043-.041-.065l-.047-.074c-.429-.669-1.302-1.216-2.32-1.216-.025 0-.048.007-.073.008a2.813 2.813 0 0 0-.975.204 2.837 2.837 0 0 0-.993.656 2.868 2.868 0 0 0-.414.443c-.01.013-.02.023-.029.036-.123.165-.23.349-.324.544l-.019.039a3.785 3.785 0 0 0-.191.537c-.011.038-.029.07-.039.108l-.005.02c-.03.118-.039.245-.058.368-.019.122-.049.239-.058.366-.006.094-.014.188-.014.285v3.753c.004-.002.01-.001.014-.003.178-.096.391-.174.624-.252z"/><path fill="#fae052" d="M33.96 35.5c-.1-.47-.38-.78-.82-1.01-.039-.02-.092-.034-.134-.053a3.72 3.72 0 0 0-.476-.187v2.19a5.71 5.71 0 0 0 1.43-.94zM27.47 34.25a3.992 3.992 0 0 0-.623.252l-.017.008c-.42.22-.7.53-.79.99.42.38.91.7 1.43.94v-2.19zM31.086 33.903v-.118l-.013-.199-.033-.471c.105-.064.205-.139.299-.22.23-.198.422-.447.569-.73.048-.092.096-.184.133-.283a.334.334 0 0 0 .148.043l.009.003h.001c.092 0 .172-.048.244-.113a.74.74 0 0 0 .22-.55.796.796 0 0 0-.155-.483c-.081-.105-.185-.174-.302-.174l-.004-.3c-.595-.172-1.828-.542-2.557-.925-.854-.449-1.472-.089-1.837.086l-.01.01.002.284v.004l.003.629v.205c-.129 0-.245.075-.329.195a.824.824 0 0 0-.135.468c0 .224.083.413.203.533l.006.005c.074.072.158.125.255.125.06 0 .119-.02.172-.053.045.123.1.24.162.351l.01.022.026.038c.196.335.46.612.771.808l-.033.789-.001.017.001.002.003.004c.24.356.628.583 1.084.583a1.295 1.295 0 0 0 1.088-.585z"/><path fill="#fa9319" d="M32.53 34.25c-.06-.02-.12-.04-.18-.05l-1.26-.3a.008.008 0 0 1-.004.004l-.002.002c-.24.356-.628.584-1.085.584-.457 0-.844-.228-1.084-.583l-.004-.004-.001-.002-.001-.001-1.26.3c-.06.01-.12.03-.18.05v2.19c.771.36 1.621.56 2.531.56s1.76-.2 2.53-.56v-2.19z"/></svg>`
    const svgPigPurple = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 80"><path fill="#000D6E" d="M48.92 70.5a3.208 3.208 0 1 0 6.417 0v-8.496a20.538 20.538 0 0 1-6.417 1.386v7.11zM20.685 70.5a3.208 3.208 0 1 0 6.417 0V63.44a20.302 20.302 0 0 1-6.417-1.848V70.5z"/><path fill="#6C2273" d="M74.588 33.922a1.283 1.283 0 0 0-1.283 1.284v2.926a2.31 2.31 0 0 1-2.567 2.208h-1.284a23.333 23.333 0 0 0-11.55-20.535 12.14 12.14 0 0 1-1.438 5.133H35.033a12.167 12.167 0 0 1-1.514-5.775c.016-.646.085-1.29.205-1.925h-2.259a10.267 10.267 0 0 0-9.497-6.417v7.854A22.385 22.385 0 0 0 9.134 32.64H7.209A3.209 3.209 0 0 0 4 35.847v8.984a3.209 3.209 0 0 0 3.209 3.209h1.925A22.589 22.589 0 0 0 20.71 61.465a20.304 20.304 0 0 0 6.392 1.976c.77 0 1.54.128 2.31.128H48.92c2.2-.114 4.366-.583 6.417-1.386a22.921 22.921 0 0 0 13.99-19.277h1.54A4.877 4.877 0 0 0 76 38.132v-2.926a1.283 1.283 0 0 0-1.412-1.284zm-55.187-1.591a2.9 2.9 0 1 1 2.875 2.875A2.875 2.875 0 0 1 19.4 32.33z"/><path fill="#B8B2FF" d="M35.033 24.938H56.39a12.14 12.14 0 0 0 1.515-5.133c.012-.231.012-.462 0-.693a12.166 12.166 0 0 0-24.18-1.874c-.12.635-.189 1.279-.205 1.925a12.167 12.167 0 0 0 1.514 5.775z"/></svg>`

    return {
      args,
      svgPigRed,
      svgPigYellow,
      svgPigPurple,
    }
  },
  template: `<div class="columns">
  <div class="column is-one-third">
    <bal-card color="purple-light" fullheight>
      <bal-card-content>
        <bal-stack layout="vertical" align="center" space="large">
          <bal-icon :svg="svgPigPurple" color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Teaser Card</bal-heading>
            <bal-text>The item component can easily be combined with the card component to achieve a nice
            teaser layout.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card color="yellow-light" fullheight>
      <bal-card-content>
        <bal-stack layout="vertical" align="center" space="large">
          <bal-icon :svg="svgPigYellow" color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Auto Height</bal-heading>
            <bal-text>The height of the cards adjust to the longest in the row.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
  <div class="column is-one-third">
    <bal-card color="red-light" fullheight>
      <bal-card-content>
        <bal-stack layout="vertical" align="center" space="large">
          <bal-icon :svg="svgPigRed" color="auto" size="xx-large"></bal-icon>
          <bal-content align="center">
            <bal-heading level="x-large">Item Component</bal-heading>
            <bal-text>Item is used to easaly group components and not be concered about the correct spacing.</bal-text>
          </bal-content>
          <bal-button>Button</bal-button>
        </bal-stack>
      </bal-card-content>
    </bal-card>
  </div>
</div>`,
})
TeaserCards.args = {}
TeaserCards.parameters = {
  ...component.sourceCode(TeaserCards),
  controls: { exclude: excludedControls },
}
