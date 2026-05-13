# Security Audit Design

**Date:** 2026-05-13
**Regulation:** EU Cyber Resilience Act (CRA) — open source steward obligations
**Scope:** Automated CI/CD security gates, GitHub-native tooling only
**Distribution:** Public npm packages

---

## Background

The Baloise Design System is published publicly on npm as open source. Under the EU Cyber Resilience Act (most provisions apply from December 2027), publicly maintained open source projects fall under the **open source steward** category. This carries lighter obligations than a full manufacturer but still requires:

- A vulnerability handling and disclosure process
- A Software Bill of Materials (SBOM) per release
- Security updates for known vulnerabilities throughout the support period
- Machine-readable documentation of software composition

This design covers all four obligations using free, GitHub-native tooling with near-zero maintenance overhead.

---

## Architecture

Four independent layers, each addressing a distinct CRA requirement:

```
1. Dependency gates     →  Dependabot + npm audit in CI
2. Static analysis      →  CodeQL in a dedicated security workflow
3. SBOM per release     →  @cyclonedx/cyclonedx-npm in publish.yml
4. Disclosure policy    →  SECURITY.md + GitHub Security Advisories
```

Each layer is independently deployable and fails safely — a CodeQL timeout, for example, does not block the normal build pipeline.

---

## Section 1: Dependency Vulnerability Gates

### Dependabot

A `.github/dependabot.yml` config monitors the npm ecosystem across all workspace directories:

- `root` (`.`)
- `packages/*` — core, css, tokens, assets, playwright
- `libs/*` — output-target-angular, output-target-web, eslint-plugin
- `docs`

**Batching strategy:**
- Security updates: unbatched, opened immediately
- Minor/patch updates: grouped into a single weekly PR per directory to avoid noise

**Schedule:** Weekly on Monday for non-security updates.

### npm audit gate in CI

A step added to the `build` job in `continuous.yml`, after `npm ci`:

```yaml
- name: Security audit
  run: npm audit --audit-level=high
```

Blocks merges when any dependency has a **high or critical** CVE. Runs on every push and PR.

**Why separate from Dependabot:** Dependabot opens PRs reactively when it detects new advisories. The `npm audit` gate is the synchronous enforcement point — it catches cases where a PR introduces a vulnerable dep that Dependabot hasn't processed yet.

---

## Section 2: Static Analysis (CodeQL)

A dedicated **`.github/workflows/security.yml`** workflow, separate from `continuous.yml`, running CodeQL with the `security-extended` query suite.

**Triggers:**
- Push to `main`
- Every pull request
- Weekly schedule (catches newly-published vulnerability patterns without code changes)

**Language:** `javascript-typescript` — covers all TypeScript/JavaScript across the monorepo.

**Query suite:** `security-extended` — detects XSS sinks, prototype pollution, unsafe regex (ReDoS), insecure randomness, and path traversal. Relevant given the library handles user-provided content (`dompurify` is already a runtime dependency, indicating XSS awareness).

**Results:** Surfaced as GitHub code-scanning alerts in the Security tab, not buried in build logs. Critical and high alerts block merges via branch protection rules.

---

## Section 3: SBOM Generation

**Tool:** `@cyclonedx/cyclonedx-npm`
**Format:** CycloneDX JSON (`sbom.cdx.json`)
**Trigger:** During `publish.yml`, after the build step and before publish

The SBOM lists every direct and transitive dependency with name, version, license identifier, and any known CVE references at time of generation.

**Distribution:** Attached to the GitHub Release as a release artifact (`sbom.cdx.json`), versioned alongside the npm publish. Publicly accessible without any separate hosting.

**Why CycloneDX over SPDX:** CycloneDX has native npm tooling, better support for vulnerability metadata, and is the format most commonly accepted by CRA-related tooling in the EU supply chain.

---

## Section 4: SECURITY.md & Vulnerability Disclosure Policy

A **`SECURITY.md`** file at the repository root. GitHub surfaces this automatically in the Security tab and on the repo page.

### Content

**Supported versions**
Only the latest major version receives security patches. Older majors are unsupported.

**Reporting a vulnerability**
Use GitHub's built-in **"Report a vulnerability"** button (Security → Advisories). This keeps reports private until a fix is published. Do not open public issues for security vulnerabilities.

**Response SLA**
| Milestone | Commitment |
|---|---|
| Acknowledgement | Within 72 hours |
| Fix or mitigation | Within 90 days |
| Public disclosure | After fix is released |

**Why GitHub Security Advisories:** Handles the full CVD workflow natively — private triage, patch coordination, and CVE assignment — without external tools or email addresses.

---

## What This Does Not Cover

- Formal CE marking or conformity assessment (not required for open source stewards under CRA)
- Runtime security monitoring (not applicable to a component library)
- Penetration testing (out of scope for this iteration)
- NIS2 compliance (different regulation, different obligations)

---

## Files Changed

| File | Change |
|---|---|
| `.github/dependabot.yml` | New — Dependabot config for all workspace dirs |
| `.github/workflows/continuous.yml` | Add `npm audit --audit-level=high` step to `build` job |
| `.github/workflows/security.yml` | New — CodeQL workflow |
| `.github/workflows/publish.yml` | Add SBOM generation step before publish |
| `SECURITY.md` | New — vulnerability disclosure policy |
| `package.json` | Add `@cyclonedx/cyclonedx-npm` as dev dependency |
