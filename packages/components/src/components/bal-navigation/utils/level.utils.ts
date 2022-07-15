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
  tabLink?: string
  link?: string
  linkLabel?: string
  color?: 'white' | 'grey'
  subLevels?: LevelInfo[]
  onClick: (event: MouseEvent) => void
}

export const readSubLevels = async (element: HTMLElement, target: string): Promise<LevelInfo[]> => {
  const subLevels = Array.from(element.querySelectorAll<any>(target)) as any[]
  const levels: LevelInfo[] = []
  for (const level of subLevels) {
    const info = await level.getLevelInfo()
    console.info('INFO ', info)
    levels.push(info)
  }
  console.info('levels ', levels)
  return levels
}
