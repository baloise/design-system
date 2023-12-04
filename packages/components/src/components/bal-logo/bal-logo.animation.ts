import type { AnimationItem } from 'lottie-web/build/player/lottie_svg'
import Lottie from 'lottie-web/build/player/lottie_svg'
import { LogoAnimationData } from './bal-logo.data'

export const animate = (el: HTMLElement, color: 'blue' | 'white'): AnimationItem => {
  return Lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: LogoAnimationData(color),
  })
}
