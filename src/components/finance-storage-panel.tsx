"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredFinance = {
  project: string;
  totalCost: string;
  profit: string;
  firm: string;
  note: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:finances";

const defaultDraft: StoredFinance = {
  project: "",
  totalCost: "",
  profit: "",
  firm: "",
  note: "",
  updatedAt: "",
};

const content = {
  ru: {
    title: "Локальное хранение финансов",
    note:
      "Храни финансовые черновики в браузере, чтобы проверять итоги и прибыль без backend.",
    projectLabel: "Проект",
    projectPlaceholder: "Например: Ремонт северной крыши",
    firmLabel: "Фирма",
    firmPlaceholder: "Например: Кровля Плюс",
    totalLabel: "Общие расходы",
    totalPlaceholder: "Например: €128k",
    profitLabel: "Прибыль",
    profitPlaceholder: "Например: €34k",
    notesLabel: "Заметки",
    notesPlaceholder: "Запиши, что представляет эта финансовая строка.",
    save: "Сохранить финансовую строку",
    reset: "Очистить финансы",
    savedCount: "Сохраненных строк",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noNotes: "Пока без заметок.",
    noValue: "Не задана",
    line: "финансовая строка",
    projectTag: "Финансы",
    firmTag: "фирма",
  },
  nl: {
    title: "Lokale financiële opslag",
    note:
      "Bewaar financiële concepten in de browser om totalen en winst te testen zonder backend.",
    projectLabel: "Project",
    projectPlaceholder: "Bijvoorbeeld: Renovatie van het noordelijke dak",
    firmLabel: "Bedrijf",
    firmPlaceholder: "Bijvoorbeeld: DakPlus",
    totalLabel: "Totale kosten",
    totalPlaceholder: "Bijvoorbeeld: €128k",
    profitLabel: "Winst",
    profitPlaceholder: "Bijvoorbeeld: €34k",
    notesLabel: "Notities",
    notesPlaceholder: "Noteer wat deze financiële regel voorstelt.",
    save: "Financiële regel opslaan",
    reset: "Financiën wissen",
    savedCount: "Opgeslagen regels",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noNotes: "Nog geen notities.",
    noValue: "Niet ingevuld",
    line: "financiële regel",
    projectTag: "Financiën",
    firmTag: "bedrijf",
  },
} as const;

function readItems(): StoredFinance[] {
  return readStorage<StoredFinance[]>(STORAGE_KEY, []);
}

function saveItems(items: StoredFinance[]): void {
  writeStorage(STORAGE_KEY, items);
}

export function FinanceStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredFinance>(defaultDraft);
  const [items, setItems] = useState<StoredFinance[]>(() => readItems());

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
          <span>{copy.projectLabel}</span>
          <input
            value={draft.project}
            onChange={(event) =>
              setDraft((current) => ({ ...current, project: event.target.value }))
            }
            placeholder={copy.projectPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.firmLabel}</span>
          <input
            value={draft.firm}
            onChange={(event) =>
              setDraft((current) => ({ ...current, firm: event.target.value }))
            }
            placeholder={copy.firmPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.totalLabel}</span>
          <input
            value={draft.totalCost}
            onChange={(event) =>
              setDraft((current) => ({ ...current, totalCost: event.target.value }))
            }
            placeholder={copy.totalPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.profitLabel}</span>
          <input
            value={draft.profit}
            onChange={(event) =>
              setDraft((current) => ({ ...current, profit: event.target.value }))
            }
            placeholder={copy.profitPlaceholder}
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
          <article className="project-card" key={`${item.project}-${item.updatedAt}`}>
            <div className="project-topline">
              <span className="status status-current">{item.totalCost || copy.projectTag}</span>
              <span className="direction">{item.firm || copy.firmTag}</span>
            </div>
            <h3>{item.project || copy.noTitle}</h3>
            <p className="project-note">{item.note || copy.noNotes}</p>
            <dl className="project-meta">
              <div>
                <dt>{copy.profitLabel}</dt>
                <dd>{item.profit || copy.noValue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </section>
  );
}
