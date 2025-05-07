import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens } from './utils'

export const generateSpacing = async (options: BuildTailwindcssExecutorSchema) => {
  const tokens = await getTokens({ token: 'size.space', ...options })
  console.log('tokens', tokens)
}
