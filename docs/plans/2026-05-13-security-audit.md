# Security Audit (CRA Compliance) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up four independent security layers (dependency gates, CodeQL SAST, SBOM per release, vulnerability disclosure policy) to satisfy EU Cyber Resilience Act open source steward obligations using free GitHub-native tooling.

**Architecture:** Each layer is a self-contained file change — no shared state between tasks, all independently deployable. Tasks 1–3 improve the development loop; Task 4 runs only on release; Task 5 is a static document.

**Tech Stack:** GitHub Actions, Dependabot, CodeQL (`github/codeql-action@v3`), `@cyclonedx/cyclonedx-npm`, GitHub Security Advisories

---

## File Map

| File | Status | Task |
|---|---|---|
| `.github/dependabot.yml` | Create | 1 |
| `.github/workflows/continuous.yml` | Modify | 2 |
| `.github/workflows/security.yml` | Create | 3 |
| `.github/workflows/publish.yml` | Modify | 4 |
| `package.json` | Modify | 4 |
| `SECURITY.md` | Create | 5 |

---

## Task 1: Dependabot Config

**Files:**
- Create: `.github/dependabot.yml`

Dependabot scans the npm workspace root (`/`) which covers all packages under `packages/*`, `libs/*`, and `docs` via the root `package.json` workspaces field. A second entry covers GitHub Actions versions.

- [ ] **Step 1: Create `.github/dependabot.yml`**

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '06:00'
      timezone: Europe/Zurich
    groups:
      minor-and-patch:
        update-types:
          - minor
          - patch
    open-pull-requests-limit: 10

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: '06:00'
      timezone: Europe/Zurich
```

- [ ] **Step 2: Verify YAML syntax**

```bash
npx js-yaml .github/dependabot.yml
```

Expected: prints the parsed object with no errors.

- [ ] **Step 3: Commit**

```bash
git add .github/dependabot.yml
git commit -m "chore: add dependabot config for npm and github-actions"
```

---

## Task 2: npm audit Gate in CI

**Files:**
- Modify: `.github/workflows/continuous.yml`

The `build` job is currently commented out. Add a new minimal `audit` job that installs dependencies and runs `npm audit --audit-level=high`. This blocks merges on high/critical CVEs without interfering with the playwright job.

- [ ] **Step 1: Add audit job to `continuous.yml`**

Open `.github/workflows/continuous.yml` and add the following job after the `assembleInformation` job (before `playwright:`):

```yaml
  audit:
    name: 🔒 Security Audit
    runs-on: ubuntu-latest
    timeout-minutes: 10
    env:
      HUSKY: 0
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - uses: ./.github/workflows/actions/setup-environment

      - name: Install dependencies
        run: npm ci

      - name: Audit dependencies
        run: npm audit --audit-level=high
```

- [ ] **Step 2: Verify YAML syntax**

```bash
npx js-yaml .github/workflows/continuous.yml
```

Expected: prints the parsed object with no errors.

- [ ] **Step 3: Confirm audit catches a real violation (manual smoke-test)**

```bash
npm audit --audit-level=high
```

Expected: exits 0 (no current high/critical CVEs). If it exits non-zero, open the Dependabot tab on GitHub to see which dependency is flagged and update it before continuing.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/continuous.yml
git commit -m "chore: add npm audit gate to CI"
```

---

## Task 3: CodeQL Static Analysis Workflow

**Files:**
- Create: `.github/workflows/security.yml`

A dedicated workflow separate from `continuous.yml` so a CodeQL timeout never blocks normal CI. The `security-events: write` permission is required for CodeQL to post alerts to the Security tab.

- [ ] **Step 1: Create `.github/workflows/security.yml`**

```yaml
name: 🔒 CodeQL

on:
  push:
    branches:
      - main
  pull_request:
  schedule:
    - cron: '0 6 * * 1'

jobs:
  analyze:
    name: Analyze (javascript-typescript)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    permissions:
      actions: read
      contents: read
      security-events: write
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
          queries: security-extended

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: /language:javascript-typescript
```

- [ ] **Step 2: Verify YAML syntax**

```bash
npx js-yaml .github/workflows/security.yml
```

Expected: prints the parsed object with no errors.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/security.yml
git commit -m "chore: add codeql security scanning workflow"
```

---

## Task 4: SBOM Generation on Release

**Files:**
- Modify: `.github/workflows/publish.yml`
- Modify: `package.json`

Generate a CycloneDX JSON SBOM after the build step and attach it to the GitHub Release. The `EndBug/add-and-commit@v9` step already creates a git tag; `gh release create` then creates a formal GitHub Release from that tag with the SBOM as an attached artifact.

- [ ] **Step 1: Install `@cyclonedx/cyclonedx-npm` as dev dependency**

```bash
npm install --save-dev @cyclonedx/cyclonedx-npm
```

Expected: `package.json` and `package-lock.json` updated.

- [ ] **Step 2: Verify the CLI works locally**

```bash
npx cyclonedx-npm --output-format JSON --output-file sbom.cdx.json
```

Expected: creates `sbom.cdx.json` in the current directory. Inspect it:

```bash
cat sbom.cdx.json | python3 -c "import json,sys; d=json.load(sys.stdin); print('components:', len(d.get('components', [])))"
```

Expected: prints a non-zero component count. Then delete the local file:

```bash
rm sbom.cdx.json
```

- [ ] **Step 3: Add SBOM and release steps to `publish.yml`**

Open `.github/workflows/publish.yml`. After the `Commit release` step (the `EndBug/add-and-commit@v9` step that creates the tag) and before the `Merge main -> production` step, add:

```yaml
      - name: Generate SBOM
        run: npx cyclonedx-npm --output-format JSON --output-file sbom.cdx.json

      - name: Create GitHub Release with SBOM
        run: |
          gh release create "v${{ steps.package-version.outputs.current-version }}" \
            sbom.cdx.json \
            --title "v${{ steps.package-version.outputs.current-version }}" \
            --notes "See [CHANGELOG.md](https://github.com/${{ github.repository }}/blob/main/CHANGELOG.md) for details."
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

- [ ] **Step 4: Verify YAML syntax**

```bash
npx js-yaml .github/workflows/publish.yml
```

Expected: prints the parsed object with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .github/workflows/publish.yml
git commit -m "chore: add sbom generation and github release on publish"
```

---

## Task 5: SECURITY.md Vulnerability Disclosure Policy

**Files:**
- Create: `SECURITY.md`

GitHub automatically surfaces `SECURITY.md` in the Security tab and as a link on the repository page. The "Report a vulnerability" button in GitHub Security Advisories is enabled by default for public repos — this file points reporters to it.

- [ ] **Step 1: Create `SECURITY.md` at the repo root**

```markdown
# Security Policy

## Supported Versions

Only the latest major version receives security patches.
Older major versions are unsupported.

| Version | Supported |
|---|---|
| Latest major | ✅ |
| Older majors | ❌ |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Use the [**Report a vulnerability**](../../security/advisories/new) button in the Security tab of this repository. This keeps the report private until a fix is ready.

We will acknowledge your report within **72 hours** and aim to release a fix or mitigation within **90 days**. We will notify you before public disclosure.

## Disclosure Policy

| Milestone | Commitment |
|---|---|
| Acknowledgement | Within 72 hours |
| Fix or mitigation | Within 90 days |
| Public disclosure | After fix is released |

This project follows the [Coordinated Vulnerability Disclosure](https://www.cisa.gov/coordinated-vulnerability-disclosure-process) model.
```

- [ ] **Step 2: Verify GitHub picks it up**

After pushing, navigate to `https://github.com/<org>/<repo>/security/policy` — GitHub should show the policy page. The "Report a vulnerability" button should appear in the Security tab.

- [ ] **Step 3: Enable private vulnerability reporting on GitHub**

In the GitHub repository settings: **Security → Code security and analysis → Private vulnerability reporting → Enable**.

This must be done manually in the UI — it cannot be configured via a file.

- [ ] **Step 4: Commit**

```bash
git add SECURITY.md
git commit -m "docs: add security policy and vulnerability disclosure process"
```

---

## Post-Implementation Checklist

After all tasks are merged to `main`:

- [ ] Dependabot tab shows pending dependency PRs (may take up to 24h for first scan)
- [ ] `audit` job appears in the next CI run and exits green
- [ ] CodeQL workflow appears under Actions and posts to the Security → Code scanning tab
- [ ] `SECURITY.md` is visible at `https://github.com/<org>/<repo>/security/policy`
- [ ] On the next release, `sbom.cdx.json` is attached to the GitHub Release artifacts
