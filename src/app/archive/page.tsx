"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ArchiveStoragePanel } from "@/components/archive-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Архив",
    description: "Закрытые проекты с поиском по году, месяцу, клиенту и направлению.",
    stats: [
      { label: "Архивных проектов", value: "28" },
      { label: "За этот год", value: "9" },
      { label: "Готово к возврату", value: "4" },
      { label: "Пути поиска", value: "Год / клиент" },
    ],
    rulesTitle: "Правила архива в работе",
    stepsTitle: "Следующие шаги разработки",
    compare: "Сравнить компоновку архива в примерочной",
    back: "Назад к проектам",
    note:
      "Архив сохраняет проект как тот же самый проект. Он закрыт, но не потерян, и его можно вернуть вручную, когда работа продолжится.",
    focusItems: [
      "Архив остается отдельным от текущей работы.",
      "Возврат проекта сохраняет ту же историю.",
      "Архивные проекты остаются доступными для поиска.",
      "Архив должен ощущаться как закрытое, но читаемое состояние.",
    ],
    stepItems: [
      "Переносить завершенный проект в архив вручную.",
      "Искать его по году, месяцу, клиенту или направлению.",
      "Открывать закрытое состояние, если нужна старая история.",
      "Возвращать проект только тогда, когда работа должна продолжиться.",
    ],
    entries: [
      {
        label: "Строительство каркаса дома",
        note: "Закрытый проект с полностью сохраненной историей.",
        kind: "Архив",
      },
      {
        label: "Ремонт северной крыши",
        note: "Готов к возврату, если работа должна продолжиться.",
        kind: "Готов к возврату",
      },
      {
        label: "Ремонт фасада в Брюсселе",
        note: "Ищется по году, клиенту и направлению.",
        kind: "Архив",
      },
    ],
  },
  nl: {
    title: "Archief",
    description: "Afgesloten projecten met zoeken op jaar, maand, klant en richting.",
    stats: [
      { label: "Gearchiveerde projecten", value: "28" },
      { label: "Dit jaar", value: "9" },
      { label: "Klaar om terug te halen", value: "4" },
      { label: "Zoekpaden", value: "Jaar / klant" },
    ],
    rulesTitle: "Archiefregels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    compare: "Vergelijk archiefindeling in de proefruimte",
    back: "Terug naar projecten",
    note:
      "Het archief bewaart het project als hetzelfde project. Het is gesloten, maar niet verloren, en kan handmatig worden teruggehaald wanneer het werk doorgaat.",
    focusItems: [
      "Het archief blijft gescheiden van het huidige werk.",
      "Het terughalen van een project behoudt dezelfde geschiedenis.",
      "Gearchiveerde projecten blijven doorzoekbaar.",
      "Het archief moet voelen als een gesloten maar leesbare toestand.",
    ],
    stepItems: [
      "Verplaats een afgerond project handmatig naar het archief.",
      "Zoek het op jaar, maand, klant of richting.",
      "Open de gesloten toestand als de oude geschiedenis nodig is.",
      "Breng het project alleen terug wanneer het werk moet doorgaan.",
    ],
    entries: [
      {
        label: "Houtskeletbouw van het huis",
        note: "Gesloten project met volledig bewaarde geschiedenis.",
        kind: "Archief",
      },
      {
        label: "Renovatie van het noordelijke dak",
        note: "Klaar om terug te halen als het werk moet doorgaan.",
        kind: "Klaar om terug te halen",
      },
      {
        label: "Gevelherstel in Brussel",
        note: "Vindbaar op jaar, klant en richting.",
        kind: "Archief",
      },
    ],
  },
} as const;

export default function ArchivePage() {
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
                <span className="status status-archive">{entry.kind}</span>
                <span className="direction">{locale === "ru" ? "строка архива" : "archiefregel"}</span>
              </div>
              <h3>{entry.label}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <h2>{locale === "ru" ? "Связь с архивом" : "Archiefkoppeling"}</h2>
          <p className="entity-note">{copy.note}</p>
          <div className="panel-actions">
            <Link className="ghost-link" href="/projects">
              {copy.back}
            </Link>
          </div>
        </section>

        <ArchiveStoragePanel />
      </section>
    </AppShell>
  );
}
