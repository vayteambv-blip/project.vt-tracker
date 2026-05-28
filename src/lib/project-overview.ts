import type { Locale } from "@/lib/locale";

export type ProjectCard = {
  name: string;
  direction: string;
  status: "Draft" | "Ready" | "Active" | "Archive";
  client: string;
  startDate: string;
  subcontractors: string[];
  note: string;
};

type ProjectOverview = {
  projectStats: Array<{ label: string; value: string }>;
  projectCards: ProjectCard[];
  projectFlowSteps: string[];
};

const overview: Record<Locale, ProjectOverview> = {
  ru: {
    projectStats: [
      { label: "Проекты в фокусе", value: "12" },
      { label: "Готово к работе", value: "4" },
      { label: "Ждут смету", value: "3" },
      { label: "В архиве", value: "28" },
    ],
    projectCards: [
      {
        name: "Ремонт северной крыши",
        direction: "Крыша",
        status: "Active",
        client: "Семья Брауэрс",
        startDate: "27.05.2026",
        subcontractors: ["Кровля Плюс", "Северный лес"],
        note: "Дата старта синхронизирована с календарем, открыт отчет о ходе работ.",
      },
      {
        name: "Ремонт фасада в Брюсселе",
        direction: "Фасад",
        status: "Ready",
        client: "Van Dijk Properties",
        startDate: "В ожидании",
        subcontractors: ["Стальной фикс", "СкайЛифт"],
        note: "Смета одобрена, ждем финальную дату старта.",
      },
      {
        name: "Отделка лофта",
        direction: "Интерьер",
        status: "Draft",
        client: "Резиденция Мертенс",
        startDate: "12.06.2026",
        subcontractors: ["Городской мастер"],
        note: "Список материалов и архив документов уже привязаны.",
      },
      {
        name: "Строительство каркаса дома",
        direction: "Общее строительство",
        status: "Archive",
        client: "Группа Де Смет",
        startDate: "Закрыт",
        subcontractors: ["Каркас", "Бетон Плюс"],
        note: "Заархивирован как полностью закрытый проект с сохраненной историей версий.",
      },
    ],
    projectFlowSteps: [
      "Создать проект и проверить основные данные.",
      "Привязать клиента, субподрядчиков, даты и смету.",
      "Синхронизировать дату старта с календарем.",
      "Добавить документы, фото, отчеты и материалы.",
      "Сохранять расходы и итог в финансах проекта.",
      "Перенести завершенный проект в архив и при необходимости вернуть его обратно.",
    ],
  },
  nl: {
    projectStats: [
      { label: "Projecten in focus", value: "12" },
      { label: "Klaar voor werk", value: "4" },
      { label: "Wachten op offerte", value: "3" },
      { label: "In archief", value: "28" },
    ],
    projectCards: [
      {
        name: "Renovatie van het noordelijke dak",
        direction: "Dak",
        status: "Active",
        client: "Familie Brouwers",
        startDate: "27-05-2026",
        subcontractors: ["DakPlus", "Noord Hout"],
        note: "De startdatum is gesynchroniseerd met de agenda en het voortgangsrapport is geopend.",
      },
      {
        name: "Gevelherstel in Brussel",
        direction: "Gevel",
        status: "Ready",
        client: "Van Dijk Properties",
        startDate: "In afwachting",
        subcontractors: ["StaalFix", "LuchtLift"],
        note: "De offerte is goedgekeurd; we wachten op de definitieve startdatum.",
      },
      {
        name: "Loftafwerking",
        direction: "Interieur",
        status: "Draft",
        client: "Mertens Residentie",
        startDate: "12-06-2026",
        subcontractors: ["Stedelijk Vakwerk"],
        note: "De materiaallijst en het documentarchief zijn al gekoppeld.",
      },
      {
        name: "Houtskeletbouw van het huis",
        direction: "Algemene bouw",
        status: "Archive",
        client: "De Smet Groep",
        startDate: "Gesloten",
        subcontractors: ["Raamwerk", "BetonPlus"],
        note: "Gearchiveerd als volledig afgerond project met bewaarde versiegeschiedenis.",
      },
    ],
    projectFlowSteps: [
      "Maak een project aan en controleer de basisgegevens.",
      "Koppel klant, onderaannemers, data en offerte.",
      "Synchroniseer de startdatum met de agenda.",
      "Voeg documenten, foto's, rapporten en materialen toe.",
      "Bewaar kosten en het resultaat in de projectfinanciën.",
      "Verplaats het afgeronde project naar het archief en haal het indien nodig terug.",
    ],
  },
};

export function getProjectOverview(locale: Locale): ProjectOverview {
  return overview[locale];
}
