import docs from './bal-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalSlider, BalSliderItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Slider',
  component: BalSlider,
  subcomponents: { BalSliderItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-slider v-bind="args">
    <bal-slider-item >
      <bal-card flat fullheight class="mt-2" color="red-light">
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="purple-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="green-light">
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
      </bal-slider-item>
  </bal-slider>
  <bal-text class="mt-4" style="color: #0A605E;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis convallis tellus id interdum velit laoreet. Magna ac placerat vestibulum lectus mauris ultrices. Bibendum at varius vel pharetra vel. Nec nam aliquam sem et tortor consequat id porta. Lacus laoreet non curabitur gravida arcu. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Orci ac auctor augue mauris. Aliquam ut porttitor leo a diam sollicitudin tempor. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Cursus euismod quis viverra nibh cras. Amet aliquam id diam maecenas ultricies mi eget mauris. Blandit volutpat maecenas volutpat blandit aliquam. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Tempor nec feugiat nisl pretium. In arcu cursus euismod quis.
          Malesuada proin libero nunc consequat interdum varius sit. Consequat id porta nibh venenatis cras sed felis eget velit. Diam quis enim lobortis scelerisque. Blandit libero volutpat sed cras. Quis eleifend quam adipiscing vitae proin sagittis nisl. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Sit amet massa vitae tortor. Risus nullam eget felis eget nunc. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Nunc sed blandit libero volutpat sed cras. Morbi tristique senectus et netus et malesuada fames ac turpis. Eget velit aliquet sagittis id consectetur purus ut faucibus. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Vulputate eu scelerisque felis imperdiet proin. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Sed euismod nisi porta lorem mollis aliquam ut.
          Condimentum lacinia quis vel eros donec. Ultrices dui sapien eget mi proin sed libero enim sed. Tellus orci ac auctor augue mauris augue neque. Viverra nam libero justo laoreet sit amet cursus sit. Eget felis eget nunc lobortis. Pharetra et ultrices neque ornare aenean euismod. Ultricies tristique nulla aliquet enim tortor at. Enim nulla aliquet porttitor lacus luctus. Dictum fusce ut placerat orci nulla. Neque ornare aenean euismod elementum nisi quis eleifend.
          Gravida quis blandit turpis cursus in hac habitasse platea. In ornare quam viverra orci sagittis. Orci a scelerisque purus semper eget duis at tellus at. Quam lacus suspendisse faucibus interdum posuere. At elementum eu facilisis sed odio. Cras pulvinar mattis nunc sed blandit libero volutpat. Mattis pellentesque id nibh tortor id aliquet lectus proin. Ipsum faucibus vitae aliquet nec. Elit duis tristique sollicitudin nibh sit amet. Nascetur ridiculus mus mauris vitae ultricies leo. Mauris in aliquam sem fringilla. Sit amet luctus venenatis lectus magna fringilla. Eget gravida cum sociis natoque. Diam quis enim lobortis scelerisque fermentum dui faucibus. Sagittis nisl rhoncus mattis rhoncus urna. Quam nulla porttitor massa id. Sit amet porttitor eget dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. Et magnis dis parturient montes.
          Mauris rhoncus aenean vel elit scelerisque. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Ut aliquam purus sit amet luctus venenatis lectus magna. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Vel turpis nunc eget lorem dolor sed. In iaculis nunc sed augue lacus viverra vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Nisl condimentum id venenatis a condimentum vitae sapien. Facilisi etiam dignissim diam quis enim. Facilisis gravida neque convallis a cras semper. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Aliquet eget sit amet tellus cras adipiscing enim.
          Non arcu risus quis varius quam quisque id diam vel. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Placerat vestibulum lectus mauris ultrices. Aliquam nulla facilisi cras fermentum odio eu. Ultrices tincidunt arcu non sodales neque sodales. Feugiat in fermentum posuere urna nec tincidunt. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris nunc congue nisi vitae suscipit. Convallis posuere morbi leo urna molestie at elementum. Pretium fusce id velit ut tortor pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc.
          Et ultrices neque ornare aenean euismod elementum nisi quis. Facilisis magna etiam tempor orci eu lobortis. Mattis pellentesque id nibh tortor id aliquet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Donec enim diam vulputate ut pharetra sit amet. Ultricies tristique nulla aliquet enim tortor. Libero enim sed faucibus turpis in eu mi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Pretium nibh ipsum consequat nisl vel. Dictum fusce ut placerat orci. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Bibendum enim facilisis gravida neque. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Et odio pellentesque diam volutpat commodo sed.
          Nisi porta lorem mollis aliquam ut porttitor leo. Lectus sit amet est placerat in egestas erat imperdiet. Id aliquet lectus proin nibh nisl condimentum. Dolor sit amet consectetur adipiscing elit. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Sit amet facilisis magna etiam tempor. Ut diam quam nulla porttitor massa id neque. Et ligula ullamcorper malesuada proin. Volutpat consequat mauris nunc congue. Amet massa vitae tortor condimentum lacinia quis vel. Tortor vitae purus faucibus ornare suspendisse sed. Quis eleifend quam adipiscing vitae proin sagittis. Nulla pharetra diam sit amet nisl suscipit. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Pellentesque massa placerat duis ultricies. Tristique senectus et netus et. Mauris vitae ultricies leo integer malesuada.</bal-text>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithNavigation = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-navigation meta-value="meta-1" aria-label-meta="meta" aria-label-main="main">
    <bal-navigation-levels>
      <bal-navigation-level-meta value="meta-1" label="Privatkunden" link="/?path=/story/components-navigation--basic" linkLabel="Zur Privatkundenübersicht">
        <bal-navigation-level-main value="meta-1-main-1" label="Véhicules et voyages" link="http://" linkLabel="Véhicules et voyages"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Habitat et propriété" link="http://" linkLabel="Habitat et propriété"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Prévoyance et patrimoine" link="http://" linkLabel="Prévoyance et patrimoine"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Paiement et épargne" link="http://" linkLabel="Paiement et épargne"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Objets et électronique" link="http://" linkLabel="Objets et électronique"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Contact et services" link="http://" linkLabel="Contact et services"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Contact et services" link="http://" linkLabel="Contact et services"></bal-navigation-level-main>
        <bal-navigation-level-main value="meta-1-main-1" label="Contact et services" link="http://" linkLabel="Contact et services"></bal-navigation-level-main>
      </bal-navigation-level-meta>
    </bal-navigation-levels>
  </bal-navigation>
  <bal-stage color="purple" shape size="small">
    <bal-stage-body>
        <bal-stage-back-link href="#" class="mb-5">Back</bal-stage-back-link>
        <bal-heading class="mb-2" space="none">French</bal-heading>
    </bal-stage-body>
  </bal-stage>
  <bal-slider v-bind="args">
    <bal-slider-item >
      <bal-card flat fullheight class="mt-2" color="red-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="purple-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="green-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
      </bal-slider-item>
  </bal-slider>
  <bal-text class="mt-4" style="color: #0A605E;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis convallis tellus id interdum velit laoreet. Magna ac placerat vestibulum lectus mauris ultrices. Bibendum at varius vel pharetra vel. Nec nam aliquam sem et tortor consequat id porta. Lacus laoreet non curabitur gravida arcu. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Orci ac auctor augue mauris. Aliquam ut porttitor leo a diam sollicitudin tempor. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Cursus euismod quis viverra nibh cras. Amet aliquam id diam maecenas ultricies mi eget mauris. Blandit volutpat maecenas volutpat blandit aliquam. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Tempor nec feugiat nisl pretium. In arcu cursus euismod quis.
          Malesuada proin libero nunc consequat interdum varius sit. Consequat id porta nibh venenatis cras sed felis eget velit. Diam quis enim lobortis scelerisque. Blandit libero volutpat sed cras. Quis eleifend quam adipiscing vitae proin sagittis nisl. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Sit amet massa vitae tortor. Risus nullam eget felis eget nunc. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Nunc sed blandit libero volutpat sed cras. Morbi tristique senectus et netus et malesuada fames ac turpis. Eget velit aliquet sagittis id consectetur purus ut faucibus. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Vulputate eu scelerisque felis imperdiet proin. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Sed euismod nisi porta lorem mollis aliquam ut.
          Condimentum lacinia quis vel eros donec. Ultrices dui sapien eget mi proin sed libero enim sed. Tellus orci ac auctor augue mauris augue neque. Viverra nam libero justo laoreet sit amet cursus sit. Eget felis eget nunc lobortis. Pharetra et ultrices neque ornare aenean euismod. Ultricies tristique nulla aliquet enim tortor at. Enim nulla aliquet porttitor lacus luctus. Dictum fusce ut placerat orci nulla. Neque ornare aenean euismod elementum nisi quis eleifend.
          Gravida quis blandit turpis cursus in hac habitasse platea. In ornare quam viverra orci sagittis. Orci a scelerisque purus semper eget duis at tellus at. Quam lacus suspendisse faucibus interdum posuere. At elementum eu facilisis sed odio. Cras pulvinar mattis nunc sed blandit libero volutpat. Mattis pellentesque id nibh tortor id aliquet lectus proin. Ipsum faucibus vitae aliquet nec. Elit duis tristique sollicitudin nibh sit amet. Nascetur ridiculus mus mauris vitae ultricies leo. Mauris in aliquam sem fringilla. Sit amet luctus venenatis lectus magna fringilla. Eget gravida cum sociis natoque. Diam quis enim lobortis scelerisque fermentum dui faucibus. Sagittis nisl rhoncus mattis rhoncus urna. Quam nulla porttitor massa id. Sit amet porttitor eget dolor. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. Et magnis dis parturient montes.
          Mauris rhoncus aenean vel elit scelerisque. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Ut aliquam purus sit amet luctus venenatis lectus magna. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Vel turpis nunc eget lorem dolor sed. In iaculis nunc sed augue lacus viverra vitae. Ut eu sem integer vitae justo eget magna fermentum iaculis. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Nisl condimentum id venenatis a condimentum vitae sapien. Facilisi etiam dignissim diam quis enim. Facilisis gravida neque convallis a cras semper. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. Aliquet eget sit amet tellus cras adipiscing enim.
          Non arcu risus quis varius quam quisque id diam vel. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Placerat vestibulum lectus mauris ultrices. Aliquam nulla facilisi cras fermentum odio eu. Ultrices tincidunt arcu non sodales neque sodales. Feugiat in fermentum posuere urna nec tincidunt. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris nunc congue nisi vitae suscipit. Convallis posuere morbi leo urna molestie at elementum. Pretium fusce id velit ut tortor pretium. Quisque sagittis purus sit amet volutpat consequat mauris nunc.
          Et ultrices neque ornare aenean euismod elementum nisi quis. Facilisis magna etiam tempor orci eu lobortis. Mattis pellentesque id nibh tortor id aliquet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Donec enim diam vulputate ut pharetra sit amet. Ultricies tristique nulla aliquet enim tortor. Libero enim sed faucibus turpis in eu mi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Pretium nibh ipsum consequat nisl vel. Dictum fusce ut placerat orci. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Bibendum enim facilisis gravida neque. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Et odio pellentesque diam volutpat commodo sed.
          Nisi porta lorem mollis aliquam ut porttitor leo. Lectus sit amet est placerat in egestas erat imperdiet. Id aliquet lectus proin nibh nisl condimentum. Dolor sit amet consectetur adipiscing elit. Adipiscing diam donec adipiscing tristique risus nec feugiat in. Sit amet facilisis magna etiam tempor. Ut diam quam nulla porttitor massa id neque. Et ligula ullamcorper malesuada proin. Volutpat consequat mauris nunc congue. Amet massa vitae tortor condimentum lacinia quis vel. Tortor vitae purus faucibus ornare suspendisse sed. Quis eleifend quam adipiscing vitae proin sagittis. Nulla pharetra diam sit amet nisl suscipit. Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Pellentesque massa placerat duis ultricies. Tristique senectus et netus et. Mauris vitae ultricies leo integer malesuada.</bal-text>`,
})
WithNavigation.args = {}
WithNavigation.parameters = { ...component.sourceCode(WithNavigation) }

export const WithNamedTabs = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-slider v-bind="args">
    <bal-slider-item >
      <bal-card flat fullheight class="mt-2" color="red-light">
        <bal-card-title>One</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="purple-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Two</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="green-light">
        <bal-card-title>Three</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
      </bal-slider-item>
  </bal-slider>`,
})
WithNamedTabs.args = {
  tabs: ['One', 'Two', 'Three'],
}
WithNamedTabs.parameters = { ...component.sourceCode(WithNamedTabs) }
