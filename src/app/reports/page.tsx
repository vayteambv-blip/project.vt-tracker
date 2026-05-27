"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ReportStoragePanel } from "@/components/report-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Отчеты",
    description: "Отчеты о ходе проекта с заголовком, текстом, фото и датой создания.",
    stats: [
      { label: "Активных отчетов", value: "13" },
      { label: "С фото", value: "11" },
      { label: "Отредактировано сегодня", value: "2" },
      { label: "Сортировка по дате", value: "Да" },
    ],
    rulesTitle: "Правила отчетов в работе",
    stepsTitle: "Следующие шаги разработки",
    compare: "Сравнить компоновку отчетов в примерочной",
    back: "Назад к проектам",
    note:
      "Отчеты остаются привязанными к проекту и сортируются по дате создания. Фото в отчетах держатся отдельно от стартовых фото и фото процесса.",
    focusItems: [
      "Отчеты принадлежат проекту.",
      "Каждому отчету нужны заголовок, текст и фото.",
      "Отчеты сортируются по дате создания.",
      "Открытие, редактирование и удаление должны оставаться простыми.",
    ],
    stepItems: [
      "Создать отчет из карточки проекта.",
      "Добавить заголовок, текст и фото.",
      "Проверить порядок по дате создания.",
      "Открыть отчет снова, чтобы обновить его позже.",
    ],
    entries: [
      {
        label: "Ход крыши",
        note: "Обновление с фото и короткими полевыми заметками.",
        kind: "Отчет о ходе",
      },
      {
        label: "Этап фасада",
        note: "Видны дата создания и история изменений.",
        kind: "Отчет проекта",
      },
      {
        label: "Завершение интерьера",
        note: "Финальный отчет, готовый для архива.",
        kind: "Закрывающий отчет",
      },
    ],
  },
  nl: {
    title: "Rapporten",
    description: "Voortgangsrapporten met titel, tekst, foto's en aanmaakdatum.",
    stats: [
      { label: "Actieve rapporten", value: "13" },
      { label: "Met foto's", value: "11" },
      { label: "Vandaag bewerkt", value: "2" },
      { label: "Sorteer op datum", value: "Ja" },
    ],
    rulesTitle: "Rapportregels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    compare: "Vergelijk rapportindeling in de proefruimte",
    back: "Terug naar projecten",
    note:
      "Rapporten blijven gekoppeld aan het project en worden gesorteerd op aanmaakdatum. Foto's in rapporten blijven apart van startfoto's en procesfoto's.",
    focusItems: [
      "Rapporten horen bij het project.",
      "Elk rapport heeft een titel, tekst en foto's nodig.",
      "Rapporten worden gesorteerd op aanmaakdatum.",
      "Openen, bewerken en verwijderen moeten simpel blijven.",
    ],
    stepItems: [
      "Maak een rapport vanuit de projectkaart.",
      "Voeg titel, tekst en foto's toe.",
      "Controleer de volgorde op aanmaakdatum.",
      "Open het rapport opnieuw om het later bij te werken.",
    ],
    entries: [
      {
        label: "Dakvoortgang",
        note: "Update met foto's en korte veldnotities.",
        kind: "Voortgangsrapport",
      },
      {
        label: "Gevellefase",
        note: "Aanmaakdatum en wijzigingsgeschiedenis zijn zichtbaar.",
        kind: "Projectrapport",
      },
      {
        label: "Interieurafwerking",
        note: "Definitief rapport, klaar voor het archief.",
        kind: "Afsluitend rapport",
      },
    ],
  },
} as const;

export default function ReportsPage() {
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
            <h2>{copy.rulesTitle}</h2>
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
                {copy.compare}
              </Link>
            </div>
          </article>
        </section>

        <section className="project-grid">
          {copy.entries.map((entry) => (
            <article className="project-card" key={entry.label}>
              <div className="project-topline">
                <span className="status status-current">{entry.kind}</span>
                <span className="direction">{locale === "ru" ? "отчет" : "rapport"}</span>
              </div>
              <h3>{entry.label}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <h2>{locale === "ru" ? "Связь отчетов" : "Rapportkoppeling"}</h2>
          <p className="entity-note">{copy.note}</p>
          <div className="panel-actions">
            <Link className="ghost-link" href="/projects">
              {copy.back}
            </Link>
          </div>
        </section>

        <ReportStoragePanel />
      </section>
    </AppShell>
  );
}

