import docs from './bal-image-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalImageSlider } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Image Slider',
  component: BalImageSlider,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-heading level="h4" space="bottom">Basic</bal-heading>
  <bal-image-slider>
    <div slot="images">
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw" />
      </div>
    </div>
  </bal-image-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Dots = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-heading level="h4" space="bottom">Dots</bal-heading>
  <bal-image-slider>
    <div slot="images">
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/655/1280/720.jpg?hmac=hXgGrMmXgMWk4vzfN_ytAgDqAvgZ6kMi-izJ785jRNM" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/1066/1280/720.jpg?hmac=ccSBWaWM3h_3guS9T5hxEUd8Ni9rIcY9EUZ6FqOfO94" />
      </div>
    </div>
  </bal-image-slider>`,
})
Dots.args = {}
Dots.parameters = { ...component.sourceCode(Basic) }

export const Numbers = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-heading level="h4" space="bottom">Numbers</bal-heading>
  <bal-image-slider>
    <div slot="images">
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/655/1280/720.jpg?hmac=hXgGrMmXgMWk4vzfN_ytAgDqAvgZ6kMi-izJ785jRNM" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/1066/1280/720.jpg?hmac=ccSBWaWM3h_3guS9T5hxEUd8Ni9rIcY9EUZ6FqOfO94" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/883/1280/720.jpg?hmac=IcmbdOKDeeNZnShxhaXaPe29llC1cM6swwXc8I83MB8" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/545/1280/720.jpg?hmac=BDz2Mrx1JyKMp9Atqvy1MtMFxmYO-xXmYmiku5XMDVs" />
      </div>
      <div class="bal-image-slider__item">
        <img src="https://i.picsum.photos/id/115/1280/720.jpg?hmac=GOG9AmYyg9CR0FiDq-hEVsqLBO9rLH93kliNgEcHaG8" />
      </div>
    </div>
  </bal-image-slider>`,
})
Numbers.args = {}
Numbers.parameters = { ...component.sourceCode(Basic) }
