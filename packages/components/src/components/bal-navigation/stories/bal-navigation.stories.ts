import docs from './bal-navigation.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalNavigation, BalNavigationLevels, BalNavigationLevelMeta } from '../../../../.storybook/vue/components'
import { ref } from 'vue'

const component = BalComponentStory({
  title: 'Components/Navigation',
  component: BalNavigation,
  subcomponents: { BalNavigationLevels, BalNavigationLevelMeta },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    const modal = ref()
    const openModal = () => {
      modal.value?.open()
    }

    return {
      args,
      modal,
      openModal,
    }
  },
  template: `<div style="height: 3000px"><bal-navigation v-bind="args" meta-value="meta-1" aria-label-meta="aria label meta" aria-label-main="aria label main">
  <bal-navigation-levels> <!-- hidden in the dom but can be grabbed by the mutation observer -->
    <bal-navigation-level-meta value="meta-1" label="Privatkunden" link="/?path=/story/components-navigation--basic" linkLabel="Zur Privatkundenübersicht">
      <bal-navigation-level-main value="meta-1-main-1" label="Versichern" link="http://" linkLabel="Alle Versicherungslösungen">
        <bal-navigation-level-block label="Wohnen & Recht" link="http://">
          <bal-navigation-level-block-item label="Haushaltsversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Haftpflicht" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Einzel Gegenstände vom Handy bis zum e-Bike" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Cyber-Versicherung (Kreditkartenmissbrauch, Cyber-Mobbing, Schadsoftware)" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Rechtsschutz" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Wohneigentum" link="http://">
          <bal-navigation-level-block-item label="Gebäudeversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erdbebenversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Bauversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Fahrzeuge & Reisen" link="http://">
          <bal-navigation-level-block-item label="Auto" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Motorrad" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Velo" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Boot" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Fahrzeug Innenraum (auch Wohnwagen)" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Reiseversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Personen (Unfall, Krankheit, Tod)" link="http://">
          <bal-navigation-level-block-item label="Unfallversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Todesfallrisikoversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Krankentaggeldversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Lebensversicherung & Life Coach" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erwerbsunfähigkeits-versicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Unfallversicherung für Hausangestellte" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block color="grey" label="Services">
          <bal-navigation-level-block-item label="Gebäudeversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erdbebenversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Bauversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-2" label="Sparen, Zahlen & Finanzieren" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 2 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-3" label="Anlegen & Vorsorgen" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 3 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-4" label="Kontakt & Services" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 4 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-5" label="Magazin" tabLink="#">
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-2" label="Unternehmen" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview">
      <bal-navigation-level-main value="meta-2-main-1" label="Meta 2 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 2 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-3" label="Institutionelle Anleger" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview">
      <bal-navigation-level-main value="meta-3-main-1" label="Meta 3 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 3 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-4" label="Über uns" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview">
      <bal-navigation-level-main value="meta-4-main-1" label="Meta 4 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 4 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
  </bal-navigation-levels>

  <bal-button-group slot="meta-actions">
    <bal-button href="tel://00800 24 800 800" square size="small" color="light" inverted icon="call"></bal-button>
    <bal-button square size="small" color="light" inverted icon="web" @click="openModal()"></bal-button>
    <bal-modal ref="modal">
      <bal-modal-header>Modal Title</bal-modal-header>
      <bal-modal-body>
        <bal-heading class="is-flex is-justify-content-center" level="h4">Sprache wählen</bal-heading>
        <bal-button class="mb-2" expanded color="light">English</bal-button>
        <bal-button class="mb-2" expanded color="light">Deutsch</bal-button>
        <bal-button class="mb-2" expanded color="light">Français</bal-button>
      </bal-modal-body>
    </bal-modal>
    <bal-button square size="small" color="light" inverted icon="location"></bal-button>
    <bal-button square size="small" color="light" inverted icon="search"></bal-button>
    <bal-button color="light" inverted size="small" icon="account" href="/">Login</bal-button>
  </bal-button-group>
</bal-navigation></div>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const MetaWithLinks = args => ({
  components: { ...component.components },
  setup: () => {
    const modal = ref()
    const openModal = () => {
      modal.value?.open()
    }

    return {
      args,
      modal,
      openModal,
    }
  },
  template: `<div style="height: 3000px">
<bal-navigation v-bind="args" meta-value="meta-1" aria-label-meta="aria label meta" aria-label-main="aria label main">
  <bal-navigation-levels> <!-- hidden in the dom but can be grabbed by the mutation observer -->
    <bal-navigation-level-meta value="meta-1" label="Privatkunden" link="/?path=/story/components-navigation--basic" linkLabel="Zur Privatkundenübersicht" tabLink="#">
      <bal-navigation-level-main value="meta-1-main-1" label="Versichern" link="http://" linkLabel="Alle Versicherungslösungen">
        <bal-navigation-level-block label="Wohnen & Recht" link="http://">
          <bal-navigation-level-block-item label="Haushaltsversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Haftpflicht" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Einzel Gegenstände vom Handy bis zum e-Bike" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Cyber-Versicherung (Kreditkartenmissbrauch, Cyber-Mobbing, Schadsoftware)" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Rechtsschutz" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Wohneigentum" link="http://">
          <bal-navigation-level-block-item label="Gebäudeversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erdbebenversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Bauversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Fahrzeuge & Reisen" link="http://">
          <bal-navigation-level-block-item label="Auto" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Motorrad" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Velo" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Boot" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Fahrzeug Innenraum (auch Wohnwagen)" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Reiseversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block label="Personen (Unfall, Krankheit, Tod)" link="http://">
          <bal-navigation-level-block-item label="Unfallversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Todesfallrisikoversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Krankentaggeldversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Lebensversicherung & Life Coach" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erwerbsunfähigkeits-versicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Unfallversicherung für Hausangestellte" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
        <bal-navigation-level-block color="grey" label="Services">
          <bal-navigation-level-block-item label="Gebäudeversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Erdbebenversicherung" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Bauversicherung" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-2" label="Sparen, Zahlen & Finanzieren" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 2 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-3" label="Anlegen & Vorsorgen" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 3 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-4" label="Kontakt & Services" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 1 Main 4 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
      <bal-navigation-level-main value="meta-1-main-5" label="Magazin" tabLink="#test">
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-2" label="Unternehmen" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview" tabLink="#">
      <bal-navigation-level-main value="meta-2-main-1" label="Meta 2 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 2 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-3" label="Institutionelle Anleger" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview" tabLink="#">
      <bal-navigation-level-main value="meta-3-main-1" label="Meta 3 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 3 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
    <bal-navigation-level-meta value="meta-4" label="Über uns" link="/?path=/story/components-navigation--basic" linkLabel="Go to Meta 2 Overview" tabLink="#">
      <bal-navigation-level-main value="meta-4-main-1" label="Meta 4 Main 1" link="http://" linkLabel="Go to Main 1">
        <bal-navigation-level-block label="Meta 4 Main 1 Block 1" link="http://">
          <bal-navigation-level-block-item label="Item 1" link="http://"></bal-navigation-level-block-item>
          <bal-navigation-level-block-item label="Item 2" link="http://"></bal-navigation-level-block-item>
        </bal-navigation-level-block>
      </bal-navigation-level-main>
    </bal-navigation-level-meta>
  </bal-navigation-levels>

  <bal-button-group slot="meta-actions">
    <bal-button href="tel://00800 24 800 800" square size="small" color="light" inverted icon="call"></bal-button>
    <bal-button square size="small" color="light" inverted icon="web" @click="openModal()"></bal-button>
    <bal-modal ref="modal">
      <bal-modal-header>Modal Title</bal-modal-header>
      <bal-modal-body>
        <bal-heading class="is-flex is-justify-content-center" level="h4">Sprache wählen</bal-heading>
        <bal-button class="mb-2" expanded color="light">English</bal-button>
        <bal-button class="mb-2" expanded color="light">Deutsch</bal-button>
        <bal-button class="mb-2" expanded color="light">Français</bal-button>
      </bal-modal-body>
    </bal-modal>
    <bal-button square size="small" color="light" inverted icon="location"></bal-button>
    <bal-button square size="small" color="light" inverted icon="search"></bal-button>
    <bal-button color="light" inverted size="small" icon="account" href="/">Login</bal-button>
  </bal-button-group>
</bal-navigation></div>`,
})
MetaWithLinks.args = {}
MetaWithLinks.parameters = { ...component.sourceCode(MetaWithLinks) }
