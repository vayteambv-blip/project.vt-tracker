"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredArchiveItem = {
  title: string;
  year: string;
  client: string;
  direction: string;
  note: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:archive";

const defaultDraft: StoredArchiveItem = {
  title: "",
  year: "",
  client: "",
  direction: "",
  note: "",
  updatedAt: "",
};

const content = {
  ru: {
    title: "Локальное хранение архива",
    note:
      "Храни черновики архива в браузере, чтобы проверять восстановление и метаданные поиска без backend.",
    titleLabel: "Название проекта",
    titlePlaceholder: "Например: Строительство каркаса дома",
    yearLabel: "Год",
    yearPlaceholder: "Например: 2026",
    clientLabel: "Клиент",
    clientPlaceholder: "Например: Группа Де Смет",
    directionLabel: "Направление",
    directionPlaceholder: "Например: Общее строительство",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши, что должен помнить архивный ряд.",
    save: "Сохранить строку архива",
    reset: "Очистить архив",
    savedCount: "Сохраненных строк",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noNotes: "Пока без заметок.",
    noClient: "Не задан",
    archive: "Архив",
    noYear: "год",
  },
  nl: {
    title: "Lokale archiefopslag",
    note:
      "Bewaar archiefconcepten in de browser om herstel en zoekmetadata zonder backend te testen.",
    titleLabel: "Projectnaam",
    titlePlaceholder: "Bijvoorbeeld: Houtskeletbouw van het huis",
    yearLabel: "Jaar",
    yearPlaceholder: "Bijvoorbeeld: 2026",
    clientLabel: "Klant",
    clientPlaceholder: "Bijvoorbeeld: De Smet Groep",
    directionLabel: "Richting",
    directionPlaceholder: "Bijvoorbeeld: Algemene bouw",
    notesLabel: "Notities",
    notesPlaceholder: "Noteer wat de archiefrij moet onthouden.",
    save: "Archiefregel opslaan",
    reset: "Archief wissen",
    savedCount: "Opgeslagen regels",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noNotes: "Nog geen notities.",
    noClient: "Niet ingevuld",
    archive: "Archief",
    noYear: "jaar",
  },
} as const;

function readItems(): StoredArchiveItem[] {
  return readStorage<StoredArchiveItem[]>(STORAGE_KEY, []);
}

function saveItems(items: StoredArchiveItem[]): void {
  writeStorage(STORAGE_KEY, items);
}

export function ArchiveStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredArchiveItem>(defaultDraft);
  const [items, setItems] = useState<StoredArchiveItem[]>(() => readItems());

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
          <span>{copy.yearLabel}</span>
          <input
            value={draft.year}
            onChange={(event) =>
              setDraft((current) => ({ ...current, year: event.target.value }))
            }
            placeholder={copy.yearPlaceholder}
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
              <span className="status status-archive">{copy.archive}</span>
              <span className="direction">{item.year || copy.noYear}</span>
            </div>
            <h3>{item.title || copy.noTitle}</h3>
            <p className="project-note">{item.note || copy.noNotes}</p>
            <dl className="project-meta">
              <div>
                <dt>{copy.clientLabel}</dt>
                <dd>{item.client || copy.noClient}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </section>
  );
}
