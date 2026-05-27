"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredFirm = {
  name: string;
  role: "Executor" | "Customer";
  status: "Active" | "Linked";
  workers: string;
  projects: string;
  paymentPath: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:firms";

const defaultDraft: StoredFirm = {
  name: "",
  role: "Executor",
  status: "Active",
  workers: "",
  projects: "",
  paymentPath: "",
  updatedAt: "",
};

const content = {
  ru: {
    title: "Локальное хранение фирм",
    note:
      "Храни черновики фирм в браузере, чтобы проверять связи, рабочих и поток оплаты без backend.",
    nameLabel: "Название фирмы",
    namePlaceholder: "Например: Кровля Плюс",
    roleLabel: "Роль",
    statusLabel: "Статус",
    workersLabel: "Рабочие",
    workersPlaceholder: "Например: 6",
    projectsLabel: "Проекты",
    projectsPlaceholder: "Например: 4",
    paymentLabel: "Путь оплаты",
    paymentPlaceholder: "Например: Оплата через расходы проекта",
    save: "Сохранить фирму",
    reset: "Очистить фирмы",
    savedCount: "Сохраненных фирм",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noPayment: "Путь оплаты пока не задан.",
    noValue: "0",
    role: {
      Executor: "Исполнитель",
      Customer: "Заказчик",
    },
    status: {
      Active: "Активная",
      Linked: "Привязана",
    },
  },
  nl: {
    title: "Lokale bedrijfsopslag",
    note:
      "Bewaar bedrijfsconcepten in de browser om koppelingen, werknemers en betaalstromen zonder backend te testen.",
    nameLabel: "Bedrijfsnaam",
    namePlaceholder: "Bijvoorbeeld: DakPlus",
    roleLabel: "Rol",
    statusLabel: "Status",
    workersLabel: "Werknemers",
    workersPlaceholder: "Bijvoorbeeld: 6",
    projectsLabel: "Projecten",
    projectsPlaceholder: "Bijvoorbeeld: 4",
    paymentLabel: "Betaalpad",
    paymentPlaceholder: "Bijvoorbeeld: Betaling via projectkosten",
    save: "Bedrijf opslaan",
    reset: "Bedrijven wissen",
    savedCount: "Opgeslagen bedrijven",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noPayment: "Betaalpad is nog niet ingevuld.",
    noValue: "0",
    role: {
      Executor: "Uitvoerder",
      Customer: "Opdrachtgever",
    },
    status: {
      Active: "Actief",
      Linked: "Gekoppeld",
    },
  },
} as const;

function readFirms(): StoredFirm[] {
  return readStorage<StoredFirm[]>(STORAGE_KEY, []);
}

function saveFirms(firms: StoredFirm[]): void {
  writeStorage(STORAGE_KEY, firms);
}

export function FirmStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredFirm>(defaultDraft);
  const [firms, setFirms] = useState<StoredFirm[]>(() => readFirms());

  const handleSave = () => {
    const nextFirm = {
      ...draft,
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    const nextFirms = [nextFirm, ...firms];
    setFirms(nextFirms);
    saveFirms(nextFirms);
    setDraft(defaultDraft);
  };

  const handleReset = () => {
    clearStorage(STORAGE_KEY);
    setFirms([]);
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
          <span>{copy.roleLabel}</span>
          <select
            value={draft.role}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                role: event.target.value as StoredFirm["role"],
              }))
            }
          >
            <option value="Executor">{copy.role.Executor}</option>
            <option value="Customer">{copy.role.Customer}</option>
          </select>
        </label>

        <label className="field">
          <span>{copy.statusLabel}</span>
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                status: event.target.value as StoredFirm["status"],
              }))
            }
          >
            <option value="Active">{copy.status.Active}</option>
            <option value="Linked">{copy.status.Linked}</option>
          </select>
        </label>

        <label className="field">
          <span>{copy.workersLabel}</span>
          <input
            value={draft.workers}
            onChange={(event) =>
              setDraft((current) => ({ ...current, workers: event.target.value }))
            }
            placeholder={copy.workersPlaceholder}
          />
        </label>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>{copy.projectsLabel}</span>
          <input
            value={draft.projects}
            onChange={(event) =>
              setDraft((current) => ({ ...current, projects: event.target.value }))
            }
            placeholder={copy.projectsPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.paymentLabel}</span>
          <input
            value={draft.paymentPath}
            onChange={(event) =>
              setDraft((current) => ({ ...current, paymentPath: event.target.value }))
            }
            placeholder={copy.paymentPlaceholder}
          />
        </label>
      </div>

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
          <div className="metric">{firms.length}</div>
        </div>
        <div>
          <span className="label">{copy.storage}</span>
          <div className="metric">{copy.storageReady}</div>
        </div>
        <div>
          <span className="label">{copy.lastSave}</span>
          <div className="metric">{firms[0]?.updatedAt || copy.notSaved}</div>
        </div>
      </div>

      <section className="entity-grid">
        {firms.map((firm) => (
          <article className="entity-card" key={`${firm.name}-${firm.updatedAt}`}>
            <div className="entity-topline">
              <span className={firm.status === "Active" ? "status status-current" : "status status-future"}>
                {copy.status[firm.status]}
              </span>
              <span className="direction">{copy.role[firm.role]}</span>
            </div>
            <h3>{firm.name || copy.noTitle}</h3>
            <p className="entity-note">{firm.paymentPath || copy.noPayment}</p>
            <dl className="project-meta">
              <div>
                <dt>{copy.workersLabel}</dt>
                <dd>{firm.workers || copy.noValue}</dd>
              </div>
              <div>
                <dt>{copy.projectsLabel}</dt>
                <dd>{firm.projects || copy.noValue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </section>
  );
}
