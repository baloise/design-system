import docs from './bal-image-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalImageSlider, BalImageSliderItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Image Slider',
  component: BalImageSlider,
  subcomponents: { BalImageSliderItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-image-slider>
    <bal-image-slider-item src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw"></bal-image-slider-item>
  </bal-image-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Numbers = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-image-slider>
    <bal-image-slider-item src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/655/1280/720.jpg?hmac=hXgGrMmXgMWk4vzfN_ytAgDqAvgZ6kMi-izJ785jRNM"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/1066/1280/720.jpg?hmac=ccSBWaWM3h_3guS9T5hxEUd8Ni9rIcY9EUZ6FqOfO94"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/883/1280/720.jpg?hmac=IcmbdOKDeeNZnShxhaXaPe29llC1cM6swwXc8I83MB8"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/545/1280/720.jpg?hmac=BDz2Mrx1JyKMp9Atqvy1MtMFxmYO-xXmYmiku5XMDVs"></bal-image-slider-item>
    <bal-image-slider-item src="https://i.picsum.photos/id/115/1280/720.jpg?hmac=GOG9AmYyg9CR0FiDq-hEVsqLBO9rLH93kliNgEcHaG8"></bal-image-slider-item>
  </bal-image-slider>`,
})
Numbers.args = {}
Numbers.parameters = { ...component.sourceCode(Numbers) }

export const CustomContent = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-image-slider>
    <bal-image-slider-item>
      <img src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI" />
    </bal-image-slider-item>
    <bal-image-slider-item>
      <img src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I" />
    </bal-image-slider-item>
    <bal-image-slider-item>
      <img src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw" />
    </bal-image-slider-item>
  </bal-image-slider>`,
})
CustomContent.args = {}
CustomContent.parameters = { ...component.sourceCode(CustomContent) }

export const WithGrid = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <div class="columns">
    <div class="column is-4">
      <bal-image-slider>
        <bal-image-slider-item src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI"></bal-image-slider-item>
        <bal-image-slider-item src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I"></bal-image-slider-item>
        <bal-image-slider-item src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw"></bal-image-slider-item>
      </bal-image-slider>
    </div>
    <div class="column is-8">
      <h3 class="title is-size-3">Title</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus dignissim orci. Mauris sit amet nisi pretium sem blandit pharetra. Sed fringilla dolor ut arcu blandit, sed pharetra orci placerat. Integer sed luctus enim. Suspendisse non placerat lorem. Praesent dignissim mi nec quam malesuada tincidunt. Duis metus nulla, aliquet sed volutpat vitae, gravida nec leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus tristique suscipit risus vel suscipit. Pellentesque condimentum congue blandit.</p>
    </div>
  </div>`,
})
WithGrid.args = {}
WithGrid.parameters = { ...component.sourceCode(WithGrid) }
