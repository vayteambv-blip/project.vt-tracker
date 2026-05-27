"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { DocumentStoragePanel } from "@/components/document-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Документы",
    description: "Файлы проекта и фирмы с текущими версиями, архивными версиями и отправкой по email.",
    stats: [
      { label: "Текущих файлов", value: "24" },
      { label: "Архивных версий", value: "61" },
      { label: "Отправок по email", value: "12" },
      { label: "Шаблонов", value: "9" },
    ],
    rulesTitle: "Правила документов в работе",
    stepsTitle: "Следующие шаги разработки",
    back: "Назад к проектам",
    compare: "Сравнить компоновку файлов в примерочной",
    note:
      "Документы хранятся в контексте проекта или фирмы, а история версий сохраняется. Текущий файл всегда виден, а старые версии остаются как архивная история.",
    focusItems: [
      "Разделять файлы проекта и файлы фирмы.",
      "Показывать текущую версию и историю архива вместе.",
      "Разрешать открытие, скачивание, восстановление и отправку по email.",
      "Оставлять шаблоны нейтральными, чтобы они чисто начинали новый файл.",
    ],
    stepItems: [
      "Открыть список файлов из карточки проекта или фирмы.",
      "Проверить текущую версию и историю.",
      "Отправить файл по email, если нужно.",
      "Вернуть старую версию только тогда, когда это действительно необходимо.",
    ],
    entries: [
      {
        label: "Смета проекта",
        note: "Текущая версия плюс архивные копии.",
        kind: "Файл проекта",
      },
      {
        label: "Контракт фирмы",
        note: "Хранится в карточке фирмы с историей версий.",
        kind: "Файл фирмы",
      },
      {
        label: "Пакет фактуры",
        note: "Общая связка проекта и фирмы через финансовый поток.",
        kind: "Связанный документ",
      },
    ],
  },
  nl: {
    title: "Documenten",
    description:
      "Project- en bedrijfsbestanden met actuele versies, archiefversies en verzending via e-mail.",
    stats: [
      { label: "Actuele bestanden", value: "24" },
      { label: "Archiefversies", value: "61" },
      { label: "E-mail verzonden", value: "12" },
      { label: "Sjablonen", value: "9" },
    ],
    rulesTitle: "Documentregels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    back: "Terug naar projecten",
    compare: "Vergelijk bestandsindeling in de proefruimte",
    note:
      "Documenten leven binnen de context van project of bedrijf, en de versiegeschiedenis blijft bewaard. Het actuele bestand blijft zichtbaar, terwijl oude versies als archief blijven bestaan.",
    focusItems: [
      "Scheid projectbestanden van bedrijfsbestanden.",
      "Toon de actuele versie en de archiefgeschiedenis samen.",
      "Sta openen, downloaden, herstellen en e-mailen toe.",
      "Houd sjablonen neutraal zodat ze een nieuw bestand schoon starten.",
    ],
    stepItems: [
      "Open de bestandslijst vanuit de project- of bedrijfskaart.",
      "Controleer de actuele versie en de geschiedenis.",
      "Verstuur het bestand via e-mail indien nodig.",
      "Herstel een oude versie alleen wanneer het echt nodig is.",
    ],
    entries: [
      {
        label: "Projectofferte",
        note: "Actuele versie plus archiefkopieën.",
        kind: "Projectbestand",
      },
      {
        label: "Bedrijfscontract",
        note: "Wordt bewaard in de bedrijfskaart met versiegeschiedenis.",
        kind: "Bedrijfsbestand",
      },
      {
        label: "Factuurpakket",
        note: "Een gezamenlijke koppeling van project en bedrijf via de financiële stroom.",
        kind: "Gekoppeld document",
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
                <span className="direction">{locale === "ru" ? "документ" : "document"}</span>
              </div>
              <h3>{entry.label}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <h2>{locale === "ru" ? "Связь документов" : "Documentkoppeling"}</h2>
          <p className="entity-note">{copy.note}</p>
          <div className="panel-actions">
            <Link className="ghost-link" href="/projects">
              {copy.back}
            </Link>
          </div>
        </section>

        <DocumentStoragePanel />
      </section>
    </AppShell>
  );
}

