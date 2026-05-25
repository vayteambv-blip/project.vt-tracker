---
name: technical-spec-workflow
description: Convert approved business specs into technical specs without changing the business logic.
---

# Technical Spec Workflow

Use this skill when moving from approved specs to technical design.

## Workflow

1. Take only approved business rules.
2. Convert them into technical structure:
   - entities;
   - relationships;
   - storage;
   - sync rules;
   - file/version handling;
   - statuses and transitions.
3. Keep the business meaning unchanged.
4. Separate technical decisions from product rules.

## Rules

- Do not add new product features.
- Do not rewrite approved business logic.
- If a technical choice affects business behavior, ask first.
- Keep the technical spec clear, minimal, and implementation-ready.
