import type { Locale } from "@/lib/locale";

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

const overview: Record<Locale, FirmOverview> = {
  ru: {
    firmStats: [
      { label: "Всего субподрядчиков", value: "14" },
      { label: "Активных субподрядчиков", value: "9" },
      { label: "Учтено рабочих", value: "27" },
      { label: "Привязано контрактов", value: "11" },
    ],
    firmCards: [
      {
        name: "Кровля Плюс",
        role: "Executor",
        status: "Active",
        workers: 6,
        projects: 4,
        paymentPath: "Оплата проходит через расходы проекта",
      },
      {
        name: "Подъем-Скай",
        role: "Executor",
        status: "Linked",
        workers: 3,
        projects: 2,
        paymentPath: "Привязана к одному текущему проекту",
      },
      {
        name: "Городской мастер",
        role: "Executor",
        status: "Active",
        workers: 5,
        projects: 3,
        paymentPath: "Оплата проходит через расходы проекта",
      },
      {
        name: "КаркасПлюс",
        role: "Customer",
        status: "Active",
        workers: 4,
        projects: 1,
        paymentPath: "Использует поток расходов проекта",
      },
    ],
  },
  nl: {
    firmStats: [
      { label: "Totaal onderaannemers", value: "14" },
      { label: "Actieve onderaannemers", value: "9" },
      { label: "Werknemers geregistreerd", value: "27" },
      { label: "Contracten gekoppeld", value: "11" },
    ],
    firmCards: [
      {
        name: "DakPlus",
        role: "Executor",
        status: "Active",
        workers: 6,
        projects: 4,
        paymentPath: "Betaling loopt via de projectkosten",
      },
      {
        name: "LuchtLift",
        role: "Executor",
        status: "Linked",
        workers: 3,
        projects: 2,
        paymentPath: "Gekoppeld aan één lopend project",
      },
      {
        name: "Stedelijk Vakwerk",
        role: "Executor",
        status: "Active",
        workers: 5,
        projects: 3,
        paymentPath: "Betaling loopt via de projectkosten",
      },
      {
        name: "Raamwerk",
        role: "Customer",
        status: "Active",
        workers: 4,
        projects: 1,
        paymentPath: "Gebruikt de kostenstroom van het project",
      },
    ],
  },
};

export function getFirmOverview(locale: Locale): FirmOverview {
  return overview[locale];
}

