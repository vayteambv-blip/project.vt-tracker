import type { Locale } from "@/lib/locale";

export type SiteSection = {
  label: string;
  href: string;
  summary: string;
};

const sections: Record<Locale, SiteSection[]> = {
  ru: [
    {
      label: "Клиенты",
      href: "/clients",
      summary: "Частные клиенты и фирмы-заказчики с привязкой к проектам.",
    },
    {
      label: "Фирмы",
      href: "/firms",
      summary: "Субподрядчики, рабочие, контракты и файлы фирмы.",
    },
    {
      label: "Проекты",
      href: "/projects",
      summary: "Основа проекта, даты старта, фирмы, документы, фото и финансы.",
    },
    {
      label: "Календарь",
      href: "/calendar",
      summary: "Планирование дат старта и ближайших работ.",
    },
    {
      label: "Финансы",
      href: "/finances",
      summary: "Расходы, фактура, прибыль и оплаты фирм.",
    },
    {
      label: "Документы",
      href: "/documents",
      summary: "Текущие файлы, архивные версии и шаблоны.",
    },
    {
      label: "Отчеты",
      href: "/reports",
      summary: "Отчеты по ходу работ с текстом, датами и фото.",
    },
    {
      label: "Архив",
      href: "/archive",
      summary: "Закрытые проекты с поиском по году и клиенту.",
    },
    {
      label: "Примерочная",
      href: "/preview",
      summary: "Отдельная комната для проверки дизайна и разработки.",
    },
  ],
  nl: [
    {
      label: "Klanten",
      href: "/clients",
      summary: "Particuliere klanten en opdrachtgevers die aan projecten gekoppeld zijn.",
    },
    {
      label: "Bedrijven",
      href: "/firms",
      summary: "Onderaannemers, vakmensen, contracten en bedrijfsbestanden.",
    },
    {
      label: "Projecten",
      href: "/projects",
      summary: "De kern van het project: startdata, bedrijven, documenten, foto's en financiën.",
    },
    {
      label: "Agenda",
      href: "/calendar",
      summary: "Planning van startdata en aankomende werkzaamheden.",
    },
    {
      label: "Financiën",
      href: "/finances",
      summary: "Kosten, factuur, winst en betalingen aan bedrijven.",
    },
    {
      label: "Documenten",
      href: "/documents",
      summary: "Actuele bestanden, archiefversies en sjablonen.",
    },
    {
      label: "Rapporten",
      href: "/reports",
      summary: "Rapporten over de voortgang met tekst, data en foto's.",
    },
    {
      label: "Archief",
      href: "/archive",
      summary: "Afgesloten projecten met zoeken op jaar en klant.",
    },
    {
      label: "Proefruimte",
      href: "/preview",
      summary: "Een aparte ruimte om ontwerp en ontwikkeling te controleren.",
    },
  ],
};

const flow: Record<Locale, string[]> = {
  ru: [
    "Создать или открыть проект.",
    "Проверить клиента, адрес, смету и контакты.",
    "Назначить дату старта и показать проект в календаре.",
    "Добавить фирмы, документы, фото, отчеты и материалы.",
    "Отслеживать расходы и итог в финансах.",
    "Закрыть проект и при необходимости вернуть его из архива.",
    "Сравнить изменения в примерочной перед переносом на основные экраны.",
  ],
  nl: [
    "Maak een project aan of open een bestaand project.",
    "Controleer de klant, het adres, de offerte en de contactgegevens.",
    "Stel de startdatum in en toon het project in de agenda.",
    "Voeg bedrijven, documenten, foto's, rapporten en materialen toe.",
    "Volg kosten en het resultaat in de financiën.",
    "Sluit het project af en haal het indien nodig terug uit het archief.",
    "Vergelijk wijzigingen in de proefruimte voordat ze naar de hoofdschermen gaan.",
  ],
};

export function getPrimarySections(locale: Locale): SiteSection[] {
  return sections[locale];
}

export function getProjectFlow(locale: Locale): string[] {
  return flow[locale];
}
