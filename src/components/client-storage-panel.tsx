"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { createWorkspaceId, updateWorkspaceSlice, useWorkspaceSelector } from "@/lib/workspace-store";

type ClientKind = "Private" | "Business";

type StoredClient = {
  id?: string;
  kind: ClientKind;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  taxNumber: string;
  updatedAt: string;
};

type ClientFieldKey = "name" | "surname" | "taxNumber";

const kindCopy: Record<ClientKind, Record<"ru" | "nl", string>> = {
  Private: {
    ru: "Частные клиенты",
    nl: "Particuliere klanten",
  },
  Business: {
    ru: "Клиенты-предприниматели",
    nl: "Zakelijke klanten",
  },
};

const defaultDraft = (kind: ClientKind): StoredClient => ({
  id: undefined,
  kind,
  name: "",
  surname: "",
  address: "",
  phone: "",
  email: "",
  taxNumber: "",
  updatedAt: "",
});

function resolveClientKind(client: Partial<StoredClient> & { surname?: string; taxNumber?: string }): ClientKind {
  if (client.kind) {
    return client.kind;
  }

  if (client.taxNumber?.trim()) {
    return "Business";
  }

  return client.surname?.trim() ? "Private" : "Business";
}

function createLabelMap(locale: "ru" | "nl") {
  return locale === "ru"
    ? {
        title: "Клиенты",
        privateName: "Имя",
        privateSurname: "Фамилия",
        businessName: "Название",
        businessTaxNumber: "Налоговый номер",
        address: "Адрес",
        phone: "Телефон",
        email: "Email",
        save: "Сохранить клиента",
        edit: "Редактировать",
        remove: "Удалить",
        noItems: "В этой категории пока нет клиентов.",
        noValue: "—",
        emptyName: "Без названия",
      }
    : {
        title: "Klanten",
        privateName: "Voornaam",
        privateSurname: "Achternaam",
        businessName: "Naam",
        businessTaxNumber: "Fiscaal nummer",
        address: "Adres",
        phone: "Telefoon",
        email: "E-mail",
        save: "Klant opslaan",
        edit: "Bewerken",
        remove: "Verwijderen",
        noItems: "In deze categorie zijn nog geen klanten.",
        noValue: "—",
        emptyName: "Zonder naam",
      };
}

function isPrivateValid(draft: StoredClient): boolean {
  return [draft.name, draft.surname, draft.address, draft.phone, draft.email].every((value) => value.trim().length > 0);
}

function isBusinessValid(draft: StoredClient): boolean {
  return [draft.name, draft.address, draft.phone, draft.email, draft.taxNumber].every((value) => value.trim().length > 0);
}

export function ClientStoragePanel() {
  const { locale } = useLocale();
  const copy = createLabelMap(locale);
  const [activeKind, setActiveKind] = useState<ClientKind>("Private");
  const [draft, setDraft] = useState<StoredClient>(defaultDraft("Private"));
  const clients = useWorkspaceSelector((workspace) => workspace.clients);

  const visibleClients = clients.filter((client) => resolveClientKind(client) === activeKind);
  const privateCount = clients.filter((client) => resolveClientKind(client) === "Private").length;
  const businessCount = clients.filter((client) => resolveClientKind(client) === "Business").length;

  const handleSelectKind = (kind: ClientKind) => {
    setActiveKind(kind);
    setDraft(defaultDraft(kind));
  };

  const handleSave = () => {
    const isValid = draft.kind === "Private" ? isPrivateValid(draft) : isBusinessValid(draft);
    if (!isValid) {
      return;
    }

    const existingClient = clients.find((client) => client.id === draft.id);

    const nextClient = {
      ...draft,
      id: draft.id || createWorkspaceId("client"),
      projects: existingClient?.projects || "0",
      updatedAt: new Date().toLocaleString(locale === "ru" ? "ru-RU" : "nl-NL"),
    };

    updateWorkspaceSlice("clients", (current) => {
      const withoutCurrent = current.filter((client) => client.id !== nextClient.id);
      return [nextClient, ...withoutCurrent];
    });

    setDraft(defaultDraft(activeKind));
  };

  const handleEdit = (client: (typeof clients)[number]) => {
    const kind = resolveClientKind(client);
    setActiveKind(kind);
    setDraft({
      id: client.id,
      kind,
      name: client.name || "",
      surname: client.surname || "",
      address: client.address || "",
      phone: client.phone || "",
      email: client.email || "",
      taxNumber: (client as Partial<StoredClient>).taxNumber || "",
      updatedAt: (client as Partial<StoredClient>).updatedAt || "",
    });
  };

  const handleDelete = (id: string) => {
    updateWorkspaceSlice("clients", (current) => current.filter((client) => client.id !== id));
    if (draft.id === id) {
      setDraft(defaultDraft(activeKind));
    }
  };

  const fields: Array<{
    key: ClientFieldKey;
    label: string;
    value: string;
    placeholder: string;
  }> = draft.kind === "Private"
    ? [
        {
          key: "name",
          label: copy.privateName,
          value: draft.name,
          placeholder: locale === "ru" ? "Например: Анна" : "Bijvoorbeeld: Anna",
        },
        {
          key: "surname",
          label: copy.privateSurname,
          value: draft.surname,
          placeholder: locale === "ru" ? "Например: Иванова" : "Bijvoorbeeld: Janssens",
        },
      ]
    : [
        {
          key: "name",
          label: copy.businessName,
          value: draft.name,
          placeholder: locale === "ru" ? "Например: De Smet Groep" : "Bijvoorbeeld: De Smet Groep",
        },
        {
          key: "taxNumber",
          label: copy.businessTaxNumber,
          value: draft.taxNumber,
          placeholder: locale === "ru" ? "Например: BE0123456789" : "Bijvoorbeeld: BE0123456789",
        },
      ];

  const isSaveEnabled = draft.kind === "Private" ? isPrivateValid(draft) : isBusinessValid(draft);

  return (
    <section className="panel">
      <div className="entity-topline">
        <h2>{copy.title}</h2>
      </div>

      <div className="client-kind-grid">
        <button
          className={`summary-card client-kind-card ${activeKind === "Private" ? "is-active" : ""}`}
          type="button"
          onClick={() => handleSelectKind("Private")}
        >
          <div className="label">{kindCopy.Private[locale]}</div>
          <div className="metric">{privateCount}</div>
        </button>
        <button
          className={`summary-card client-kind-card ${activeKind === "Business" ? "is-active" : ""}`}
          type="button"
          onClick={() => handleSelectKind("Business")}
        >
          <div className="label">{kindCopy.Business[locale]}</div>
          <div className="metric">{businessCount}</div>
        </button>
      </div>

      <div className="form-grid">
        {fields.map((field) => (
          <label className="field" key={field.key}>
            <span>{field.label}</span>
            <input
              value={field.value}
              onChange={(event) => setDraft((current) => ({ ...current, [field.key]: event.target.value }))}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>

      <div className="form-grid">
        <label className="field">
          <span>{copy.address}</span>
          <input
            value={draft.address}
            onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))}
            placeholder={locale === "ru" ? "Например: Антверпен, Бельгия" : "Bijvoorbeeld: Antwerpen, België"}
          />
        </label>

        <label className="field">
          <span>{copy.phone}</span>
          <input
            value={draft.phone}
            onChange={(event) => setDraft((current) => ({ ...current, phone: event.target.value }))}
            placeholder={locale === "ru" ? "Например: +32 470 11 22 33" : "Bijvoorbeeld: +32 470 11 22 33"}
          />
        </label>
      </div>

      <label className="field">
        <span>{copy.email}</span>
        <input
          value={draft.email}
          onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))}
          placeholder={locale === "ru" ? "Например: contact@example.com" : "Bijvoorbeeld: contact@example.com"}
        />
      </label>

      <div className="panel-actions">
        <button className="solid-button" type="button" onClick={handleSave} disabled={!isSaveEnabled}>
          {copy.save}
        </button>
      </div>

      <section className="entity-grid">
        {visibleClients.length === 0 ? (
          <article className="feature-card">
            <h3>{copy.noItems}</h3>
          </article>
        ) : (
          visibleClients.map((client) => {
            const kind = resolveClientKind(client);
            return (
              <article className="entity-card" key={client.id}>
                <div className="entity-topline">
                  <span className="status status-current">{kindCopy[kind][locale]}</span>
                  <span className="direction">{client.updatedAt || copy.noValue}</span>
                </div>
                <h3>
                  {client.name || copy.emptyName}
                  {kind === "Private" && client.surname ? ` ${client.surname}` : ""}
                </h3>
                <dl className="project-meta">
                  {kind === "Private" ? (
                    <>
                      <div>
                        <dt>{copy.privateSurname}</dt>
                        <dd>{client.surname || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.address}</dt>
                        <dd>{client.address || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.phone}</dt>
                        <dd>{client.phone || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.email}</dt>
                        <dd>{client.email || copy.noValue}</dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <dt>{copy.businessTaxNumber}</dt>
                        <dd>{(client as Partial<StoredClient>).taxNumber || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.address}</dt>
                        <dd>{client.address || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.phone}</dt>
                        <dd>{client.phone || copy.noValue}</dd>
                      </div>
                      <div>
                        <dt>{copy.email}</dt>
                        <dd>{client.email || copy.noValue}</dd>
                      </div>
                    </>
                  )}
                </dl>
                <div className="panel-actions">
                  <button className="ghost-button" type="button" onClick={() => handleEdit(client)}>
                    {copy.edit}
                  </button>
                  <button className="ghost-button" type="button" onClick={() => handleDelete(client.id)}>
                    {copy.remove}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </section>
  );
}
