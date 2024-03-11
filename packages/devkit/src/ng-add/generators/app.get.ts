import { SchematicsException, Tree } from '@angular-devkit/schematics'
import { getPrefix } from '../utils/workspace'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateAppComponent = (host: Tree) => {
  const appTemplatePath = `src/app/app.component.html`
  const appComponentPath = `src/app/app.component.ts`
  const appStylesPath = `src/app/app.component.css`
  const appStylesSassPath = `src/app/app.component.scss`

  const isInlineTemplate = !host.exists(appTemplatePath)
  const prefix = getPrefix(host)

  const hasCssStyles = host.exists(appStylesPath)
  const hasSassStyles = host.exists(appStylesSassPath)
  const hasStyles = hasCssStyles || hasSassStyles
  const styleTemplate = hasStyles ? `styleUrl: './app.component.${hasCssStyles ? 'css' : 'scss'}',` : ''

  const appComponentBuffer = host.read(appComponentPath)
  if (appComponentBuffer) {
    const appComponentContent = appComponentBuffer.toString()
    const isOnPush = appComponentContent.includes('ChangeDetectionStrategy.OnPush')
    const onPushTemplate = isOnPush ? `changeDetection: ChangeDetectionStrategy.OnPush,` : ''

    if (isInlineTemplate) {
      host.overwrite(
        appComponentPath,
        `import { Component, CUSTOM_ELEMENTS_SCHEMA${isOnPush ? ', ChangeDetectionStrategy' : ''} } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BalLayoutBundle, BalHeading, BalButton } from '@baloise/ds-angular'

@Component({
  selector: '${prefix}-root',
  standalone: true,${onPushTemplate}
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BalLayoutBundle, BalHeading, BalButton],
  ${styleTemplate}
  template: \` <bal-app class="has-sticky-footer">
    <header>
      <!-- Header content -->
    </header>
    <main class="container">
      <!-- Your application content -->
      <bal-heading>Hello World!</bal-heading>
      <bal-button>Button</bal-button>
    </main>
    <bal-footer>
      <!-- Footer content -->
    </bal-footer>
  </bal-app>\`,
})
export class AppComponent {}
`,
      )
    } else {
      host.overwrite(
        appComponentPath,
        `import { Component, CUSTOM_ELEMENTS_SCHEMA${isOnPush ? ', ChangeDetectionStrategy' : ''} } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BalLayoutBundle, BalHeading, BalButton } from '@baloise/ds-angular'

@Component({
  selector: '${prefix}-root',
  standalone: true,${onPushTemplate}
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BalLayoutBundle, BalHeading, BalButton],
  templateUrl: './app.component.html',
  ${styleTemplate}
})
export class AppComponent {}
`,
      )

      host.overwrite(
        appTemplatePath,
        `<bal-app class="has-sticky-footer">
  <header>
    <!-- Header content -->
  </header>
  <main class="container">
    <!-- Your application content -->
    <bal-heading>Hello World!</bal-heading>
    <bal-button>Button</bal-button>
  </main>
  <bal-footer>
    <!-- Footer content -->
  </bal-footer>
</bal-app>`,
      )
    }
  } else {
    throw new SchematicsException(`Could not find (${appComponentPath})`)
  }
}
