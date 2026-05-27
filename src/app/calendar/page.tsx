"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { CalendarStoragePanel } from "@/components/calendar-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Календарь",
    description: "Планирование дат старта проекта, рабочих периодов и времени напоминаний.",
    stats: [
      { label: "Видимых проектов", value: "11" },
      { label: "С датой старта", value: "9" },
      { label: "На 7 дней вперед", value: "4" },
      { label: "В ожидании", value: "2" },
    ],
    focusTitle: "Правила календаря в работе",
    stepsTitle: "Следующие шаги разработки",
    back: "Назад к проектам",
    note:
      "Календарь показывает только проекты со стартом, а изменение даты в нем или в проекте должно оставаться синхронизированным.",
    entries: [
      {
        day: "Сегодня",
        name: "Ремонт северной крыши",
        note: "Текущий проект с синхронизированной датой старта и готовым отчетом.",
      },
      {
        day: "Завтра",
        name: "Ремонт фасада в Брюсселе",
        note: "Дата старта еще ждет финального подтверждения.",
      },
      {
        day: "На следующей неделе",
        name: "Отделка лофта",
        note: "Планируемый проект, который ждет активной фазы.",
      },
    ],
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
  },
  nl: {
    title: "Agenda",
    description: "Planning van startdata voor projecten, werkperiodes en herinneringstijden.",
    stats: [
      { label: "Zichtbare projecten", value: "11" },
      { label: "Met startdatum", value: "9" },
      { label: "Binnen 7 dagen", value: "4" },
      { label: "In afwachting", value: "2" },
    ],
    focusTitle: "Agenda regels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    back: "Terug naar projecten",
    note:
      "De agenda toont alleen projecten met een start; het wijzigen van die datum in de agenda of in het project moet gesynchroniseerd blijven.",
    entries: [
      {
        day: "Vandaag",
        name: "Renovatie van het noordelijke dak",
        note: "Lopend project met gesynchroniseerde startdatum en klaar voortgangsrapport.",
      },
      {
        day: "Morgen",
        name: "Gevelherstel in Brussel",
        note: "De startdatum wacht nog op de definitieve bevestiging.",
      },
      {
        day: "Volgende week",
        name: "Loftafwerking",
        note: "Gepland project dat wacht op de actieve fase.",
      },
    ],
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
  },
} as const;

export default function CalendarPage() {
  const { locale } = useLocale();
  const copy = content[locale];

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          {copy.stats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>{copy.focusTitle}</h2>
            <ul className="check-list">
              {copy.focusItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>{copy.stepsTitle}</h2>
            <ol className="bullet-list">
              {copy.stepItems.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="panel-actions">
              <Link className="ghost-link" href="/preview">
                {copy.openPreview}
              </Link>
            </div>
          </article>
        </section>

        <section className="project-grid">
          {copy.entries.map((entry) => (
            <article className="project-card" key={entry.name}>
              <div className="project-topline">
                <span className="status status-current">{entry.day}</span>
                <span className="direction">{locale === "ru" ? "строка календаря" : "agendaregel"}</span>
              </div>
              <h3>{entry.name}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <p className="entity-note">{copy.note}</p>
          <div className="panel-actions">
            <Link className="ghost-link" href="/projects">
              {copy.back}
            </Link>
          </div>
        </section>

        <CalendarStoragePanel />
      </section>
    </AppShell>
  );
}
