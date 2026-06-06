import type { Locale } from "@/lib/locale";
import { getWorkspaceSnapshot } from "@/lib/workspace-store";

export type FirmCard = {
  name: string;
  role: "Executor" | "Customer";
  status: "Active" | "Linked";
  workers: number;
  projects: number;
  paymentPath: string;
};

type FirmOverview = {
  firmStats: Array<{ label: string; value: string }>;
  firmCards: FirmCard[];
};

export function getFirmOverview(locale: Locale): FirmOverview {
  const firms = getWorkspaceSnapshot().firms;

  const firmCards = firms.map((firm) => ({
    name: firm.name,
    role: firm.role,
    status: firm.status,
    workers: Number(firm.workers || 0),
    projects: Number(firm.projects || 0),
    paymentPath: firm.paymentPath,
  }));

  const totals = {
    all: firms.length,
    active: firms.filter((firm) => firm.status === "Active").length,
    workers: firms.reduce((sum, firm) => sum + Number(firm.workers || 0), 0),
    linked: firms.filter((firm) => firm.status === "Linked").length,
  };

  return {
    firmStats:
      locale === "ru"
        ? [
            { label: "Всего субподрядчиков", value: String(totals.all) },
            { label: "Активных субподрядчиков", value: String(totals.active) },
            { label: "Учтено рабочих", value: String(totals.workers) },
            { label: "Привязано записей", value: String(totals.linked) },
          ]
        : [
            { label: "Totaal onderaannemers", value: String(totals.all) },
            { label: "Actieve onderaannemers", value: String(totals.active) },
            { label: "Werknemers geregistreerd", value: String(totals.workers) },
            { label: "Gekoppelde regels", value: String(totals.linked) },
          ],
    firmCards,
  };
}
