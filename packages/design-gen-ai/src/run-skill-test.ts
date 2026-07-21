// Quick skill test runner — Kontaktformular
import { validateLayout } from './validation/validator.js'
import { createFile } from './generators/file-creator.js'
import { getComponents } from './generators/registry.js'
import type { Layout } from './types/index.js'

// ── Schritt 1: get_components ──────────────────────────────
console.error('\n📋 Schritt 1 — get_components({ pageType: "form" })')
const components = getComponents('form')
console.error(`   → ${components.totalComponents} erlaubte Komponenten geladen`)
console.error(`   → Quelle: ${components.source}`)

// ── Schritt 2: Layout (was Claude generieren würde) ────────
console.error('\n🤖 Schritt 2 — KI generiert Layout')
console.error('   Input: "Kontaktformular mit Name, Email, Nachricht und Senden-Button"')

const layout: Layout = {
  layout: [
    {
      component: 'bal-navbar',
      children: [{ component: 'bal-navbar-brand', content: 'Helvetia' }],
    },
    {
      component: 'bal-content',
      children: [
        {
          component: 'bal-stack',
          children: [
            { component: 'bal-heading', props: { level: 1 }, content: 'Kontakt' },
            { component: 'bal-text', content: 'Haben Sie Fragen? Schreiben Sie uns.' },
            {
              component: 'bal-form',
              children: [
                {
                  component: 'bal-form-grid',
                  children: [
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Name' },
                        { component: 'bal-input', props: { type: 'text', name: 'name', required: true } },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'E-Mail' },
                        { component: 'bal-input', props: { type: 'email', name: 'email', required: true } },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Nachricht' },
                        { component: 'bal-textarea', props: { name: 'message', required: true } },
                      ],
                    },
                  ],
                },
                {
                  component: 'bal-button-group',
                  children: [
                    { component: 'bal-button', props: { type: 'submit' }, content: 'Senden' },
                    { component: 'bal-button', props: { type: 'reset' }, content: 'Zurücksetzen' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { component: 'bal-footer', content: '© 2026 Helvetia Versicherungen' },
  ],
}

// ── Schritt 3: validate_layout ─────────────────────────────
console.error('\n✅ Schritt 3 — validate_layout()')
const validation = validateLayout(layout)
console.error(`   Score:    ${validation.score}/100`)
console.error(`   Valid:    ${validation.valid ? '✅ JA' : '❌ NEIN'}`)
console.error(`   Errors:   ${validation.errors.length}`)
console.error(`   Warnings: ${validation.warnings.length}`)

if (validation.errors.length > 0) {
  for (const e of validation.errors) console.error(`   ❌ ${e.issue}`)
}
if (validation.warnings.length > 0) {
  for (const w of validation.warnings) console.error(`   ⚠️  ${w.message}`)
}

// ── Schritt 4: create_file ─────────────────────────────────
const html = `<bal-navbar>
  <bal-navbar-brand>Helvetia</bal-navbar-brand>
</bal-navbar>

<bal-content>
  <bal-stack>
    <bal-heading level="1">Kontakt</bal-heading>
    <bal-text>Haben Sie Fragen? Schreiben Sie uns.</bal-text>

    <bal-form>
      <bal-form-grid>
        <bal-form-col>
          <bal-label>Name</bal-label>
          <bal-input type="text" name="name" required></bal-input>
        </bal-form-col>

        <bal-form-col>
          <bal-label>E-Mail</bal-label>
          <bal-input type="email" name="email" required></bal-input>
        </bal-form-col>

        <bal-form-col>
          <bal-label>Nachricht</bal-label>
          <bal-textarea name="message" required></bal-textarea>
        </bal-form-col>
      </bal-form-grid>

      <bal-button-group>
        <bal-button type="submit">Senden</bal-button>
        <bal-button type="reset">Zurücksetzen</bal-button>
      </bal-button-group>
    </bal-form>
  </bal-stack>
</bal-content>

<bal-footer>© 2026 Helvetia Versicherungen</bal-footer>`

if (validation.score >= 60) {
  console.error('\n📄 Schritt 4 — create_file()')
  const result = createFile('Bachlore_Test/kontakt/kontakt.component.html', html, 'angular')
  console.error('   Erstellt:')
  for (const f of result.created) console.error(`   ✅ ${f}`)
  console.error(`\n   Angular Bundles: ${result.angularModulesDetected?.join(', ')}`)
} else {
  console.error('\n⚠️  Score zu niedrig — Retry würde ausgelöst')
}

// ── Ergebnis ───────────────────────────────────────────────
console.error('\n' + '═'.repeat(55))
console.error('  ERGEBNIS')
console.error('═'.repeat(55))
console.error(`  Input:    "Kontaktformular mit Name, Email, Nachricht"`)
console.error(`  Format:   Angular Standalone Component`)
console.error(`  Score:    ${validation.score}/100`)
console.error(`  Status:   ${validation.score >= 80 ? '✅ BESTANDEN' : '❌ NICHT BESTANDEN'}`)
console.error('═'.repeat(55))
