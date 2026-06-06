"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  buildCalendarItemsFromProjects,
  syncCalendarFromProjects,
  updateWorkspace,
  useWorkspaceSelector,
  type WorkspaceProject,
} from "@/lib/workspace-store";

type StoredCalendarDraft = {
  projectId: string;
  startDate: string;
  note: string;
};

const content = {
  ru: {
    title: "Синхронизация календаря",
    note:
      "Календарь показывает только проекты со стартом. Здесь можно менять дату старта у проекта, а сама карточка будет обновляться в обе стороны.",
    projectLabel: "Проект",
    projectPlaceholder: "Выбери проект",
    startLabel: "Дата старта",
    startPlaceholder: "Например: 27.05.2026",
    notesLabel: "Заметки",
    notesPlaceholder: "Короткая заметка для календаря",
    save: "Сохранить дату",
    reset: "Сбросить календарь",
    savedCount: "Показано проектов",
    storage: "Источник",
    storageReady: "Дата берется из проекта",
    lastSave: "Последнее обновление",
    notSaved: "Еще не сохранено",
    noProject: "Проект не выбран",
    noDirection: "без направления",
    noStart: "Не задана",
    noNote: "Без заметки",
    emptyState: "Пока нет проектов со стартом. Добавь дату старта в проекте, и он появится здесь.",
    selectHint: "Можно менять дату здесь, но она всегда сохраняется в самом проекте.",
  },
  nl: {
    title: "Agenda-synchronisatie",
    note:
      "De agenda toont alleen projecten met een startdatum. Hier kun je de startdatum van een project aanpassen en blijft alles in beide richtingen gelijk.",
    projectLabel: "Project",
    projectPlaceholder: "Kies een project",
    startLabel: "Startdatum",
    startPlaceholder: "Bijvoorbeeld: 27-05-2026",
    notesLabel: "Notities",
    notesPlaceholder: "Korte notitie voor de agenda",
    save: "Datum opslaan",
    reset: "Agenda wissen",
    savedCount: "Getoonde projecten",
    storage: "Bron",
    storageReady: "Datum komt uit het project",
    lastSave: "Laatste update",
    notSaved: "Nog niet opgeslagen",
    noProject: "Project niet gekozen",
    noDirection: "zonder richting",
    noStart: "Niet ingevuld",
    noNote: "Geen notitie",
    emptyState: "Er zijn nog geen projecten met een startdatum. Voeg eerst een startdatum toe aan een project.",
    selectHint: "Je kunt de datum hier aanpassen, maar de echte waarde blijft in het project staan.",
  },
} as const;

function createDraft(projects: WorkspaceProject[], fallback?: StoredCalendarDraft): StoredCalendarDraft {
  if (fallback) {
    return fallback;
  }

  const firstVisibleProject = projects.find((project) => project.startDate.trim().length > 0);
  return {
    projectId: firstVisibleProject?.id || projects[0]?.id || "",
    startDate: firstVisibleProject?.startDate || "",
    note: firstVisibleProject?.note || "",
  };
}

export function CalendarStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const projects = useWorkspaceSelector((workspace) => workspace.projects);
  const items = useWorkspaceSelector((workspace) =>
    buildCalendarItemsFromProjects(workspace.projects, workspace.calendar),
  );
  const [draft, setDraft] = useState<StoredCalendarDraft>(() => createDraft(projects));

  const handleSave = () => {
    if (!draft.projectId) {
      return;
    }

    const updatedAt = new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL");

    updateWorkspace((current) => {
      const nextProjects = current.projects.map((project) =>
        project.id === draft.projectId
          ? {
              ...project,
              startDate: draft.startDate,
              note: draft.note,
              updatedAt,
            }
          : project,
      );

      return syncCalendarFromProjects({
        ...current,
        projects: nextProjects,
      });
    });

    setDraft(createDraft(projects, { ...draft }));
  };

  const handleEdit = (project: WorkspaceProject) => {
    setDraft({
      projectId: project.id,
      startDate: project.startDate,
      note: project.note,
    });
  };

  const handleDelete = (id: string) => {
    const updatedAt = new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL");

    updateWorkspace((current) => {
      const nextProjects = current.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              startDate: "",
              updatedAt,
            }
          : project,
      );

      return syncCalendarFromProjects({
        ...current,
        projects: nextProjects,
      });
    });

    if (draft.projectId === id) {
      setDraft(createDraft(projects));
    }
  };

  const handleReset = () => {
    const updatedAt = new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL");

    updateWorkspace((current) => {
      const nextProjects = current.projects.map((project) => ({
        ...project,
        startDate: "",
        updatedAt,
      }));

      return {
        ...syncCalendarFromProjects({
          ...current,
          projects: nextProjects,
        }),
        calendar: [],
      };
    });

    setDraft(createDraft(projects));
  };

  return (
    <section className="panel">
      <h2>{copy.title}</h2>
      <p className="entity-note">{copy.note}</p>
      <p className="entity-note">{copy.selectHint}</p>

      <div className="form-grid">
        <label className="field">
          <span>{copy.projectLabel}</span>
          <select
            value={draft.projectId}
            onChange={(event) => {
              const project = projects.find((item) => item.id === event.target.value);
              setDraft({
                projectId: event.target.value,
                startDate: project?.startDate || "",
                note: project?.note || "",
              });
            }}
          >
            <option value="">{copy.projectPlaceholder}</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{copy.startLabel}</span>
          <input
            value={draft.startDate}
            onChange={(event) =>
              setDraft((current) => ({ ...current, startDate: event.target.value }))
            }
            placeholder={copy.startPlaceholder}
          />
        </label>
      </div>

      <label className="field">
        <span>{copy.notesLabel}</span>
        <textarea
          value={draft.note}
          onChange={(event) =>
            setDraft((current) => ({ ...current, note: event.target.value }))
          }
          placeholder={copy.notesPlaceholder}
          rows={4}
        />
      </label>

      <div className="panel-actions">
        <button className="solid-button" type="button" onClick={handleSave}>
          {draft.projectId ? (locale === "ru" ? "Обновить дату" : "Datum bijwerken") : copy.save}
        </button>
        <button className="ghost-button" type="button" onClick={handleReset}>
          {copy.reset}
        </button>
      </div>

      <div className="draft-status">
        <div>
          <span className="label">{copy.savedCount}</span>
          <div className="metric">{items.length}</div>
        </div>
        <div>
          <span className="label">{copy.storage}</span>
          <div className="metric">{copy.storageReady}</div>
        </div>
        <div>
          <span className="label">{copy.lastSave}</span>
          <div className="metric">{items[0]?.updatedAt || copy.notSaved}</div>
        </div>
      </div>

      <section className="project-grid project-storage-grid">
        {items.length === 0 ? (
          <article className="project-card">
            <h3>{copy.emptyState}</h3>
          </article>
        ) : (
          items.map((item) => (
            <article className="project-card" key={item.id}>
              <div className="project-topline">
                <span className="status status-current">{item.status}</span>
                <span className="direction">{item.direction || copy.noDirection}</span>
              </div>
              <h3>{item.name}</h3>
              <p className="project-note">{item.note || copy.noNote}</p>
              <dl className="project-meta">
                <div>
                  <dt>{copy.startLabel}</dt>
                  <dd>{item.startDate || copy.noStart}</dd>
                </div>
              </dl>
              <div className="panel-actions">
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => {
                    const project = projects.find((entry) => entry.id === item.id);
                    if (project) {
                      handleEdit(project);
                    }
                  }}
                >
                  {locale === "ru" ? "Редактировать" : "Bewerken"}
                </button>
                <button className="ghost-button" type="button" onClick={() => handleDelete(item.id)}>
                  {locale === "ru" ? "Убрать дату" : "Datum verwijderen"}
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </section>
  );
}
