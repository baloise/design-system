import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import Lottie from 'lottie-web/build/player/lottie_light_html'
import { SpinnerAnimationData } from './bal-spinner.data'
import { flatten } from 'lottie-colorify'

export const animate = (el: HTMLElement, color: string): AnimationItem => {
  return Lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: flatten(color, SpinnerAnimationData(color)),
  })
}
