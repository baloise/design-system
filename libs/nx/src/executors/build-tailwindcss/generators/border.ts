import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

export const generateBorder = async (options: BuildTailwindcssExecutorSchema) => {
  const borderWidthTokens = await getTokens({ token: 'size.border.width', ...options })

  const borderWidth =
    Object.entries(borderWidthTokens)
      .map(([key, token]) => {
        const className = `.border-${key}`
        const variableName = `--${token.name}`
        return `  ${className} {${NEWLINE}    border-width: var(${variableName});${NEWLINE}  }`
      })
      .join(NEWLINE) +
    NEWLINE +
    NEWLINE

  const borderColorTokens = await getTokens({ token: 'color.border', ...options })

  const positions = ['', '-top', '-right', '-bottom', '-left']
  const content = []
  positions.forEach(position => {
    content.push(
      Object.entries(borderColorTokens)
        .map(([key, token]) => {
          if (key === 'inverted') {
            return ''
          }
          const name = key === 'default' ? '' : `-${key}`
          const className = `.border${position}${name}`
          const variableName = `--${token.name}`
          return `
  ${className} {
    border${position}-color: var(${variableName});
    border${position}-width: var(--bal-border-width-normal);
  }`
        })
        .join(NEWLINE) +
        NEWLINE +
        NEWLINE,
    )
  })

  return [borderWidth, content.join(NEWLINE + NEWLINE)].join(NEWLINE + NEWLINE) + NEWLINE + NEWLINE
}
