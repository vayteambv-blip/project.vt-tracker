"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { clearStorage, readStorage, writeStorage } from "@/lib/storage";

type StoredClient = {
  name: string;
  type: "Private" | "Company";
  status: "Complete" | "In progress";
  address: string;
  phone: string;
  email: string;
  projects: string;
  updatedAt: string;
};

const STORAGE_KEY = "vt-tracker:clients";

const defaultDraft: StoredClient = {
  name: "",
  type: "Private",
  status: "In progress",
  address: "",
  phone: "",
  email: "",
  projects: "",
  updatedAt: "",
};

const content = {
  ru: {
    title: "Локальное хранение клиентов",
    note:
      "Храни черновики клиентов в браузере, чтобы проверять полноту и поведение после обновления страницы без backend.",
    nameLabel: "Имя клиента",
    namePlaceholder: "Например: Семья Брауэрс",
    typeLabel: "Тип",
    statusLabel: "Статус",
    projectsLabel: "Проекты",
    projectsPlaceholder: "Например: 2",
    addressLabel: "Адрес",
    addressPlaceholder: "Например: Антверпен, Бельгия",
    phoneLabel: "Телефон",
    phonePlaceholder: "Например: +32 470 11 22 33",
    emailLabel: "Эл. почта",
    emailPlaceholder: "Например: contact@example.com",
    save: "Сохранить клиента",
    reset: "Очистить клиентов",
    savedCount: "Сохраненных клиентов",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    projectLinks: "Связанных проектов: ",
    noValue: "Не задан",
    type: {
      Private: "Частный",
      Company: "Фирма",
    },
    status: {
      Complete: "Полный",
      "In progress": "В работе",
    },
  },
  nl: {
    title: "Lokale klantopslag",
    note:
      "Bewaar klantconcepten in de browser zodat je de volledigheid en het gedrag na een paginarefresh kunt testen zonder backend.",
    nameLabel: "Klantnaam",
    namePlaceholder: "Bijvoorbeeld: Familie Brouwers",
    typeLabel: "Type",
    statusLabel: "Status",
    projectsLabel: "Projecten",
    projectsPlaceholder: "Bijvoorbeeld: 2",
    addressLabel: "Adres",
    addressPlaceholder: "Bijvoorbeeld: Antwerpen, België",
    phoneLabel: "Telefoon",
    phonePlaceholder: "Bijvoorbeeld: +32 470 11 22 33",
    emailLabel: "E-mail",
    emailPlaceholder: "Bijvoorbeeld: contact@example.com",
    save: "Klant opslaan",
    reset: "Klanten wissen",
    savedCount: "Opgeslagen klanten",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    projectLinks: "Gekoppelde projecten: ",
    noValue: "Niet ingevuld",
    type: {
      Private: "Particulier",
      Company: "Bedrijf",
    },
    status: {
      Complete: "Volledig",
      "In progress": "In bewerking",
    },
  },
} as const;

function readClients(): StoredClient[] {
  return readStorage<StoredClient[]>(STORAGE_KEY, []);
}

function saveClients(clients: StoredClient[]): void {
  writeStorage(STORAGE_KEY, clients);
}

export function ClientStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredClient>(defaultDraft);
  const [clients, setClients] = useState<StoredClient[]>(() => readClients());

  const handleSave = () => {
    const nextClient = {
      ...draft,
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    const nextClients = [nextClient, ...clients];
    setClients(nextClients);
    saveClients(nextClients);
    setDraft(defaultDraft);
  };

  const handleReset = () => {
    clearStorage(STORAGE_KEY);
    setClients([]);
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
          <span>{copy.typeLabel}</span>
          <select
            value={draft.type}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                type: event.target.value as StoredClient["type"],
              }))
            }
          >
            <option value="Private">{copy.type.Private}</option>
            <option value="Company">{copy.type.Company}</option>
          </select>
        </label>

        <label className="field">
          <span>{copy.statusLabel}</span>
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                status: event.target.value as StoredClient["status"],
              }))
            }
          >
            <option value="In progress">{copy.status["In progress"]}</option>
            <option value="Complete">{copy.status.Complete}</option>
          </select>
        </label>

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
      </div>

      <div className="form-grid">
        <label className="field">
          <span>{copy.addressLabel}</span>
          <input
            value={draft.address}
            onChange={(event) =>
              setDraft((current) => ({ ...current, address: event.target.value }))
            }
            placeholder={copy.addressPlaceholder}
          />
        </label>

        <label className="field">
          <span>{copy.phoneLabel}</span>
          <input
            value={draft.phone}
            onChange={(event) =>
              setDraft((current) => ({ ...current, phone: event.target.value }))
            }
            placeholder={copy.phonePlaceholder}
          />
        </label>
      </div>

      <label className="field">
        <span>{copy.emailLabel}</span>
        <input
          value={draft.email}
          onChange={(event) =>
            setDraft((current) => ({ ...current, email: event.target.value }))
          }
          placeholder={copy.emailPlaceholder}
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
          <div className="metric">{clients.length}</div>
        </div>
        <div>
          <span className="label">{copy.storage}</span>
          <div className="metric">{copy.storageReady}</div>
        </div>
        <div>
          <span className="label">{copy.lastSave}</span>
          <div className="metric">{clients[0]?.updatedAt || copy.notSaved}</div>
        </div>
      </div>

      <section className="entity-grid">
        {clients.map((client) => (
          <article className="entity-card" key={`${client.name}-${client.updatedAt}`}>
            <div className="entity-topline">
              <span className={client.status === "Complete" ? "status status-current" : "status status-prep"}>
                {copy.status[client.status]}
              </span>
              <span className="direction">{copy.type[client.type]}</span>
            </div>
            <h3>{client.name || copy.noTitle}</h3>
            <p className="entity-note">
              {copy.projectLinks}
              {client.projects || "0"}
            </p>
            <dl className="project-meta">
              <div>
                <dt>{copy.addressLabel}</dt>
                <dd>{client.address || copy.noValue}</dd>
              </div>
              <div>
                <dt>{copy.phoneLabel}</dt>
                <dd>{client.phone || copy.noValue}</dd>
              </div>
              <div>
                <dt>{copy.emailLabel}</dt>
                <dd>{client.email || copy.noValue}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </section>
  );
}
