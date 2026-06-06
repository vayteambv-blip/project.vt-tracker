"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PreviewStoragePanel } from "@/components/preview-storage-panel";
import { PreviewStorageSummary } from "@/components/preview-storage-summary";
import { useLocale } from "@/components/locale-provider";
import { getPrimarySections } from "@/lib/site-map";

const content = {
  ru: {
    title: "Примерочная",
    description:
      "Отдельная рабочая зона для проверки и сравнения основных областей проекта перед изменением живых экранов.",
    metrics: [
      { label: "Режим", value: "Сначала примерочная" },
      { label: "Ключевых зон", value: "8" },
      { label: "Хранилище", value: "Включено" },
      { label: "Цель", value: "localhost" },
    ],
    panelTitle: "Проверяй здесь до изменения основных экранов.",
    panelText:
      "Эта страница — локальная примерочная для компоновки, поведения и хранения черновиков. Используй ее, чтобы сравнить разделы приложения перед переносом изменений в основной поток.",
    compare: "Назад к обзору",
    openProjects: "Открыть проекты",
    testTitle: "Как тестировать",
    rulesTitle: "Правила примерочной",
    separateTitle: "Что остается отдельно",
    keysTitle: "Восемь ключевых зон для проверки",
    quickTitle: "Быстрый доступ",
    rules: [
      "Сначала используй эту страницу для проверки компоновки и поведения.",
      "Держи основные экраны чистыми и сравнивай изменения здесь.",
      "Сохраняй черновики в браузерное хранилище перед переносом.",
      "Проверяй полный путь пользователя по основным зонам проекта.",
    ],
    steps: [
      "Сначала открой примерочную и проверь обзорные карточки.",
      "Сохрани по одному черновику в каждой ключевой зоне.",
      "Обнови браузер и проверь, что черновик остался.",
      "Открой соответствующий основной экран, если нужно сравнить компоновку.",
      "Проверь пустые состояния, подписи и читаемые отступы.",
    ],
    separate: [
      "Основные экраны остаются чистыми и сфокусированными.",
      "Изменения примерочной сравниваются перед копированием.",
      "В основной поток попадают только одобренные версии.",
      "Эта комната нужна для тестирования, а не для лишней логики.",
    ],
    areas: [
      {
        title: "1. Проекты",
        href: "/projects",
        note: "Центральная сущность, локальное сохранение, карточки черновиков и статус.",
      },
      {
        title: "2. Клиенты",
        href: "/clients",
        note: "Черновики клиентов, полнота, контакты и связанные проекты.",
      },
      {
        title: "3. Субподрядчики",
        href: "/firms",
        note: "Черновики субподрядчиков, рабочие, роли и оплата через расходы проекта.",
      },
      {
        title: "4. Календарь",
        href: "/calendar",
        note: "Даты старта и строки расписания с тестом браузерного хранения.",
      },
      {
        title: "5. Финансы",
        href: "/finances",
        note: "Расходы, прибыль и связанный поток оплат субподрядчикам.",
      },
      {
        title: "6. Документы",
        href: "/documents",
        note: "Текущие версии, архивные версии и контекст документа.",
      },
      {
        title: "7. Отчеты",
        href: "/reports",
        note: "Отчеты о ходе работ с заголовками, фото и датами.",
      },
      {
        title: "8. Архив",
        href: "/archive",
        note: "Закрытые проекты с поиском и возможностью восстановления.",
      },
    ],
    opened: "Открыть",
  },
  nl: {
    title: "Proefruimte",
    description:
      "Een aparte werkzone om de belangrijkste delen van het project te controleren en te vergelijken vóór je wijzigingen naar de live schermen brengt.",
    metrics: [
      { label: "Modus", value: "Eerst proefruimte" },
      { label: "Kernzones", value: "8" },
      { label: "Opslag", value: "Ingeschakeld" },
      { label: "Doel", value: "localhost" },
    ],
    panelTitle: "Controleer hier vóór je de hoofdschermen wijzigt.",
    panelText:
      "Deze pagina is de lokale proefruimte voor indeling, gedrag en conceptopslag. Gebruik haar om secties te vergelijken vóór je wijzigingen naar de hoofdflow verplaatst.",
    compare: "Terug naar overzicht",
    openProjects: "Open projecten",
    testTitle: "Hoe testen",
    rulesTitle: "Proefruimteregels",
    separateTitle: "Wat apart blijft",
    keysTitle: "Acht kernzones om te controleren",
    quickTitle: "Snelle toegang",
    rules: [
      "Gebruik deze pagina eerst om indeling en gedrag te controleren.",
      "Houd de hoofdschermen schoon en vergelijk wijzigingen hier.",
      "Bewaar concepten in de browseropslag vóór je iets verplaatst.",
      "Controleer de volledige gebruikersroute over de belangrijkste zones van het project.",
    ],
    steps: [
      "Open eerst de proefruimte en controleer de overzichtskaarten.",
      "Sla in elke kernzone één concept op.",
      "Ververs de browser en controleer of het concept bewaard is.",
      "Open het overeenkomstige hoofdscherm als je de indeling wilt vergelijken.",
      "Controleer lege staten, labels en leesbare afstanden.",
    ],
    separate: [
      "De hoofdschermen blijven schoon en gefocust.",
      "Wijzigingen in de proefruimte worden vóór kopiëren vergeleken.",
      "Alleen goedgekeurde versies gaan naar de hoofdflow.",
      "Deze ruimte is bedoeld om te testen, niet voor extra logica.",
    ],
    areas: [
      {
        title: "1. Projecten",
        href: "/projects",
        note: "Centrale entiteit, lokale opslag, conceptkaarten en status.",
      },
      {
        title: "2. Klanten",
        href: "/clients",
        note: "Klantconcepten, volledigheid, contactgegevens en gekoppelde projecten.",
      },
      {
        title: "3. Onderaannemers",
        href: "/firms",
        note: "Concepten voor onderaannemers, werknemers, rollen en betaling via projectkosten.",
      },
      {
        title: "4. Agenda",
        href: "/calendar",
        note: "Startdata en roosterregels met browseropslagtest.",
      },
      {
        title: "5. Financiën",
        href: "/finances",
        note: "Kosten, winst en de gekoppelde betaalstroom van onderaannemers.",
      },
      {
        title: "6. Documenten",
        href: "/documents",
        note: "Actuele versies, archiefversies en documentcontext.",
      },
      {
        title: "7. Rapporten",
        href: "/reports",
        note: "Voortgangsrapporten met titels, foto's en data.",
      },
      {
        title: "8. Archief",
        href: "/archive",
        note: "Afgesloten projecten met zoeken en herstelmogelijkheid.",
      },
    ],
    opened: "Open",
  },
} as const;

export default function PreviewPage() {
  const { locale } = useLocale();
  const copy = content[locale];
  const sections = getPrimarySections(locale);

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard preview-dashboard">
        <div className="summary-grid">
          {copy.metrics.map((metric) => (
            <article className="summary-card" key={metric.label}>
              <div className="label">{metric.label}</div>
              <div className="metric">{metric.value}</div>
            </article>
          ))}
        </div>

        <PreviewStorageSummary />
        <PreviewStoragePanel />

        <section className="panel">
          <h2>{copy.keysTitle}</h2>
          <div className="entity-grid">
            {copy.areas.map((area) => (
              <article className="entity-card" key={area.href}>
                <div className="entity-topline">
                  <span className="status status-current">{locale === "ru" ? "Готово" : "Klaar"}</span>
                  <span className="direction">{area.title}</span>
                </div>
                <h3>{area.title}</h3>
                <p className="entity-note">{area.note}</p>
                <div className="panel-actions">
                  <Link className="ghost-link" href={area.href}>
                    {copy.opened} {area.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>{copy.quickTitle}</h2>
          <div className="panel-actions preview-links">
            <Link className="ghost-link" href="/">
              {copy.compare}
            </Link>
            <Link className="ghost-link" href="/projects">
              {copy.openProjects}
            </Link>
            {sections.map((section) => (
              <Link key={section.href} className="ghost-link" href={section.href}>
                {section.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}

