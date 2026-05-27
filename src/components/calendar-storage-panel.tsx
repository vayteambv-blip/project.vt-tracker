"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredCalendarItem = {
  name: string;
  direction: string;
  startDate: string;
  status: "Today" | "Tomorrow" | "Next week" | "Waiting";
  note: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:calendar";

const defaultDraft: StoredCalendarItem = {
  name: "",
  direction: "",
  startDate: "",
  status: "Waiting",
  note: "",
  updatedAt: "",
};

const statusLabel: Record<StoredCalendarItem["status"], Record<"ru" | "nl", string>> = {
  Today: { ru: "Сегодня", nl: "Vandaag" },
  Tomorrow: { ru: "Завтра", nl: "Morgen" },
  "Next week": { ru: "На следующей неделе", nl: "Volgende week" },
  Waiting: { ru: "В ожидании", nl: "In afwachting" },
};

const content = {
  ru: {
    title: "Локальное хранение календаря",
    note:
      "Храни календарные черновики в браузере, чтобы проверять стартовые даты и напоминания без backend.",
    nameLabel: "Название проекта",
    namePlaceholder: "Например: Ремонт северной крыши",
    directionLabel: "Направление",
    directionPlaceholder: "Например: Крыша",
    startLabel: "Дата старта",
    startPlaceholder: "Например: 27 May 2026",
    statusLabel: "Время",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши состояние календаря или детали напоминания.",
    save: "Сохранить запись",
    reset: "Очистить календарь",
    savedCount: "Сохраненных записей",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noDirection: "без направления",
  },
  nl: {
    title: "Lokale agendaopslag",
    note:
      "Bewaar agenda-concepten in de browser om startdata en herinneringen zonder backend te testen.",
    nameLabel: "Projectnaam",
    namePlaceholder: "Bijvoorbeeld: Renovatie van het noordelijke dak",
    directionLabel: "Richting",
    directionPlaceholder: "Bijvoorbeeld: Dak",
    startLabel: "Startdatum",
    startPlaceholder: "Bijvoorbeeld: 27 mei 2026",
    statusLabel: "Tijd",
    notesLabel: "Notities",
    notesPlaceholder: "Noteer de agenda-status of herinneringsdetails.",
    save: "Inschrijving opslaan",
    reset: "Agenda wissen",
    savedCount: "Opgeslagen items",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noDirection: "zonder richting",
  },
} as const;

function readItems(): StoredCalendarItem[] {
  return readStorage<StoredCalendarItem[]>(STORAGE_KEY, []);
}

function saveItems(items: StoredCalendarItem[]): void {
  writeStorage(STORAGE_KEY, items);
}

export function CalendarStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredCalendarItem>(defaultDraft);
  const [items, setItems] = useState<StoredCalendarItem[]>(() => readItems());

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
          <span>{copy.nameLabel}</span>
          <input
            value={draft.name}
            onChange={(event) =>
              setDraft((current) => ({ ...current, name: event.target.value }))
            }
            placeholder={copy.namePlaceholder}
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
                status: event.target.value as StoredCalendarItem["status"],
              }))
            }
          >
            <option value="Today">{statusLabel.Today[locale]}</option>
            <option value="Tomorrow">{statusLabel.Tomorrow[locale]}</option>
            <option value="Next week">{statusLabel["Next week"][locale]}</option>
            <option value="Waiting">{statusLabel.Waiting[locale]}</option>
          </select>
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
          <article className="project-card" key={`${item.name}-${item.updatedAt}`}>
            <div className="project-topline">
              <span className="status status-current">{statusLabel[item.status][locale]}</span>
              <span className="direction">{item.direction || copy.noDirection}</span>
            </div>
            <h3>{item.name}</h3>
            <p className="project-note">{item.note}</p>
          </article>
        ))}
      </section>
    </section>
  );
}
