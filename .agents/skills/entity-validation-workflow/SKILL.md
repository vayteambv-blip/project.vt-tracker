---
name: entity-validation-workflow
description: Validate project entities before saving. Use when creating or editing clients, firms, projects, documents, factures, reports, or related records and when checking required fields, completeness, and entity separation.
---

# Entity Validation Workflow

## Overview

Use this skill to check that an entity is complete, consistent, and belongs to the right place before saving it.

## Rules

- Check required fields first.
- Do not save partial or mixed entities.
- Keep client, firm, project, document, facture, and report data separated.
- Show exactly what is missing before saving.
- If a field belongs to another entity, move the data there instead of duplicating it.

## Workflow

1. Identify the entity type.
2. Check mandatory fields for that entity.
3. Check whether the data belongs to one entity only.
4. Report missing or conflicting fields.
5. Save only after the entity is complete and clean.

## Final Check

Before finishing, confirm:

- all required fields are filled;
- the entity is stored in the correct place;
- no duplicate meaning was added elsewhere;
- the save action will not create later conflicts.
