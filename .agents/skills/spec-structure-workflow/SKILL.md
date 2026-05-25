---
name: spec-structure-workflow
description: Keep the project spec tree clean and ordered. Use when organizing or editing spec folders, moving files between Global Spec, Functional Map, Future Spec, Technical Specs, User Stories, and Work Plans, or when checking that spec stages stay separated and in the right order.
---

# Spec Structure Workflow

## Overview

Keep the spec tree in one clean sequence:
`Global Spec -> Functional Map -> Future Spec -> Technical Specs -> User Stories -> Work Plans`.

Use this skill when a change affects spec layout, stage order, or file placement.

## Rules

- Keep each stage in its own folder and do not merge stages.
- Keep business rules in `Global Spec` and `Functional Map`.
- Keep future questions in `Future Spec` only.
- Keep implementation details in `Technical Specs` only.
- Keep user scenarios in `User Stories` only.
- Keep execution planning in `Work Plans` only.
- If one rule affects multiple stages, update every related spec together.
- If a file looks like it belongs to the wrong stage, move or rewrite it before continuing.
- Do not add extra folders or duplicate the same meaning in multiple stages without a clear reason.

## Workflow

1. Identify the stage first.
2. Check whether the content is business logic, future clarification, technical design, user scenario, or work planning.
3. Place the content in the matching stage only.
4. Verify that the surrounding spec files still agree with the change.
5. Fix naming, order, or folder placement if it breaks the spec tree.

## Final Check

Before finishing, confirm:

- the order of stages is still correct;
- no stage contains content from another stage;
- related files still describe the same rule;
- the spec tree stays simple, readable, and easy to extend.
