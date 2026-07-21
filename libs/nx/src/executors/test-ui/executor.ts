import { join } from 'path'
import { runCommand } from '../utils'
import { TestUiExecutorSchema } from './schema'

export default async function runExecutor(options: TestUiExecutorSchema) {
  try {
    await runCommand('npx vitest --ui', join(process.cwd(), options.projectRoot))
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}
