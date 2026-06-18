# 🔒 Security Policy

## Table of Contents

- [Supported Versions](#supported-versions)
- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [Disclosure Policy](#disclosure-policy)
- [Security Measures](#security-measures)
  - [Automated Code Analysis (SAST)](#automated-code-analysis-sast)
  - [Dependency Vulnerability Scanning (SCA)](#dependency-vulnerability-scanning-sca)
  - [Software Bill of Materials (SBOM)](#software-bill-of-materials-sbom)
  - [Secure Supply Chain Practices](#secure-supply-chain-practices)
- [Consumer Notifications](#consumer-notifications)
- [EU Cyber Resilience Act (CRA) Compliance](#eu-cyber-resilience-act-cra-compliance)
  - [Security Measures](#security-measures-1)
  - [Authority Reporting (Article 14)](#authority-reporting-article-14)
  - [Version Support Policy](#version-support-policy)
  - [Security by Default](#security-by-default)
  - [Secure Release Process](#secure-release-process)
  - [Contact for Security Issues](#contact-for-security-issues)
- [Further Reading](#further-reading)

## Supported Versions

Two major versions receive security patches at any given time:

| Branch  | Version       | Support type              | Supported |
| ------- | ------------- | ------------------------- | --------- |
| `next`  | Latest major  | Active development + security patches | ✅ |
| `main`  | Previous major (LTS) | Security patches only | ✅ |
| —       | Older majors  | No patches                | ❌        |

The previous major enters **Long-Term Support (LTS)** the moment the next major is released and receives security patches for a minimum of **24 months** from that date. After 24 months, EOL is announced at least **6 months in advance** via a GitHub release note and a pinned repository issue before support is dropped.

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Use the [**Report a vulnerability**](../../security/advisories/new) button in the Security tab of this repository. This keeps the report private until a fix is ready.

We will acknowledge your report within **72 hours** and aim to release a fix or mitigation within **90 days**. We will notify you before public disclosure.

## Disclosure Policy

### To the reporter (Coordinated Vulnerability Disclosure)

| Milestone         | Commitment            |
| ----------------- | --------------------- |
| Acknowledgement   | Within 72 hours       |
| Fix or mitigation | Within 90 days        |
| Public disclosure | After fix is released |

This project follows the [Coordinated Vulnerability Disclosure](https://www.cisa.gov/coordinated-vulnerability-disclosure-process) model.

### To authorities (CRA Article 14)

When a vulnerability is confirmed as **actively exploited** in the wild, we are additionally required to notify the relevant authority:

| Milestone            | Deadline                          |
| -------------------- | --------------------------------- |
| Early warning        | Within 24 hours of becoming aware |
| Detailed notification | Within 72 hours                  |
| Final report         | Within 14 days                    |

See [Authority Reporting (Article 14)](#authority-reporting-article-14) for the full process.

## Consumer Notifications

When a security advisory is published, consumers are notified through the following channels:

### How to subscribe

**GitHub watch notifications (recommended):**

1. Click **Watch** at the top of this repository
2. Select **Custom**
3. Enable **Security alerts**

GitHub will email you whenever a new [Security Advisory](../../security/advisories) is published for this repository.

**npm release feed:**

Every security fix is released as a new npm version. Subscribe to release notifications on GitHub (Watch → Releases) or monitor the package on [npmjs.com](https://www.npmjs.com/package/@baloise/ds-core).

### What each advisory contains

Every published GitHub Security Advisory for this project will include:

| Field | Content |
| ----- | ------- |
| CVE ID | Assigned identifier (or "pending" if not yet issued) |
| Affected versions | Exact semver range of vulnerable releases |
| Patched version | First version containing the fix |
| npm packages | All `@baloise/ds-*` packages affected |
| Severity | CVSS score and vector |
| Description | What the vulnerability is and what an attacker can do |
| Workaround | Mitigation steps if available before a patch is released |

This information is sufficient to assess impact and plan an upgrade without reading source code.

### For large consumers

If your organisation integrates the Baloise Design System into a regulated product, consider enabling [Dependabot alerts](https://docs.github.com/en/code-security/dependabot) in your own repository. GitHub will automatically raise an alert in your project when a CVE is published for any version of `@baloise/ds-core` you depend on.

## Security Measures

We maintain security through automated scanning, dependency management, and secure development practices.

### Automated Code Analysis (SAST)

**Tool:** CodeQL  
**Location:** `.github/workflows/security.yml`  
**Frequency:** On every push to `next`, all PRs, and weekly schedule  
**What it does:** Performs static analysis to detect security vulnerabilities (TOCTOU race conditions, unvalidated network data, injection risks, etc.)  
**Where to see results:** [GitHub Security → Code scanning](../../security/code-scanning)

### Dependency Vulnerability Scanning (SCA)

**Tool:** Dependabot  
**Location:** `.github/dependabot.yml`  
**Frequency:** Weekly (Mondays 06:00 UTC+2)  
**What it does:**

- Scans `package.json` for vulnerable dependency versions
- Creates automated PRs with security updates
- Pins critical versions (e.g., `@playwright/test@1.59.1`, `typescript@5.6.3`) to prevent breaking updates
- Configured ignore rules prevent incompatible versions from being installed

**Dependency Pinning:**

- `@types/node`: kept at 24.x (≥25.0.0 incompatible with Angular output-target)
- `typescript`: pinned to 5.6.3 (5.7.0+ breaks compilation)
- `@playwright/test`: pinned to 1.59.1 (visual regression testing requires exact version)
- `lottie-web`: pinned to 5.8.1 (all upgrades cause animation breakage)

**Where to see results:** [GitHub Security → Dependabot alerts](../../security/dependabot)

### Software Bill of Materials (SBOM)

**Format:** npm package.json + package-lock.json  
**Location:** Root repository and each workspace package  
**Contents:**

- All runtime dependencies with versions (shipped to consumers)
- Build and development dependencies (build-time only)
- Locked versions in `package-lock.json` ensure reproducible builds

**How to generate a manifest:**

```bash
npm ls                    # View dependency tree
npm audit                 # Check for known vulnerabilities
npm ls --all              # Include transitive dependencies
```

### Secure Supply Chain Practices

**Reproducible Builds:**

- `package-lock.json` locked and committed to ensure identical installs across environments
- `npm ci` (clean install) used in CI instead of `npm install`
- Monorepo managed by Turborepo with deterministic task execution

**Release Provenance:**

- `release.yml` publishes packages with GitHub provenance attestation
- npm packages include proof that they were built and signed by GitHub Actions
- Consumers can verify packages were built from this repository

**Version Control:**

- All commits are tagged for releases (e.g., `v1.2.3`)
- GitHub release notes document changes for each version
- Git history is immutable and auditable

**Access Control:**

- Only GitHub Actions workflows can publish to npm
- No manual npm access tokens needed
- OIDC token exchange provides short-lived, scoped authentication

## EU Cyber Resilience Act (CRA) Compliance

This project follows practices required by the EU Cyber Resilience Act for medium/high-risk software:

### Security Measures

| Requirement              | Implementation                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Vulnerability management | Private disclosure via GitHub Security Advisories (72h response)                   |
| Dependency scanning      | Dependabot with weekly scans and automated patch PRs                               |
| Code analysis            | CodeQL SAST on every push/PR and weekly schedule                                   |
| Secure development       | Branch protection, code review, CI/CD gates (lint, test, build)                    |
| Incident response        | 72h acknowledgement, 90d fix timeline; 24h/72h/14d authority reporting for exploited vulnerabilities |
| Authority reporting      | ENISA EUVDB (EU consumers) + Swiss NCSC; runbook in `docs/security/incident-response-runbook.md` |
| Consumer notification    | GitHub Security Advisories with CVE, affected versions, patched version, and workaround |
| SBOM / Transparency      | CycloneDX JSON SBOM bundled in every published npm package                         |

### Authority Reporting (Article 14)

CRA Article 14 requires notifying the relevant authority when a vulnerability in this product is **confirmed as actively exploited** in the wild. This obligation has been in force since September 2026.

**Who reports:** The on-call maintainer or security lead (not the individual who discovered the issue — escalate immediately if you are not the lead).

**Which authority to notify:**

| Audience | Authority | Platform |
| -------- | --------- | -------- |
| EU consumers | ENISA | [ENISA EUVDB](https://euvdb.europa.eu) |
| Swiss consumers | Swiss NCSC | [ncsc.admin.ch/report](https://www.ncsc.admin.ch/ncsc/en/home/meldungen/meldung-ncsc.html) |

When in doubt, report to both. Duplicate reports are explicitly allowed under the regulation.

**Reporting timeline:**

1. **T+0 — Discovery:** Vulnerability is confirmed exploited (via Dependabot alert, CodeQL finding, external report, or incident)
2. **T+24h — Early warning:** File a brief early warning on ENISA EUVDB and Swiss NCSC. Minimum required fields: product name, affected versions, short description, whether a fix is available.
3. **T+72h — Detailed notification:** Submit a full notification including CVE ID (request one via [cveform.mitre.org](https://cveform.mitre.org) if not yet assigned), CVSS score, affected components, root cause summary, and mitigation steps.
4. **T+14d — Final report:** Submit the final report once a fix is released or a mitigation is confirmed. Include patch version, timeline of events, and steps taken to prevent recurrence.

**What to include in each report:**

```
Product:          Baloise Design System (@baloise/ds-core)
Affected version: <semver range>
CVE ID:           CVE-YYYY-XXXXX (or "pending" if not yet assigned)
CVSS score:       <score and vector>
Description:      <one paragraph — what the vulnerability is>
Impact:           <what an attacker can do>
Mitigation:       <workaround or fix version>
Fix available:    Yes / No / In progress
```

**Full step-by-step runbook:** `docs/security/incident-response-runbook.md`

### Version Support Policy

| Aspect                  | Policy                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| **Supported versions**  | Latest major (`next` branch) + previous major in LTS (`main` branch)                      |
| **LTS duration**        | Minimum 24 months of security patches from the date the next major is released             |
| **Patch frequency**     | Security patches released within 90 days of a confirmed vulnerability                     |
| **EOL announcement**    | At least 6 months' notice via GitHub release note and pinned repository issue              |
| **EOL behaviour**       | EOL versions receive no patches, even for critical CVEs — consumers must upgrade           |
| **Breaking changes**    | Only in new major versions; communicated via CHANGELOG.md and release notes                |
| **LTS workflow**        | Automated via `.github/workflows/lts-continuous.yml`, `lts-prepare-release.yml`, `lts-release.yml` |

### Security by Default

The Baloise Design System is a client-side component library. Its attack surface and default security posture are as follows:

| Property | State |
| -------- | ----- |
| Server-side code | None — pure client-side Web Components |
| Authentication / authorisation logic | None — components carry no identity or session state |
| Data persistence | Minimal — one `localStorage` key stores an animation preference boolean (`DS_ANIMATION_KEY`); no PII, no tokens |
| Default network requests | None at startup — `ds-icon` fetches a SVG only when the consumer explicitly sets a `src` prop |
| User-supplied HTML rendered as markup | Sanitized via DOMPurify before any `innerHTML` assignment (`src/utils/svg.ts`) |
| `eval` / `new Function` | Not used anywhere in the component source |
| Inline event handler attributes | Not used — all listeners are attached via `addEventListener` |
| CSP compatibility | Compatible with strict `script-src` policies; no `unsafe-eval`, no `unsafe-inline` required |

**How these properties are enforced:**

- **Code rules** — documented in [STYLE_GUIDE.md — Security](STYLE_GUIDE.md#security); violations are flagged during code review
- **Static analysis** — CodeQL runs on every push and PR and weekly; catches `innerHTML` misuse, unvalidated network data, and injection patterns
- **Dependency auditing** — `npm audit --audit-level=high` blocks CI and both release workflows if a high or critical CVE is present in a dependency
- **DOMPurify** — pinned as a runtime dependency of `@baloise/ds-core`; all external HTML content passes through it before rendering

### Secure Release Process

1. **Pre-release scanning:** CodeQL and Dependabot checks on all incoming PRs
2. **Dependency audit:** `npm audit --audit-level=high` blocks the release workflow if high or critical CVEs are present
3. **Changeset review:** Core team reviews all proposed version changes
4. **Build verification:** Automated build, lint, and test suite runs before release
5. **Release publication:** GitHub Actions publishes with provenance attestation and SBOM
6. **Consumer notification:** GitHub Security Advisory published with CVE, affected versions, patched version, and workaround
7. **Disclosure:** Release notes and CHANGELOG.md updated with all changes

**Security self-assessment checklist** — confirm before each release containing security fixes:

- [ ] No `innerHTML` assignments without DOMPurify sanitization introduced in this release
- [ ] No `eval`, `new Function`, or string-argument `setTimeout`/`setInterval` introduced
- [ ] No new default network requests added to components
- [ ] No PII or tokens written to `localStorage`/`sessionStorage`
- [ ] `npm audit --audit-level=high` passes cleanly (enforced automatically by CI)
- [ ] DOMPurify version is up to date (check Dependabot alerts)
- [ ] If a new external dependency was added: its license and security posture have been reviewed

### Contact for Security Issues

For security concerns not covered by this policy, email the maintainers (see [CONTRIBUTING.md](CONTRIBUTING.md) for contact info).

## Further Reading

For more information on secure development in this project:

- **[docs/security/incident-response-runbook.md](docs/security/incident-response-runbook.md)** — Step-by-step runbook for responding to exploited vulnerabilities and filing authority reports
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Vulnerability reporting and responsible disclosure
- **[ARCHITECTURE.md — CI/CD Pipeline](ARCHITECTURE.md#cicd-pipeline)** — Security scanning workflows and automation
- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Development setup and local testing
- **[STYLE_GUIDE.md — Security](STYLE_GUIDE.md#what-to-avoid)** — Code patterns that avoid common vulnerabilities
