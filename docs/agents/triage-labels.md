# Triage Labels

This file documents the canonical label vocabulary used by the `triage` agent to move issues through their lifecycle.

## Canonical Labels

The `triage` agent moves issues through five states using these labels:

| Label                 | Purpose                                           | When Applied                                                                 |
| --------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| **`needs-triage`**    | Issue needs evaluation by a maintainer            | When a new issue is opened; agent removes it after triage                    |
| **`needs-info`**      | Waiting on reporter for additional details        | Agent applies when more context is needed; removed when info is provided     |
| **`ready-for-agent`** | Fully specified; ready for an AI agent to pick up | Agent applies when issue is complete; AFK-ready with no human context needed |
| **`ready-for-human`** | Needs human implementation or decision            | Agent applies when issue requires human judgment, code review, or execution  |
| **`wontfix`**         | Will not be actioned                              | Applied by maintainer; agent will not process further                        |

## Mapping

The design system uses the **default canonical names**. No custom aliases are configured.

```yaml
needs-triage: needs-triage
needs-info: needs-info
ready-for-agent: ready-for-agent
ready-for-human: ready-for-human
wontfix: wontfix
```

If you want to change these label names in the future, update this file and the agent configuration will use the new names.

## Agent Behavior

The `triage` agent will:

1. Read issues with the `needs-triage` label
2. Evaluate the issue (is it clear? is it scoped? does it have acceptance criteria?)
3. Either:
   - Apply `needs-info` and post a comment requesting clarification
   - Apply `ready-for-agent` if the issue is fully specified and AFK-ready
   - Apply `ready-for-human` if human input is required
   - Apply `wontfix` and explain why

Once triaged, the agent removes the `needs-triage` label.

## Removing Labels

Labels are typically removed when:

- An issue moves to the next state (e.g., `needs-info` → `ready-for-agent`)
- An issue is closed
- A maintainer manually resets the triage process
