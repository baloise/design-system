import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html'
import { withComponentControls, StoryFactory, getRootElement, useContentLoaded } from '../../utils'
import { buttonLinkItems, logoLinkItem, optionLinkItems } from './bal-nav.data'

type Args = JSX.BalNav & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Deprecated/Nav',
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  argTypes: {
    ...withComponentControls({ tag: 'bal-nav' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    useContentLoaded(() => {
      const rootEl = getRootElement(context)
      const navEl = rootEl?.querySelector('bal-nav') as any

      if (navEl) {
        navEl.logo = logoLinkItem
        navEl.buttons = buttonLinkItems
        navEl.options = optionLinkItems
      }
    })

    section.innerHTML = `<bal-nav content-width="440">
    <bal-popup id="popup-call" label="24h Kundenservice">
      <bal-stack layout="vertical">
        <bal-button expanded>00800 24 800 800</bal-button>
      </bal-stack>
    </bal-popup>

    <bal-popup id="popup-locale" label="Sprache wählen" content-width="440">
      <bal-stack layout="vertical">
        <bal-button expanded color="light">Deutsch</bal-button>
        <bal-button expanded color="light">Francais</bal-button>
        <bal-button expanded color="light">Italian</bal-button>
        <bal-button expanded color="light">English</bal-button>
      </bal-stack>
    </bal-popup>

    <bal-popup id="popup-search" label="Suchen" content-width="440">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis qui vero nulla vitae nemo harum laborum
        iusto voluptate. Enim facilis quod iste dolores sit quidem aspernatur molestias itaque consequatur
        nostrum? Laborum odio accusantium repudiandae ipsa? Expedita corrupti similique sint aspernatur officiis
        inventore vel nesciunt. Exercitationem totam doloribus reiciendis quae magni eius ipsa. Inventore sit
        placeat modi suscipit laborum quisquam laudantium!
      </p>
    </bal-popup>

    <bal-popup id="popup-login" label="Anmelden" content-width="440">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis qui vero nulla vitae nemo harum laborum
        iusto voluptate. Enim facilis quod iste dolores sit quidem aspernatur molestias itaque consequatur
        nostrum? Laborum odio accusantium repudiandae ipsa? Expedita corrupti similique sint aspernatur officiis
        inventore vel nesciunt. Exercitationem totam doloribus reiciendis quae magni eius ipsa. Inventore sit
        placeat modi suscipit laborum quisquam laudantium!
      </p>
    </bal-popup>
  </bal-nav>
  <bal-stage color="purple" shape size="small" containerSize="wide">
    <bal-stage-body>
      <bal-stage-back-link href="#" class="mb-medium">Back</bal-stage-back-link>
      <bal-heading class="mb-x-small" space="none">Small title</bal-heading>
    </bal-stage-body>
  </bal-stage>
  <div class="container">
    <h2 class="title text-xx-large mb-normal mt-large">Heading</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
      pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
      mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
      ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
      tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
      blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
      ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
      fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
      velit cursus nunc,
    </p>
    <bal-card class="mt-xxxx-large" color="green">
      <bal-card-content>
        <h2 class="title text-xx-large mb-normal">Heading</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
          sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
          ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
          rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
          Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
          sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et
          ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci
          eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
          consequat, leo eget bibendum sodales, augue velit cursus nunc,
        </p>
      </bal-card-content>
    </bal-card>
  </div>`

    return section
  },
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
