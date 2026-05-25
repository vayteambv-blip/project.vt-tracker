# Проект VT Tracker

Репозиторий для работы с Codex, проектной документацией и фронтендом на Next.js + TypeScript.

## Структура

- `.agents/skills` - навыки Codex по рабочим сценариям проекта.
- `Specs/01-global-spec-md/global-spec.md` - общий контекст.
- `Specs/02-functional-map-md/functional-map.md` - функциональная карта.
- `Specs/03-future-spec-md/future-spec.md` - будущие уточнения.
- `Specs/04-technical-specs/technical-spec.md` - техническая спецификация.
- `Specs/05-user-stories/user-stories.md` - пользовательские истории.
- `Specs/06-work-plans/work-plans.md` - рабочие планы.

## Фронтенд

- `src/app` - маршруты и страницы Next.js.
- `src/components` - переиспользуемые UI-блоки.
- `src/lib` - общие данные и конфигурация интерфейса.

## Запуск

1. `npm install`
2. `npm run dev`
3. Открыть `http://localhost:3000`

## Основные skills

- `entity-validation-workflow`
- `project-creation-workflow`
- `calendar-synchronization-workflow`
- `document-flow-workflow`
- `facture-and-finance-workflow`
- `firm-management-workflow`
- `archive-return-workflow`
- `spec-structure-workflow`
- `spec-audit`
- `technical-spec-workflow`
- `notification-workflow`
- `visual-guidelines-workflow`

## Дизайн skills

- `design-map-workflow`
- `design-review-workflow`
- `design-approval-workflow`

## Правило

- Один файл отвечает за одну часть смысла.
- Дублировать одно и то же правило в разных местах не нужно.
- Если правило меняется, проверять связанные спеки и связанный skill.
