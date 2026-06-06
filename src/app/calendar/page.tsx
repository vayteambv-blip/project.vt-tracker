"use client";

import { AppShell } from "@/components/app-shell";
import { CalendarStoragePanel } from "@/components/calendar-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { buildCalendarItemsFromProjects, useWorkspaceSelector } from "@/lib/workspace-store";

const calendarStatusLabel = {
  ru: {
    Today: "Сегодня",
    Tomorrow: "Завтра",
    "Next week": "На следующей неделе",
    Waiting: "В ожидании",
  },
  nl: {
    Today: "Vandaag",
    Tomorrow: "Morgen",
    "Next week": "Volgende week",
    Waiting: "In afwachting",
  },
} as const;

const content = {
  ru: {
    title: "Календарь",
    description: "Планирование дат старта проектов, рабочих периодов и времени напоминаний.",
    focusTitle: "Правила календаря в работе",
    stepsTitle: "Следующие шаги разработки",
    back: "Назад к проектам",
    note:
      "Календарь показывает только проекты со стартом, а изменение даты в нём или в проекте должно оставаться синхронизированным.",
    focusItems: [
      "Показывать только проекты, а не отдельные задачи.",
      "Держать дату старта синхронизированной с проектом.",
      "Не показывать проект без даты старта.",
      "Использовать календарь только как планировщик дат и напоминаний.",
    ],
    stepItems: [
      "Открыть календарный вид проекта.",
      "Проверить, что дата старта совпадает с проектом.",
      "Посмотреть ближайшие дни и статусы.",
      "Сравнить календарь с примерочной, если меняется компоновка.",
    ],
    openPreview: "Сравнить календарную компоновку в примерочной",
    stats: [
      { label: "Видимых проектов", value: "0" },
      { label: "С датой старта", value: "0" },
      { label: "На 7 дней вперед", value: "0" },
      { label: "В ожидании", value: "0" },
    ],
  },
  nl: {
    title: "Agenda",
    description: "Planning van startdata voor projecten, werkperiodes en herinneringstijden.",
    focusTitle: "Agenda regels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    back: "Terug naar projecten",
    note:
      "De agenda toont alleen projecten met een start; het wijzigen van die datum in de agenda of in het project moet gesynchroniseerd blijven.",
    focusItems: [
      "Toon alleen projecten en geen losse taken.",
      "Houd de startdatum gesynchroniseerd met het project.",
      "Toon geen project zonder startdatum.",
      "Gebruik de agenda alleen als planner voor data en herinneringen.",
    ],
    stepItems: [
      "Open de agendaweergave van het project.",
      "Controleer of de startdatum overeenkomt met het project.",
      "Bekijk de komende dagen en statussen.",
      "Vergelijk de agenda met de proefruimte als de indeling wijzigt.",
    ],
    openPreview: "Vergelijk agenda-indeling in de proefruimte",
    stats: [
      { label: "Zichtbare projecten", value: "0" },
      { label: "Met startdatum", value: "0" },
      { label: "Binnen 7 dagen", value: "0" },
      { label: "In afwachting", value: "0" },
    ],
  },
} as const;

export default function CalendarPage() {
  const { locale } = useLocale();
  const workspace = useWorkspaceSelector((snapshot) => snapshot);
  const copy = content[locale];
  const items = buildCalendarItemsFromProjects(workspace.projects, workspace.calendar);
  const visibleCount = items.length;
  const withStartDate = items.filter((item) => item.startDate.trim().length > 0).length;
  const nextWeekCount = items.filter((item) => item.status !== "Waiting").length;
  const waitingCount = items.filter((item) => item.status === "Waiting").length;

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          <article className="summary-card">
            <div className="label">{copy.stats[0].label}</div>
            <div className="metric">{visibleCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[1].label}</div>
            <div className="metric">{withStartDate}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[2].label}</div>
            <div className="metric">{nextWeekCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[3].label}</div>
            <div className="metric">{waitingCount}</div>
          </article>
        </div>

        <section className="project-grid">
          {items.length === 0 ? (
            <article className="project-card">
              <h3>{locale === "ru" ? "Пока нет проектов со стартом" : "Nog geen projecten met startdatum"}</h3>
              <p className="project-note">{copy.note}</p>
            </article>
          ) : (
            items.map((item) => (
              <article className="project-card" key={item.id}>
                <div className="project-topline">
                  <span className="status status-current">{calendarStatusLabel[locale][item.status]}</span>
                  <span className="direction">{item.direction || (locale === "ru" ? "без направления" : "zonder richting")}</span>
                </div>
                <h3>{item.name}</h3>
                <p className="project-note">{item.note}</p>
                <dl className="project-meta">
                  <div>
                    <dt>{locale === "ru" ? "Дата старта" : "Startdatum"}</dt>
                    <dd>{item.startDate}</dd>
                  </div>
                </dl>
              </article>
            ))
          )}
        </section>

        <CalendarStoragePanel />
      </section>
    </AppShell>
  );
}
