"use client";

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

        <ReportStoragePanel />
      </section>
    </AppShell>
  );
}

