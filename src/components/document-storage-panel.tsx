"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredDocument = {
  title: string;
  scope: "Project" | "Subcontractor" | "Linked";
  version: string;
  note: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:documents";

const defaultDraft: StoredDocument = {
  title: "",
  scope: "Project",
  version: "",
  note: "",
  updatedAt: "",
};

const scopeLabel: Record<StoredDocument["scope"], Record<"ru" | "nl", string>> = {
  Project: { ru: "Проект", nl: "Project" },
  Subcontractor: { ru: "Субподрядчик", nl: "Onderaannemer" },
  Linked: { ru: "Связанный", nl: "Gekoppeld" },
};

const content = {
  ru: {
    title: "Локальное хранение документов",
    note:
      "Храни черновики документов в браузере, чтобы проверять версии и разделение контекста без backend.",
    titleLabel: "Название документа",
    titlePlaceholder: "Например: Смета проекта",
    scopeLabel: "Контекст",
    versionLabel: "Версия",
    versionPlaceholder: "Например: v1.0",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши, для чего этот файл.",
    save: "Сохранить документ",
    reset: "Очистить документы",
    savedCount: "Сохраненных строк",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noNotes: "Пока без заметок.",
    noVersion: "Не задана",
    document: "документ",
    scope: "Тип",
  },
  nl: {
    title: "Lokale documentopslag",
    note:
      "Bewaar documentconcepten in de browser om versies en contextscheiding zonder backend te testen.",
    titleLabel: "Documentnaam",
    titlePlaceholder: "Bijvoorbeeld: Projectofferte",
    scopeLabel: "Context",
    versionLabel: "Versie",
    versionPlaceholder: "Bijvoorbeeld: v1.0",
    notesLabel: "Notities",
    notesPlaceholder: "Schrijf waarvoor dit bestand dient.",
    save: "Document opslaan",
    reset: "Documenten wissen",
    savedCount: "Opgeslagen regels",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noNotes: "Nog geen notities.",
    noVersion: "Niet ingevuld",
    document: "document",
    scope: "Type",
  },
} as const;

function readItems(): StoredDocument[] {
  return readStorage<StoredDocument[]>(STORAGE_KEY, []);
}

function saveItems(items: StoredDocument[]): void {
  writeStorage(STORAGE_KEY, items);
}

export function DocumentStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredDocument>(defaultDraft);
  const [items, setItems] = useState<StoredDocument[]>(() => readItems());

  const handleSave = () => {
    const nextItem = { ...draft, updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL") };
    const nextItems = [nextItem, ...items];
    setItems(nextItems);
    saveItems(nextItems);
    setDraft(defaultDraft);
  };

  const handleReset = () => {
    clearStorage(STORAGE_KEY);
    setItems([]);
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
          <span>{copy.scopeLabel}</span>
          <select
            value={draft.scope}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                scope: event.target.value as StoredDocument["scope"],
              }))
            }
          >
            <option value="Project">{scopeLabel.Project[locale]}</option>
            <option value="Subcontractor">{scopeLabel.Subcontractor[locale]}</option>
            <option value="Linked">{scopeLabel.Linked[locale]}</option>
          </select>
        </label>

        <label className="field">
          <span>{copy.versionLabel}</span>
          <input
            value={draft.version}
            onChange={(event) =>
              setDraft((current) => ({ ...current, version: event.target.value }))
            }
            placeholder={copy.versionPlaceholder}
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
          <article className="project-card" key={`${item.title}-${item.updatedAt}`}>
            <div className="project-topline">
              <span className="status status-current">{scopeLabel[item.scope][locale]}</span>
              <span className="direction">{copy.document}</span>
            </div>
            <h3>{item.title || copy.noTitle}</h3>
            <p className="project-note">{item.note || copy.noNotes}</p>
            <dl className="project-meta">
              <div>
                <dt>{copy.versionLabel}</dt>
                <dd>{item.version || copy.noVersion}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </section>
  );
}

