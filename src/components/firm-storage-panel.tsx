"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import {
  clearWorkspaceSlice,
  createWorkspaceId,
  updateWorkspaceSlice,
  useWorkspaceSelector,
} from "@/lib/workspace-store";

type StoredFirm = {
  id?: string;
  name: string;
  role: "Executor" | "Customer";
  status: "Active" | "Linked";
  workers: string;
  projects: string;
  paymentPath: string;
  updatedAt: string;
};

const defaultDraft: StoredFirm = {
  id: undefined,
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
    title: "Локальное хранение субподрядчиков",
    note:
      "Храни черновики субподрядчиков в браузере, чтобы проверять связи, рабочих и поток оплаты без backend.",
    nameLabel: "Название субподрядчика",
    namePlaceholder: "Например: Кровля Плюс",
    roleLabel: "Роль",
    statusLabel: "Статус",
    workersLabel: "Рабочие",
    workersPlaceholder: "Например: 6",
    projectsLabel: "Проекты",
    projectsPlaceholder: "Например: 4",
    paymentLabel: "Путь оплаты",
    paymentPlaceholder: "Например: Оплата через расходы проекта",
    save: "Сохранить субподрядчика",
    reset: "Очистить субподрядчиков",
    savedCount: "Сохраненных субподрядчиков",
    storage: "Хранилище",
    storageReady: "Браузерное хранилище готово",
    lastSave: "Последнее сохранение",
    notSaved: "Еще не сохранялось",
    noTitle: "Без названия",
    noPayment: "Путь оплаты пока не задан.",
    noValue: "0",
    role: {
      Executor: "Субподрядчик",
      Customer: "Клиент-фирма",
    },
    status: {
      Active: "Активная",
      Linked: "Привязана",
    },
  },
  nl: {
    title: "Lokale opslag van onderaannemers",
    note:
      "Bewaar concepten van onderaannemers in de browser om koppelingen, werknemers en betaalstromen zonder backend te testen.",
    nameLabel: "Naam onderaannemer",
    namePlaceholder: "Bijvoorbeeld: DakPlus",
    roleLabel: "Rol",
    statusLabel: "Status",
    workersLabel: "Werknemers",
    workersPlaceholder: "Bijvoorbeeld: 6",
    projectsLabel: "Projecten",
    projectsPlaceholder: "Bijvoorbeeld: 4",
    paymentLabel: "Betaalpad",
    paymentPlaceholder: "Bijvoorbeeld: Betaling via projectkosten",
    save: "Onderaannemer opslaan",
    reset: "Onderaannemers wissen",
    savedCount: "Opgeslagen onderaannemers",
    storage: "Opslag",
    storageReady: "Browseropslag is gereed",
    lastSave: "Laatste opslag",
    notSaved: "Nog niet opgeslagen",
    noTitle: "Zonder titel",
    noPayment: "Betaalpad is nog niet ingevuld.",
    noValue: "0",
    role: {
      Executor: "Onderaannemer",
      Customer: "Klant-bedrijf",
    },
    status: {
      Active: "Actief",
      Linked: "Gekoppeld",
    },
  },
} as const;

export function FirmStoragePanel() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [draft, setDraft] = useState<StoredFirm>(defaultDraft);
  const firms = useWorkspaceSelector((workspace) => workspace.firms);

  const handleSave = () => {
    const nextFirm = {
      ...draft,
      id: draft.id || createWorkspaceId("firm"),
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    updateWorkspaceSlice("firms", (current) => {
      const withoutCurrent = current.filter((firm) => firm.id !== nextFirm.id);
      return [nextFirm, ...withoutCurrent];
    });
    setDraft(defaultDraft);
  };

  const handleEdit = (firm: StoredFirm) => {
    setDraft(firm);
  };

  const handleDelete = (id: string) => {
    updateWorkspaceSlice("firms", (current) => current.filter((firm) => firm.id !== id));
    if (draft.id === id) {
      setDraft(defaultDraft);
    }
  };

  const handleReset = () => {
    clearWorkspaceSlice("firms");
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
          {draft.id ? locale === "ru" ? "Обновить субподрядчика" : "Onderaannemer bijwerken" : copy.save}
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
          <article className="entity-card" key={firm.id}>
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
            <div className="panel-actions">
              <button className="ghost-button" type="button" onClick={() => handleEdit(firm)}>
                {locale === "ru" ? "Редактировать" : "Bewerken"}
              </button>
              <button className="ghost-button" type="button" onClick={() => handleDelete(firm.id)}>
                {locale === "ru" ? "Удалить" : "Verwijderen"}
              </button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
