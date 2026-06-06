"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  clearWorkspaceSlice,
  createWorkspaceId,
  updateWorkspaceSlice,
  useWorkspaceSelector,
} from "@/lib/workspace-store";

type StoredReport = {
  id?: string;
  title: string;
  photoCount: string;
  note: string;
  updatedAt: string;
};

const defaultDraft: StoredReport = {
  id: undefined,
  title: "",
  photoCount: "",
  note: "",
  updatedAt: "",
};

const content = {
  ru: {
    title: "Локальное хранение отчетов",
    note:
      "Храни черновики отчетов в браузере, чтобы проверять заголовок, фото и обновление страницы без backend.",
    titleLabel: "Заголовок отчета",
    titlePlaceholder: "Например: Ход крыши",
    photoLabel: "Количество фото",
    photoPlaceholder: "Например: 8",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши краткое содержание отчета.",
    save: "Сохранить отчет",
    reset: "Очистить отчеты",
    savedCount: "Сохраненных строк",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noNotes: "Пока без заметок.",
    report: "Отчет",
    photoSuffix: "фото",
  },
  nl: {
    title: "Lokale rapportopslag",
    note:
      "Bewaar rapportconcepten in de browser om titel, foto's en paginarefresh zonder backend te testen.",
    titleLabel: "Rapporttitel",
    titlePlaceholder: "Bijvoorbeeld: Dakvoortgang",
    photoLabel: "Aantal foto's",
    photoPlaceholder: "Bijvoorbeeld: 8",
    notesLabel: "Notities",
    notesPlaceholder: "Schrijf een korte samenvatting van het rapport.",
    save: "Rapport opslaan",
    reset: "Rapporten wissen",
    savedCount: "Opgeslagen regels",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noNotes: "Nog geen notities.",
    report: "Rapport",
    photoSuffix: "foto's",
  },
} as const;

export function ReportStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredReport>(defaultDraft);
  const items = useWorkspaceSelector((workspace) => workspace.reports);

  const handleSave = () => {
    const nextItem = {
      ...draft,
      id: draft.id || createWorkspaceId("report"),
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };
    updateWorkspaceSlice("reports", (current) => {
      const withoutCurrent = current.filter((item) => item.id !== nextItem.id);
      return [nextItem, ...withoutCurrent];
    });
    setDraft(defaultDraft);
  };

  const handleEdit = (item: StoredReport) => {
    setDraft(item);
  };

  const handleDelete = (id: string) => {
    updateWorkspaceSlice("reports", (current) => current.filter((item) => item.id !== id));
    if (draft.id === id) {
      setDraft(defaultDraft);
    }
  };

  const handleReset = () => {
    clearWorkspaceSlice("reports");
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
          <span>{copy.photoLabel}</span>
          <input
            value={draft.photoCount}
            onChange={(event) =>
              setDraft((current) => ({ ...current, photoCount: event.target.value }))
            }
            placeholder={copy.photoPlaceholder}
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
          {copy.save}
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
        {items.map((item) => (
          <article className="project-card" key={item.id}>
            <div className="project-topline">
              <span className="status status-current">{copy.report}</span>
              <span className="direction">{item.photoCount || "0"} {copy.photoSuffix}</span>
            </div>
            <h3>{item.title || copy.noTitle}</h3>
            <p className="project-note">{item.note || copy.noNotes}</p>
            <div className="panel-actions">
              <button className="ghost-button" type="button" onClick={() => handleEdit(item)}>
                {locale === "ru" ? "Редактировать" : "Bewerken"}
              </button>
              <button className="ghost-button" type="button" onClick={() => handleDelete(item.id)}>
                {locale === "ru" ? "Удалить" : "Verwijderen"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

