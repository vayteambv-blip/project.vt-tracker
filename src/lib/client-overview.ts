import type { Locale } from "@/lib/locale";

export type ClientCard = {
  name: string;
  type: "Private" | "Company";
  status: "Complete" | "In progress";
  address: string;
  phone: string;
  email: string;
  projects: number;
};

type ClientOverview = {
  clientStats: Array<{ label: string; value: string }>;
  clientCards: ClientCard[];
};

const overview: Record<Locale, ClientOverview> = {
  ru: {
    clientStats: [
      { label: "Всего клиентов", value: "18" },
      { label: "Частные клиенты", value: "11" },
      { label: "Клиенты-фирмы", value: "7" },
      { label: "Требуют проверки", value: "3" },
    ],
    clientCards: [
      {
        name: "Семья Брауэрс",
        type: "Private",
        status: "Complete",
        address: "Антверпен, Бельгия",
        phone: "+32 470 11 22 33",
        email: "brouwers@example.com",
        projects: 2,
      },
      {
        name: "Ван Дейк Недвижимость",
        type: "Company",
        status: "In progress",
        address: "Гент, Бельгия",
        phone: "+32 470 44 55 66",
        email: "contact@vandijkproperties.be",
        projects: 4,
      },
      {
        name: "Резиденция Мертенс",
        type: "Private",
        status: "Complete",
        address: "Брюгге, Бельгия",
        phone: "+32 470 77 88 99",
        email: "mertens@example.com",
        projects: 1,
      },
      {
        name: "Группа Де Смет",
        type: "Company",
        status: "In progress",
        address: "Лёвен, Бельгия",
        phone: "+32 470 12 34 56",
        email: "office@desmetgroup.be",
        projects: 3,
      },
    ],
  },
  nl: {
    clientStats: [
      { label: "Totaal klanten", value: "18" },
      { label: "Particuliere klanten", value: "11" },
      { label: "Opdrachtgevers", value: "7" },
      { label: "Te controleren", value: "3" },
    ],
    clientCards: [
      {
        name: "Familie Brouwers",
        type: "Private",
        status: "Complete",
        address: "Antwerpen, België",
        phone: "+32 470 11 22 33",
        email: "brouwers@example.com",
        projects: 2,
      },
      {
        name: "Van Dijk Vastgoed",
        type: "Company",
        status: "In progress",
        address: "Gent, België",
        phone: "+32 470 44 55 66",
        email: "contact@vandijkproperties.be",
        projects: 4,
      },
      {
        name: "Mertens Residentie",
        type: "Private",
        status: "Complete",
        address: "Brugge, België",
        phone: "+32 470 77 88 99",
        email: "mertens@example.com",
        projects: 1,
      },
      {
        name: "De Smet Groep",
        type: "Company",
        status: "In progress",
        address: "Leuven, België",
        phone: "+32 470 12 34 56",
        email: "office@desmetgroup.be",
        projects: 3,
      },
    ],
  },
};

export function getClientOverview(locale: Locale): ClientOverview {
  return overview[locale];
}
