import type { Locale } from "@/lib/locale";
import { getWorkspaceSnapshot } from "@/lib/workspace-store";

export type ClientCard = {
  kind: "Private" | "Business";
  name: string;
  surname?: string;
  address: string;
  phone: string;
  email: string;
};

type ClientOverview = {
  clientStats: Array<{ label: string; value: string }>;
  clientCards: ClientCard[];
};

function resolveClientKind(client: { kind?: "Private" | "Business"; surname?: string; taxNumber?: string }): "Private" | "Business" {
  if (client.kind) {
    return client.kind;
  }

  if (client.taxNumber?.trim()) {
    return "Business";
  }

  return client.surname?.trim() ? "Private" : "Business";
}

export function getClientOverview(locale: Locale): ClientOverview {
  const clients = getWorkspaceSnapshot().clients;

  const clientCards = clients.map((client) => ({
    kind: resolveClientKind(client),
    name: client.name,
    surname: client.surname,
    address: client.address,
    phone: client.phone,
    email: client.email,
  }));

  const totals = {
    all: clients.length,
    private: clients.filter((client) => resolveClientKind(client) === "Private").length,
    business: clients.filter((client) => resolveClientKind(client) === "Business").length,
  };

  return {
    clientStats:
      locale === "ru"
        ? [
            { label: "Всего клиентов", value: String(totals.all) },
            { label: "Частные клиенты", value: String(totals.private) },
            { label: "Клиенты-предприниматели", value: String(totals.business) },
          ]
        : [
            { label: "Totaal klanten", value: String(totals.all) },
            { label: "Particuliere klanten", value: String(totals.private) },
            { label: "Zakelijke klanten", value: String(totals.business) },
          ],
    clientCards,
  };
}
