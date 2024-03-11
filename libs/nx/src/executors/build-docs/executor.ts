import { mkdir } from 'fs/promises'
import { BuildDocsExecutorSchema } from './schema'
import { join } from 'path'
import { createWriteStream } from 'fs'
import archiver from 'archiver'
import { copy } from 'fs-extra'
import { execSync } from 'child_process'

export default async function runExecutor(options: BuildDocsExecutorSchema) {
  try {
    await copyResources(options)

    if (options.serve !== true) {
      const downloadPath = join(options.projectRoot, 'public', 'assets', 'download')
      await mkdir(downloadPath, { recursive: true })

      await archive(options.fontsAssetPath, downloadPath, 'fonts.zip')
      await archive(options.iconsAssetPath, downloadPath, 'icons.zip')
      await archive(options.brandIconsAssetPath, downloadPath, 'brand-icons.zip')
      await archive(options.mapMarkersAssetPath, downloadPath, 'map-markers.zip')
      await archive(options.faviconsAssetPath, downloadPath, 'favicons.zip')
      await archive(options.figmaTokensAssetPath, downloadPath, 'figma-tokens.zip')

      await compile(options)
    }
  } catch (error) {
    console.error(error)
    return { success: false }
  }

  return { success: true }
}

async function archive(fromPath: string, targetPath: string, fileName: string, fileScan = '*'): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(join(targetPath, fileName))
    output.on('close', () => resolve())
    output.on('error', err => reject(err.message))

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', err => reject(err.message))
    archive.pipe(output)
    archive.glob(fileScan, { cwd: fromPath.replace(/\\/g, '/') })
    archive.finalize()
  })
}

async function copyResources(options: BuildDocsExecutorSchema) {
  async function copyToAsset(from: string, to: string) {
    await copy(from, join(options.projectRoot, 'stories', 'assets', to), { recursive: true, overwrite: true })
  }

  async function copyToPublic(from: string, to: string) {
    await copy(from, join(options.projectRoot, 'public', to), { recursive: true, overwrite: true })
  }

  const packageRoot = join(options.projectRoot, '..', 'packages')
  await copyToAsset(join(packageRoot, 'maps/src/assets'), 'images/map-markers')
  await copyToAsset(join(packageRoot, 'icons/src/icons.json'), 'data/icons.json')
  await copyToAsset(join(packageRoot, 'brand-icons/src/icons.json'), 'data/brand-icons.json')
  await copyToAsset(join(packageRoot, 'styles/docs'), 'data/styles')

  const resourceRoot = join(options.projectRoot, '..', 'resources', 'data')
  await copyToAsset(join(resourceRoot, 'commands.json'), 'data/commands.json')
  await copyToAsset(join(resourceRoot, 'components.json'), 'data/components.json')
  await copyToAsset(join(resourceRoot, 'components.d.ts'), 'data/components.d.ts')
  await copyToAsset(join(resourceRoot, 'contributors.json'), 'data/contributors.json')
  await copyToAsset(join(resourceRoot, 'selectors.json'), 'data/selectors.json')
  await copyToAsset(join(resourceRoot, 'tags.json'), 'data/tags.json')

  await copyToPublic(join(packageRoot, 'core/www/build'), 'build')
  // await copyToPublic(join(packageRoot, 'table/css/design-system-table.css'), 'assets/css/design-system-table.css')
  await copyToPublic(
    join(packageRoot, 'styles/css/baloise-design-system.min.css'),
    'assets/css/baloise-design-system.min.css',
  )
  await copyToPublic(join(packageRoot, 'icons/src/assets'), 'assets/images/icons')
  await copyToPublic(join(packageRoot, 'brand-icons/src/assets'), 'assets/images/brand-icons')
  await copyToPublic(join(packageRoot, 'fonts/assets'), 'assets/fonts')
}

async function compile(options: BuildDocsExecutorSchema): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const cwd = join(process.cwd(), options.projectRoot)
      execSync('npx storybook build -o ./dist --quiet --disable-telemetry', {
        cwd,
        encoding: 'utf-8',
        stdio: 'inherit',
      })
      return resolve()
    } catch (error) {
      return reject(error)
    }
  })
}
