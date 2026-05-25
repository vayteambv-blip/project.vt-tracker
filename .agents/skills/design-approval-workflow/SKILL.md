---
name: design-approval-workflow
description: Track design approval state and block any transfer into the main project until the user clearly approves it. Use when design ideas, UI variants, or map entries must remain draft-only until confirmed.
---

# Design Approval Workflow

## Overview

Use this skill to keep approval state strict and explicit.

## Rules

- Treat every design idea as draft until the user approves it.
- Do not move a design into the main project without clear approval.
- Keep approved items separate from pending and rejected items.
- Record the approval state clearly so it is easy to review later.
- If approval is missing, stop and wait.

## Workflow

1. Check whether the design idea is draft, pending, approved, or rejected.
2. If it is not approved, keep it out of the main project.
3. If it is approved, allow transfer to the main project.
4. If approval changes, update the state immediately.
