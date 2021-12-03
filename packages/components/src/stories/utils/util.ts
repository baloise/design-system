import buildCtx from '../../../generated/components.json'

export const findComponent = (tag: string) => {
  const index = buildCtx.components.findIndex(c => c.tag === tag)
  if (index < 0) {
    return undefined
  }
  return buildCtx.components[index]
}
