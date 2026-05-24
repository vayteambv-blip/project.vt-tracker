---
name: spec-audit
description: Audit project specs for duplicates, gray zones, omissions, and contradictions before the next stage.
---

# Spec Audit

Use this skill when checking specs for:
- duplicates;
- gray zones;
- missing important points;
- contradictions across files.

## Workflow

1. Read the relevant spec files.
2. Compare overlapping rules across files.
3. Mark what is:
   - consistent;
   - duplicated;
   - unclear;
   - conflicting.
4. Report a short result:
   - what to keep;
   - what to remove;
   - what to clarify.

## Rules

- Do not invent new business rules.
- Do not change meaning without user approval.
- Prefer one source of truth for each rule.
- If a point is unclear, surface it before editing anything.
