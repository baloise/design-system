import { flatten } from 'lottie-colorify'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import Lottie from 'lottie-web/build/player/lottie_light_html'
import { LogoAnimationData } from './bal-logo.data'

export const animate = (el: HTMLElement, color: string, loop = false): AnimationItem => {
  return Lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: loop,
    autoplay: true,
    // animationData: LogoAnimationData(color),
    animationData: flatten('red', LogoAnimationData('red')),
    rendererSettings: {
      viewBoxOnly: true,
      viewBoxSize: '80 80 980 980',
      preserveAspectRatio: 'xMidYMid slice',
    },
  })
}
