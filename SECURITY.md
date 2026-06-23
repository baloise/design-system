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
- [EU Cyber Resilience Act (CRA) Compliance](#eu-cyber-resilience-act-cra-compliance)
  - [Security Measures](#security-measures-1)
  - [Version Support Policy](#version-support-policy)
  - [Secure Release Process](#secure-release-process)
  - [Contact for Security Issues](#contact-for-security-issues)
- [Further Reading](#further-reading)

## Supported Versions

Only the latest major version receives security patches.
Older major versions are unsupported.

| Version      | Supported |
| ------------ | --------- |
| Latest major | ✅        |
| Older majors | ❌        |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Use the [**Report a vulnerability**](../../security/advisories/new) button in the Security tab of this repository. This keeps the report private until a fix is ready.

We will acknowledge your report within **72 hours** and aim to release a fix or mitigation within **90 days**. We will notify you before public disclosure.

## Disclosure Policy

| Milestone         | Commitment            |
| ----------------- | --------------------- |
| Acknowledgement   | Within 72 hours       |
| Fix or mitigation | Within 90 days        |
| Public disclosure | After fix is released |

This project follows the [Coordinated Vulnerability Disclosure](https://www.cisa.gov/coordinated-vulnerability-disclosure-process) model.

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

| Requirement              | Implementation                                                     |
| ------------------------ | ------------------------------------------------------------------ |
| Vulnerability management | Private disclosure via GitHub Security Advisories (72h response)   |
| Dependency scanning      | Dependabot with weekly scans and automated patch PRs               |
| Code analysis            | CodeQL SAST on every push/PR and weekly schedule                   |
| Secure development       | Branch protection, code review, CI/CD gates (lint, test, build)    |
| Incident response        | 72h acknowledgement, 90d fix timeline for reported vulnerabilities |
| SBOM / Transparency      | `package.json` + `package-lock.json` document all dependencies     |

### Version Support Policy

| Aspect               | Policy                                         |
| -------------------- | ---------------------------------------------- |
| **Supported range**  | Only the latest major version receives patches |
| **Patch frequency**  | Security patches released within 90 days       |
| **EOL status**       | Older major versions no longer receive updates |
| **Breaking changes** | Communicated via changelog and release notes   |

### Secure Release Process

1. **Pre-release scanning:** CodeQL and Dependabot checks on all incoming PRs
2. **Changeset review:** Core team reviews all proposed version changes
3. **Build verification:** Automated build, lint, and test suite runs before release
4. **Release publication:** GitHub Actions publishes with provenance attestation
5. **Disclosure:** Release notes and CHANGELOG.md updated with all changes

### Contact for Security Issues

For security concerns not covered by this policy, email the maintainers.
