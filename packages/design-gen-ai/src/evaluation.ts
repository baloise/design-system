// ============================================================
// Phase 7: Evaluation Runner
// Runs all 3 defined test cases through the full pipeline:
// validateLayout() → createFile() → report results
// ============================================================

import { validateLayout } from './validation/validator.js'
import { createFile } from './generators/file-creator.js'
import type { Layout } from './types/index.js'

// ============================================================
// Test Case Layouts
// Represent what Claude would generate for each test case input
// ============================================================

const TC01_LAYOUT: Layout = {
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
            { component: 'bal-heading', props: { level: 1 }, content: 'Anmelden' },
            {
              component: 'bal-form',
              children: [
                {
                  component: 'bal-form-grid',
                  children: [
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
                        { component: 'bal-label', content: 'Passwort' },
                        { component: 'bal-input', props: { type: 'password', name: 'password', required: true } },
                      ],
                    },
                  ],
                },
                {
                  component: 'bal-button-group',
                  children: [{ component: 'bal-button', props: { type: 'submit' }, content: 'Anmelden' }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      component: 'bal-footer',
      content: '© 2026 Helvetia Versicherungen',
    },
  ],
}

const TC01_HTML = `<bal-navbar>
  <bal-navbar-brand>Helvetia</bal-navbar-brand>
</bal-navbar>

<bal-content>
  <bal-stack>
    <bal-heading level="1">Anmelden</bal-heading>
    <bal-form>
      <bal-form-grid>
        <bal-form-col>
          <bal-label>E-Mail</bal-label>
          <bal-input type="email" name="email" required></bal-input>
        </bal-form-col>
        <bal-form-col>
          <bal-label>Passwort</bal-label>
          <bal-input type="password" name="password" required></bal-input>
        </bal-form-col>
      </bal-form-grid>
      <bal-button-group>
        <bal-button type="submit">Anmelden</bal-button>
      </bal-button-group>
    </bal-form>
  </bal-stack>
</bal-content>

<bal-footer>© 2026 Helvetia Versicherungen</bal-footer>`

// ============================================================
// TC-02: Versicherungsformular
// ============================================================

const TC02_LAYOUT: Layout = {
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
            { component: 'bal-heading', props: { level: 1 }, content: 'Versicherungsantrag' },
            {
              component: 'bal-steps',
              children: [
                { component: 'bal-step-item', content: 'Persönliche Angaben' },
                { component: 'bal-step-item', content: 'Versicherungsdetails' },
                { component: 'bal-step-item', content: 'Bestätigung' },
              ],
            },
            {
              component: 'bal-form',
              children: [
                {
                  component: 'bal-form-grid',
                  children: [
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Vorname' },
                        { component: 'bal-input', props: { type: 'text', name: 'firstName', required: true } },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Nachname' },
                        { component: 'bal-input', props: { type: 'text', name: 'lastName', required: true } },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Geburtsdatum' },
                        { component: 'bal-input-date', props: { name: 'birthDate', required: true } },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        { component: 'bal-label', content: 'Versicherungstyp' },
                        {
                          component: 'bal-select',
                          props: { name: 'insuranceType', required: true },
                          children: [
                            {
                              component: 'bal-select-option',
                              props: { value: 'health' },
                              content: 'Krankenversicherung',
                            },
                            { component: 'bal-select-option', props: { value: 'car' }, content: 'Autoversicherung' },
                            {
                              component: 'bal-select-option',
                              props: { value: 'home' },
                              content: 'Hausratversicherung',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      component: 'bal-form-col',
                      children: [
                        {
                          component: 'bal-checkbox-group',
                          children: [
                            {
                              component: 'bal-checkbox',
                              props: { name: 'agb', required: true },
                              content: 'Ich akzeptiere die AGB',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  component: 'bal-button-group',
                  children: [
                    { component: 'bal-button', props: { type: 'submit' }, content: 'Absenden' },
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

const TC02_HTML = `<bal-navbar>
  <bal-navbar-brand>Helvetia</bal-navbar-brand>
</bal-navbar>

<bal-content>
  <bal-stack>
    <bal-heading level="1">Versicherungsantrag</bal-heading>
    <bal-steps>
      <bal-step-item>Persönliche Angaben</bal-step-item>
      <bal-step-item>Versicherungsdetails</bal-step-item>
      <bal-step-item>Bestätigung</bal-step-item>
    </bal-steps>
    <bal-form>
      <bal-form-grid>
        <bal-form-col>
          <bal-label>Vorname</bal-label>
          <bal-input type="text" name="firstName" required></bal-input>
        </bal-form-col>
        <bal-form-col>
          <bal-label>Nachname</bal-label>
          <bal-input type="text" name="lastName" required></bal-input>
        </bal-form-col>
        <bal-form-col>
          <bal-label>Geburtsdatum</bal-label>
          <bal-input-date name="birthDate" required></bal-input-date>
        </bal-form-col>
        <bal-form-col>
          <bal-label>Versicherungstyp</bal-label>
          <bal-select name="insuranceType" required>
            <bal-select-option value="health">Krankenversicherung</bal-select-option>
            <bal-select-option value="car">Autoversicherung</bal-select-option>
            <bal-select-option value="home">Hausratversicherung</bal-select-option>
          </bal-select>
        </bal-form-col>
        <bal-form-col>
          <bal-checkbox-group>
            <bal-checkbox name="agb" required>Ich akzeptiere die AGB</bal-checkbox>
          </bal-checkbox-group>
        </bal-form-col>
      </bal-form-grid>
      <bal-button-group>
        <bal-button type="submit">Absenden</bal-button>
        <bal-button type="reset">Zurücksetzen</bal-button>
      </bal-button-group>
    </bal-form>
  </bal-stack>
</bal-content>

<bal-footer>© 2026 Helvetia Versicherungen</bal-footer>`

// ============================================================
// TC-03: Dashboard
// ============================================================

const TC03_LAYOUT: Layout = {
  layout: [
    {
      component: 'bal-navbar',
      children: [{ component: 'bal-navbar-brand', content: 'Helvetia Dashboard' }],
    },
    {
      component: 'bal-stage',
      children: [
        {
          component: 'bal-stage-head',
          children: [{ component: 'bal-heading', props: { level: 1 }, content: 'Willkommen' }],
        },
        {
          component: 'bal-stage-body',
          children: [{ component: 'bal-text', content: 'Ihr persönliches Dashboard' }],
        },
      ],
    },
    {
      component: 'bal-content',
      children: [
        {
          component: 'bal-stack',
          children: [
            { component: 'bal-heading', props: { level: 2 }, content: 'Unsere Produkte' },
            {
              component: 'bal-card',
              children: [
                { component: 'bal-card-title', content: 'Krankenversicherung' },
                {
                  component: 'bal-card-content',
                  children: [{ component: 'bal-text', content: 'Umfassender Gesundheitsschutz' }],
                },
                { component: 'bal-card-actions', children: [{ component: 'bal-button', content: 'Details' }] },
              ],
            },
            {
              component: 'bal-card',
              children: [
                { component: 'bal-card-title', content: 'Autoversicherung' },
                {
                  component: 'bal-card-content',
                  children: [{ component: 'bal-text', content: 'Schutz für Ihr Fahrzeug' }],
                },
                { component: 'bal-card-actions', children: [{ component: 'bal-button', content: 'Details' }] },
              ],
            },
            {
              component: 'bal-card',
              children: [
                { component: 'bal-card-title', content: 'Hausratversicherung' },
                {
                  component: 'bal-card-content',
                  children: [{ component: 'bal-text', content: 'Schutz für Ihr Zuhause' }],
                },
                { component: 'bal-card-actions', children: [{ component: 'bal-button', content: 'Details' }] },
              ],
            },
            { component: 'bal-heading', props: { level: 2 }, content: 'Häufig gestellte Fragen' },
            {
              component: 'bal-accordion',
              children: [
                { component: 'bal-accordion-summary', content: 'Was ist im Basisschutz enthalten?' },
                {
                  component: 'bal-accordion-details',
                  content: 'Der Basisschutz umfasst ambulante und stationäre Behandlungen.',
                },
              ],
            },
            {
              component: 'bal-accordion',
              children: [
                { component: 'bal-accordion-summary', content: 'Wie beantrage ich einen Schaden?' },
                {
                  component: 'bal-accordion-details',
                  content: 'Sie können Ihren Schaden online über unser Portal melden.',
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

const TC03_HTML = `<bal-navbar>
  <bal-navbar-brand>Helvetia Dashboard</bal-navbar-brand>
</bal-navbar>

<bal-stage>
  <bal-stage-head>
    <bal-heading level="1">Willkommen</bal-heading>
  </bal-stage-head>
  <bal-stage-body>
    <bal-text>Ihr persönliches Dashboard</bal-text>
  </bal-stage-body>
</bal-stage>

<bal-content>
  <bal-stack>
    <bal-heading level="2">Unsere Produkte</bal-heading>

    <bal-card>
      <bal-card-title>Krankenversicherung</bal-card-title>
      <bal-card-content>
        <bal-text>Umfassender Gesundheitsschutz</bal-text>
      </bal-card-content>
      <bal-card-actions>
        <bal-button>Details</bal-button>
      </bal-card-actions>
    </bal-card>

    <bal-card>
      <bal-card-title>Autoversicherung</bal-card-title>
      <bal-card-content>
        <bal-text>Schutz für Ihr Fahrzeug</bal-text>
      </bal-card-content>
      <bal-card-actions>
        <bal-button>Details</bal-button>
      </bal-card-actions>
    </bal-card>

    <bal-card>
      <bal-card-title>Hausratversicherung</bal-card-title>
      <bal-card-content>
        <bal-text>Schutz für Ihr Zuhause</bal-text>
      </bal-card-content>
      <bal-card-actions>
        <bal-button>Details</bal-button>
      </bal-card-actions>
    </bal-card>

    <bal-heading level="2">Häufig gestellte Fragen</bal-heading>

    <bal-accordion>
      <bal-accordion-summary>Was ist im Basisschutz enthalten?</bal-accordion-summary>
      <bal-accordion-details>Der Basisschutz umfasst ambulante und stationäre Behandlungen.</bal-accordion-details>
    </bal-accordion>

    <bal-accordion>
      <bal-accordion-summary>Wie beantrage ich einen Schaden?</bal-accordion-summary>
      <bal-accordion-details>Sie können Ihren Schaden online über unser Portal melden.</bal-accordion-details>
    </bal-accordion>

  </bal-stack>
</bal-content>

<bal-footer>© 2026 Helvetia Versicherungen</bal-footer>`

// ============================================================
// Evaluation Runner
// ============================================================

interface TestCase {
  id: string
  name: string
  input: string
  layout: Layout
  html: string
  outputPath: string
  minScore: number
}

const TEST_CASES: TestCase[] = [
  {
    id: 'TC-01',
    name: 'Login-Seite',
    input: 'Erstelle eine Login-Seite mit Email, Passwort und Login-Button',
    layout: TC01_LAYOUT,
    html: TC01_HTML,
    outputPath: 'tmp/evaluation/tc01-login/login.component.html',
    minScore: 80,
  },
  {
    id: 'TC-02',
    name: 'Versicherungsformular',
    input:
      'Erstelle ein Versicherungsformular mit Name, Geburtsdatum, Versicherungstyp (Auswahl), Checkbox für AGB und Absenden-Button',
    layout: TC02_LAYOUT,
    html: TC02_HTML,
    outputPath: 'tmp/evaluation/tc02-form/versicherung.component.html',
    minScore: 80,
  },
  {
    id: 'TC-03',
    name: 'Dashboard',
    input: 'Erstelle ein Dashboard mit Hero-Bereich, drei Produkt-Cards und einer FAQ-Sektion',
    layout: TC03_LAYOUT,
    html: TC03_HTML,
    outputPath: 'tmp/evaluation/tc03-dashboard/dashboard.component.html',
    minScore: 80,
  },
]

function printSeparator(char = '─', width = 60): void {
  console.error(char.repeat(width))
}

async function runEvaluation(): Promise<void> {
  console.error('\n')
  printSeparator('═')
  console.error('  PHASE 7 — EVALUATION: AI Frontend Generator')
  console.error('  Helvetia Design System | 3 Testfälle')
  printSeparator('═')

  const results: Array<{ tc: TestCase; score: number; passed: boolean; filesCreated: string[] }> = []

  for (const tc of TEST_CASES) {
    console.error(`\n${tc.id}: ${tc.name}`)
    printSeparator()
    console.error(`  Input: "${tc.input}"`)

    // Step 1: Validate layout
    console.error('\n  [1/2] Validating layout...')
    const validation = validateLayout(tc.layout)

    console.error(`  Score:    ${validation.score}/100`)
    console.error(`  Valid:    ${validation.valid ? '✅ YES' : '❌ NO'}`)
    console.error(`  Errors:   ${validation.errors.length}`)
    console.error(`  Warnings: ${validation.warnings.length}`)

    if (validation.errors.length > 0) {
      console.error('\n  Errors:')
      for (const err of validation.errors) {
        console.error(`    ❌ [${err.rule}] ${err.issue}`)
      }
    }
    if (validation.warnings.length > 0) {
      console.error('\n  Warnings:')
      for (const warn of validation.warnings) {
        console.error(`    ⚠️  ${warn.message}`)
      }
    }

    // Step 2: Create file (only if score >= 60)
    let filesCreated: string[] = []
    if (validation.score >= 60) {
      console.error('\n  [2/2] Creating Angular component files...')
      const fileResult = createFile(tc.outputPath, tc.html, 'angular')
      filesCreated = fileResult.created
      console.error(`  Files created:`)
      for (const f of filesCreated) {
        console.error(`    📄 ${f}`)
      }
      if (fileResult.angularModulesDetected?.length) {
        console.error(`  Angular modules: ${fileResult.angularModulesDetected.join(', ')}`)
      }
    } else {
      console.error('\n  [2/2] SKIPPED — score too low for file creation')
    }

    const passed = validation.score >= tc.minScore
    console.error(
      `\n  ${passed ? '✅ PASSED' : '❌ FAILED'} (score ${validation.score} ${passed ? '>=' : '<'} ${tc.minScore} required)`,
    )
    results.push({ tc, score: validation.score, passed, filesCreated })
  }

  // Summary
  console.error('\n')
  printSeparator('═')
  console.error('  EVALUATION SUMMARY')
  printSeparator('═')

  const allPassed = results.every(r => r.passed)
  const totalScore = results.reduce((sum, r) => sum + r.score, 0)
  const avgScore = Math.round(totalScore / results.length)

  for (const r of results) {
    const status = r.passed ? '✅' : '❌'
    console.error(`  ${status} ${r.tc.id} — ${r.tc.name}: ${r.score}/100`)
  }

  console.error(`\n  Average Score: ${avgScore}/100`)
  console.error(`  All tests passed: ${allPassed ? '✅ YES' : '❌ NO (see above)'}`)
  printSeparator('═')
  console.error('\n')
}

runEvaluation().catch(err => {
  console.error('Evaluation failed:', err)
  process.exit(1)
})
