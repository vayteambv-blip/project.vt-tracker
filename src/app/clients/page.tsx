"use client";

import { AppShell } from "@/components/app-shell";
import { ClientStoragePanel } from "@/components/client-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { useWorkspaceSelector } from "@/lib/workspace-store";

type ClientKind = "Private" | "Business";

const content = {
  ru: {
    title: "Клиенты",
    description: "Карточки клиентов, их категории и рабочая форма добавления.",
    total: "Всего клиентов",
    privateClients: "Частные клиенты",
    businessClients: "Клиенты-предприниматели",
  },
  nl: {
    title: "Klanten",
    description: "Klantkaarten, categorieën en het werkformulier om nieuwe klanten toe te voegen.",
    total: "Totaal klanten",
    privateClients: "Particuliere klanten",
    businessClients: "Zakelijke klanten",
  },
} as const;

function resolveClientKind(client: { kind?: ClientKind; surname?: string; taxNumber?: string }): ClientKind {
  if (client.kind) {
    return client.kind;
  }

  if (client.taxNumber?.trim()) {
    return "Business";
  }

  return client.surname?.trim() ? "Private" : "Business";
}

export default function ClientsPage() {
  const { locale } = useLocale();
  const copy = content[locale];
  const clients = useWorkspaceSelector((workspace) => workspace.clients);

  const privateCount = clients.filter((client) => resolveClientKind(client) === "Private").length;
  const businessCount = clients.filter((client) => resolveClientKind(client) === "Business").length;

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          <article className="summary-card">
            <div className="label">{copy.total}</div>
            <div className="metric">{clients.length}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.privateClients}</div>
            <div className="metric">{privateCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.businessClients}</div>
            <div className="metric">{businessCount}</div>
          </article>
        </div>

        <ClientStoragePanel />
      </section>
    </AppShell>
  );
}
