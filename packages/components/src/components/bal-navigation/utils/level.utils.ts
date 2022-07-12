export const observeLevels = (target: Node, level: string, notify: () => void) => {
  /* tslint:disable-next-line */
  if (typeof MutationObserver === 'undefined') {
    return
  }

  const mutation = new MutationObserver(mutationList => {
    mutationList = mutationList.filter(record => record.target.nodeName === level.toLocaleUpperCase())
    if (mutationList.length > 0) {
      notify()
    }
  })

  mutation.observe(target, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  })

  return mutation
}

export interface LevelInfo {
  type: 'meta' | 'main' | 'block' | 'block-item'
  value: string
  label: string
  metaLink?: string
  link?: string
  linkLabel?: string
  color?: 'white' | 'grey'
  subLevels?: LevelInfo[]
  onClick: (event: MouseEvent) => void
}

export const readSubLevels = async (element: HTMLElement, target: string): Promise<LevelInfo[]> => {
  const subLevels = element.querySelectorAll<any>(target)
  const levels: LevelInfo[] = []
  subLevels.forEach(async level => {
    const info = await level.getLevelInfo()
    levels.push(info)
  })
  return levels
}
