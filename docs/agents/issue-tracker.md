# Issue Tracker — GitHub Issues

## Overview

Issues for the Helvetia Design System are tracked in **GitHub Issues** in the [baloise/design-system](https://github.com/baloise/design-system) repository.

## Creating Issues

Use the GitHub web interface to create issues. When opening a new issue:

1. **Title**: Clear, concise description of the problem or feature
2. **Description**: Provide context:
   - For bugs: steps to reproduce, expected vs. actual behavior
   - For features: use case, acceptance criteria
3. **Labels**: Apply relevant labels (see `docs/agents/triage-labels.md`)
4. **Assignees**: Assign to team members if known
5. **Project**: Add to the design system project board if applicable

## Labels & Triage

The `triage` agent uses labels to move issues through a state machine. See `docs/agents/triage-labels.md` for the canonical label vocabulary and how agents interact with them.

## Accessing Issues

**CLI:**
```bash
gh issue list                           # List all open issues
gh issue view <issue-number>            # View issue details
gh issue create                         # Create new issue
gh issue close <issue-number>           # Close an issue
```

**Web:**
- https://github.com/baloise/design-system/issues

## Pull Requests

PRs are opened against the `next` branch and require:
- All CI checks passing (lint, test, build)
- At least one approval
- A changeset entry (unless docs-only or infrastructure)

See [ARCHITECTURE.md](../../ARCHITECTURE.md#release-and-versioning) for release workflow details.
