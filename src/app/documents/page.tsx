"use client";

import { AppShell } from "@/components/app-shell";
import { DocumentStoragePanel } from "@/components/document-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Документы",
    description: "Текущие записи документов проекта, субподрядчика и связанных файлов.",
    stats: [
      { label: "Записей", value: "24" },
      { label: "Контекстов", value: "3" },
      { label: "Поля записи", value: "4" },
      { label: "Черновиков", value: "0" },
    ],
    entries: [
      {
        label: "Смета проекта",
        note: "Запись с контекстом проекта и номером версии.",
        kind: "Файл проекта",
      },
      {
        label: "Запись субподрядчика",
        note: "Запись с контекстом субподрядчика и заметкой.",
        kind: "Файл субподрядчика",
      },
      {
        label: "Связанная запись",
        note: "Отдельный контекст для связанных документов.",
        kind: "Связанный файл",
      },
    ],
  },
  nl: {
    title: "Documenten",
    description: "Actuele documentregels voor projecten, onderaannemers en gekoppelde bestanden.",
    stats: [
      { label: "Regels", value: "24" },
      { label: "Contexten", value: "3" },
      { label: "Velden per regel", value: "4" },
      { label: "Concepten", value: "0" },
    ],
    entries: [
      {
        label: "Projectofferte",
        note: "Een regel met projectcontext en versienummer.",
        kind: "Projectbestand",
      },
      {
        label: "Onderaannemersregel",
        note: "Een regel met context van de onderaannemer en notitie.",
        kind: "Onderaannemersbestand",
      },
      {
        label: "Gekoppelde regel",
        note: "Een aparte context voor gekoppelde documenten.",
        kind: "Gekoppeld bestand",
      },
    ],
  },
} as const;

export default function DocumentsPage() {
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
                <span className="direction">{locale === "ru" ? "документ" : "document"}</span>
              </div>
              <h3>{entry.label}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <DocumentStoragePanel />
      </section>
    </AppShell>
  );
}

