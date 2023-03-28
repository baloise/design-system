import { Attributes } from '../../../utils/attributes'

export interface LevelInfo {
  type: 'meta' | 'main' | 'block' | 'block-item'
  value: string
  label: string
  isTabLink?: boolean
  link?: string
  target?: BalProps.BalButtonTarget
  linkLabel?: string
  color?: BalProps.BalNavigationLevelBlockColor
  subLevels?: LevelInfo[]
  trackingData?: Attributes
  onClick: (event: MouseEvent) => void
}

export const readSubLevels = async (element: HTMLElement, target: string): Promise<LevelInfo[]> => {
  const subLevels = Array.from(element.querySelectorAll<any>(target)) as any[]
  const levels: LevelInfo[] = []
  for (const level of subLevels) {
    const info = await level.getLevelInfo()
    levels.push(info)
  }
  return levels
}
