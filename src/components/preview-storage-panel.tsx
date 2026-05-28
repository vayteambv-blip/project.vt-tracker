"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type PreviewDraft = {
  title: string;
  notes: string;
  lane: "Draft" | "Approved";
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:preview-draft";

const defaultDraft: PreviewDraft = {
  title: "",
  notes: "",
  lane: "Draft",
  updatedAt: "",
};

const laneLabel: Record<PreviewDraft["lane"], Record<"ru" | "nl", string>> = {
  Draft: { ru: "Черновик", nl: "Concept" },
  Approved: { ru: "Одобренная", nl: "Goedgekeurd" },
};

const content = {
  ru: {
    title: "Черновик в браузерном хранилище",
    note:
      "Этот черновик остается в твоем браузере после обновления страницы, чтобы ты мог проверять поведение фронтенда без backend.",
    titleLabel: "Заголовок черновика",
    titlePlaceholder: "Например: Новая компоновка проекта",
    laneLabel: "Линия",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши, что нужно помнить к следующему обновлению.",
    save: "Сохранить черновик",
    reset: "Очистить черновик",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    currentLane: "Линия черновика",
  },
  nl: {
    title: "Concept in browseropslag",
    note:
      "Dit concept blijft na een paginarefresh in je browser, zodat je frontendgedrag kunt testen zonder backend.",
    titleLabel: "Concepttitel",
    titlePlaceholder: "Bijvoorbeeld: Nieuwe projectindeling",
    laneLabel: "Lijn",
    notesLabel: "Notities",
    notesPlaceholder: "Schrijf op wat je moet onthouden voor de volgende update.",
    save: "Concept opslaan",
    reset: "Concept wissen",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    currentLane: "Conceptlijn",
  },
} as const;

export function PreviewStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<PreviewDraft>(() => readStorage(STORAGE_KEY, defaultDraft));

  const handleSave = () => {
    const nextDraft = {
      ...draft,
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    setDraft(nextDraft);
    writeStorage(STORAGE_KEY, nextDraft);
  };

  const handleReset = () => {
    clearStorage(STORAGE_KEY);
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
          <span>{copy.laneLabel}</span>
          <select
            value={draft.lane}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                lane: event.target.value as PreviewDraft["lane"],
              }))
            }
          >
            <option value="Draft">{laneLabel.Draft[locale]}</option>
            <option value="Approved">{laneLabel.Approved[locale]}</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>{copy.notesLabel}</span>
        <textarea
          value={draft.notes}
          onChange={(event) =>
            setDraft((current) => ({ ...current, notes: event.target.value }))
          }
          placeholder={copy.notesPlaceholder}
          rows={5}
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
          <span className="label">{copy.storage}</span>
          <div className="metric">{copy.storageReady}</div>
        </div>
        <div>
          <span className="label">{copy.lastSave}</span>
          <div className="metric">{draft.updatedAt || copy.notSaved}</div>
        </div>
        <div>
          <span className="label">{copy.currentLane}</span>
          <div className="metric">{laneLabel[draft.lane][locale]}</div>
        </div>
      </div>
    </section>
  );
}

