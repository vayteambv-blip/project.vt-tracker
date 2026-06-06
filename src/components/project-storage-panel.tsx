"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  createWorkspaceId,
  syncCalendarFromProjects,
  updateWorkspace,
  useWorkspaceSelector,
} from "@/lib/workspace-store";

type StoredProject = {
  id?: string;
  title: string;
  client: string;
  direction: string;
  startDate: string;
  status: "Draft" | "Ready" | "Active" | "Archive";
  subcontractors: string;
  note: string;
  updatedAt: string;
};

const defaultDraft: StoredProject = {
  id: undefined,
  title: "",
  client: "",
  direction: "",
  startDate: "",
  status: "Draft",
  subcontractors: "",
  note: "",
  updatedAt: "",
};

const statusLabel: Record<StoredProject["status"], Record<"ru" | "nl", string>> = {
  Draft: { ru: "Черновик", nl: "Concept" },
  Ready: { ru: "Готовые к запуску", nl: "Klaar om te starten" },
  Active: { ru: "Активный", nl: "Actief" },
  Archive: { ru: "Архив", nl: "Archief" },
};

const content = {
  ru: {
    title: "Локальное хранение проектов",
    note:
      "Это простая фронтенд-область хранения для проектов. Она держит черновики в браузере, чтобы ты мог проверять полный поток без backend.",
    titleLabel: "Название проекта",
    titlePlaceholder: "Например: Ремонт северной крыши",
    clientLabel: "Клиент",
    clientPlaceholder: "Например: Семья Брауэрс",
    directionLabel: "Направление",
    directionPlaceholder: "Например: Крыша",
    startLabel: "Дата старта",
    startPlaceholder: "Например: 27.05.2026",
    statusLabel: "Статус",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши текущее состояние проекта.",
    save: "Сохранить проект",
    reset: "Очистить проекты",
    savedCount: "Сохраненных проектов",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    project: "проект",
    noTitle: "Без названия",
    noNotes: "Пока без заметок.",
    noClient: "Не задан",
    noDate: "Не задана",
  },
  nl: {
    title: "Lokale projectopslag",
    note:
      "Dit is een eenvoudige frontend-opslagruimte voor projecten. Het bewaart concepten in de browser zodat je de volledige flow zonder backend kunt testen.",
    titleLabel: "Projecttitel",
    titlePlaceholder: "Bijvoorbeeld: Renovatie van het noordelijke dak",
    clientLabel: "Klant",
    clientPlaceholder: "Bijvoorbeeld: Familie Brouwers",
    directionLabel: "Richting",
    directionPlaceholder: "Bijvoorbeeld: Dak",
    startLabel: "Startdatum",
    startPlaceholder: "Bijvoorbeeld: 27-05-2026",
    statusLabel: "Status",
    notesLabel: "Notities",
    notesPlaceholder: "Noteer de huidige projectstatus.",
    save: "Project opslaan",
    reset: "Projecten wissen",
    savedCount: "Opgeslagen projecten",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    project: "project",
    noTitle: "Zonder titel",
    noNotes: "Nog geen notities.",
    noClient: "Niet ingevuld",
    noDate: "Niet ingevuld",
  },
} as const;

export function ProjectStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredProject>(defaultDraft);
  const projects = useWorkspaceSelector((workspace) => workspace.projects);

  const handleSave = () => {
    const nextProject = {
      ...draft,
      id: draft.id || createWorkspaceId("project"),
      name: draft.title,
      client: draft.client,
      direction: draft.direction,
      startDate: draft.startDate,
      status: draft.status,
      subcontractors: draft.subcontractors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      note: draft.note,
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    updateWorkspace((current) => {
      const withoutCurrent = current.projects.filter((project) => project.id !== nextProject.id);
      const nextProjects = [nextProject, ...withoutCurrent];
      return syncCalendarFromProjects({
        ...current,
        projects: nextProjects,
      });
    });
    setDraft(defaultDraft);
  };

  const handleEdit = (project: (typeof projects)[number]) => {
    setDraft({
      id: project.id,
      title: project.name,
      client: project.client,
      direction: project.direction,
      startDate: project.startDate,
      status: project.status,
      subcontractors: project.subcontractors.join(", "),
      note: project.note,
      updatedAt: project.updatedAt,
    });
  };

  const handleDelete = (id: string) => {
    updateWorkspace((current) => {
      const nextProjects = current.projects.filter((project) => project.id !== id);
      return syncCalendarFromProjects({
        ...current,
        projects: nextProjects,
      });
    });
    if (draft.id === id) {
      setDraft(defaultDraft);
    }
  };

  const handleReset = () => {
    updateWorkspace((current) =>
      syncCalendarFromProjects({
        ...current,
        projects: [],
      }),
    );
    setDraft(defaultDraft);
  };

  return (
    <section className="panel">
      <h2>{copy.title}</h2>
      <p className="entity-note">{copy.note}</p>

      <div className="form-grid">
        <label className="field">
          <span>{copy.titleLabel}</span>
          <input
            value={draft.title}
            onChange={(event) =>
              setDraft((current) => ({ ...current, title: event.target.value }))
            }
            placeholder={copy.titlePlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.clientLabel}</span>
          <input
            value={draft.client}
            onChange={(event) =>
              setDraft((current) => ({ ...current, client: event.target.value }))
            }
            placeholder={copy.clientPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.directionLabel}</span>
          <input
            value={draft.direction}
            onChange={(event) =>
              setDraft((current) => ({ ...current, direction: event.target.value }))
            }
            placeholder={copy.directionPlaceholder}
          />
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

        <label className="field">
          <span>{copy.statusLabel}</span>
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                status: event.target.value as StoredProject["status"],
              }))
            }
          >
            <option value="Draft">{statusLabel.Draft[locale]}</option>
            <option value="Ready">{statusLabel.Ready[locale]}</option>
            <option value="Active">{statusLabel.Active[locale]}</option>
            <option value="Archive">{statusLabel.Archive[locale]}</option>
          </select>
        </label>

        <label className="field">
          <span>{locale === "ru" ? "Субподрядчики" : "Onderaannemers"}</span>
          <input
            value={draft.subcontractors}
            onChange={(event) =>
              setDraft((current) => ({ ...current, subcontractors: event.target.value }))
            }
            placeholder={locale === "ru" ? "Например: Кровля Плюс, Электро" : "Bijvoorbeeld: DakPlus, Elektro"}
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
          {draft.id ? (locale === "ru" ? "Обновить проект" : "Project bijwerken") : copy.save}
        </button>
        <button className="ghost-button" type="button" onClick={handleReset}>
          {copy.reset}
        </button>
      </div>

      <div className="draft-status">
        <div>
          <span className="label">{copy.savedCount}</span>
          <div className="metric">{projects.length}</div>
        </div>
        <div>
          <span className="label">{copy.storage}</span>
          <div className="metric">{copy.storageReady}</div>
        </div>
        <div>
          <span className="label">{copy.lastSave}</span>
          <div className="metric">{projects[0]?.updatedAt || copy.notSaved}</div>
        </div>
      </div>

      <section className="project-grid project-storage-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-topline">
              <span className="status status-current">{statusLabel[project.status][locale]}</span>
              <span className="direction">{project.direction || copy.project}</span>
            </div>
            <h3>{project.name || copy.noTitle}</h3>
            <p className="project-note">{project.note || copy.noNotes}</p>
            <dl className="project-meta">
              <div>
                <dt>{copy.clientLabel}</dt>
                <dd>{project.client || copy.noClient}</dd>
              </div>
              <div>
                <dt>{copy.startLabel}</dt>
                <dd>{project.startDate || copy.noDate}</dd>
              </div>
              <div>
                <dt>{locale === "ru" ? "Субподрядчики" : "Onderaannemers"}</dt>
                <dd>{project.subcontractors.join(", ") || "—"}</dd>
              </div>
            </dl>
            <div className="panel-actions">
              <button className="ghost-button" type="button" onClick={() => handleEdit(project)}>
                {locale === "ru" ? "Редактировать" : "Bewerken"}
              </button>
              <button className="ghost-button" type="button" onClick={() => handleDelete(project.id)}>
                {locale === "ru" ? "Удалить" : "Verwijderen"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
