"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ArchiveStoragePanel } from "@/components/archive-storage-panel";
import { useLocale } from "@/components/locale-provider";

type ArchiveSection = "roof" | "facade" | "interior" | "construction";
type ArchiveStatus = "archive" | "return";
type FilterValue = "all" | string;

type ArchiveEntry = {
  title: string;
  year: string;
  month: string;
  section: ArchiveSection;
  client: string;
  direction: string;
  note: string;
  status: ArchiveStatus;
};

const currentYear = String(new Date().getFullYear());
const previousYear = String(new Date().getFullYear() - 1);

const archiveEntries: ArchiveEntry[] = [
  {
    title: "Строительство каркаса дома",
    year: previousYear,
    month: "11",
    section: "construction",
    client: "Группа Де Смет",
    direction: "Общее строительство",
    note: "Закрытый проект с полностью сохраненной историей и готовым поиском по клиенту.",
    status: "archive",
  },
  {
    title: "Ремонт северной крыши",
    year: currentYear,
    month: "05",
    section: "roof",
    client: "Семья Брауэрс",
    direction: "Крыша",
    note: "Готов к возврату, если работа должна продолжиться в том же проекте.",
    status: "return",
  },
  {
    title: "Ремонт фасада в Брюсселе",
    year: currentYear,
    month: "04",
    section: "facade",
    client: "Van Dijk Properties",
    direction: "Фасад",
    note: "Архивная строка для поиска по месяцу, разделу и клиенту.",
    status: "archive",
  },
  {
    title: "Отделка лофта",
    year: currentYear,
    month: "01",
    section: "interior",
    client: "Резиденция Мертенс",
    direction: "Интерьер",
    note: "Сохраненный проект, который можно быстро открыть по направлению работ.",
    status: "archive",
  },
];

const sectionOptions = ["roof", "facade", "interior", "construction"] as const;
const monthOptions = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const;

const content = {
  ru: {
    title: "Архив",
    description: "Закрытые проекты с поиском по году, месяцу, клиенту и направлению.",
    stats: [
      { label: "Архивных проектов", value: "28" },
      { label: "За этот год", value: "9" },
      { label: "Готово к возврату", value: "4" },
      { label: "Пути поиска", value: "Год / месяц / клиент" },
    ],
    rulesTitle: "Правила архива в работе",
    stepsTitle: "Следующие шаги разработки",
    compare: "Сравнить компоновку архива в примерочной",
    back: "Назад к проектам",
    filtersTitle: "Поиск по архиву",
    yearLabel: "Год",
    monthLabel: "Месяц",
    sectionLabel: "Раздел",
    clientLabel: "Клиент",
    resetFilters: "Сбросить фильтры",
    resultsLabel: "Найдено проектов",
    emptyTitle: "Ничего не найдено",
    emptyText: "Попробуй другой год, месяц, раздел или клиента.",
    allYears: "Все годы",
    allMonths: "Все месяцы",
    allSections: "Все разделы",
    ready: "Готов к возврату",
    archiveTag: "Архив",
    sectionNames: {
      roof: "Крыша",
      facade: "Фасад",
      interior: "Внутриотделочные работы",
      construction: "Черновая стройка",
    },
    monthNames: {
      "01": "Январь",
      "02": "Февраль",
      "03": "Март",
      "04": "Апрель",
      "05": "Май",
      "06": "Июнь",
      "07": "Июль",
      "08": "Август",
      "09": "Сентябрь",
      "10": "Октябрь",
      "11": "Ноябрь",
      "12": "Декабрь",
    },
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
    archiveSearch: "Архивный поиск",
  },
  nl: {
    title: "Archief",
    description: "Afgesloten projecten met zoeken op jaar, maand, klant en richting.",
    stats: [
      { label: "Gearchiveerde projecten", value: "28" },
      { label: "Dit jaar", value: "9" },
      { label: "Klaar om terug te halen", value: "4" },
      { label: "Zoekpaden", value: "Jaar / maand / klant" },
    ],
    rulesTitle: "Archiefregels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    compare: "Vergelijk archiefindeling in de proefruimte",
    back: "Terug naar projecten",
    filtersTitle: "Zoeken in archief",
    yearLabel: "Jaar",
    monthLabel: "Maand",
    sectionLabel: "Onderdeel",
    clientLabel: "Klant",
    resetFilters: "Filters wissen",
    resultsLabel: "Gevonden projecten",
    emptyTitle: "Niets gevonden",
    emptyText: "Probeer een ander jaar, maand, onderdeel of klant.",
    allYears: "Alle jaren",
    allMonths: "Alle maanden",
    allSections: "Alle onderdelen",
    ready: "Klaar om terug te halen",
    archiveTag: "Archief",
    sectionNames: {
      roof: "Dak",
      facade: "Gevel",
      interior: "Binnenafwerking",
      construction: "Algemene bouw",
    },
    monthNames: {
      "01": "Januari",
      "02": "Februari",
      "03": "Maart",
      "04": "April",
      "05": "Mei",
      "06": "Juni",
      "07": "Juli",
      "08": "Augustus",
      "09": "September",
      "10": "Oktober",
      "11": "November",
      "12": "December",
    },
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
    archiveSearch: "Archiefzoekopdracht",
  },
} as const;

export default function ArchivePage() {
  const { locale } = useLocale();
  const copy = content[locale];
  const [yearFilter, setYearFilter] = useState<FilterValue>(currentYear);
  const [monthFilter, setMonthFilter] = useState<FilterValue>("all");
  const [sectionFilter, setSectionFilter] = useState<FilterValue>("all");
  const [clientFilter, setClientFilter] = useState("");

  const years = useMemo(
    () => Array.from(new Set(archiveEntries.map((entry) => entry.year))).sort((a, b) => b.localeCompare(a)),
    [],
  );

  const filteredEntries = useMemo(
    () =>
      archiveEntries.filter((entry) => {
        const matchesYear = yearFilter === "all" || entry.year === yearFilter;
        const matchesMonth = monthFilter === "all" || entry.month === monthFilter;
        const matchesSection = sectionFilter === "all" || entry.section === sectionFilter;
        const matchesClient =
          clientFilter.trim() === "" ||
          entry.client.toLowerCase().includes(clientFilter.trim().toLowerCase());

        return matchesYear && matchesMonth && matchesSection && matchesClient;
      }),
    [clientFilter, monthFilter, sectionFilter, yearFilter],
  );

  const resetFilters = () => {
    setYearFilter(currentYear);
    setMonthFilter("all");
    setSectionFilter("all");
    setClientFilter("");
  };

  const archivedCount = archiveEntries.length;
  const thisYearCount = archiveEntries.filter((entry) => entry.year === currentYear).length;
  const returnCount = archiveEntries.filter((entry) => entry.status === "return").length;

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          <article className="summary-card">
            <div className="label">{copy.stats[0].label}</div>
            <div className="metric">{archivedCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[1].label}</div>
            <div className="metric">{thisYearCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[2].label}</div>
            <div className="metric">{returnCount}</div>
          </article>
          <article className="summary-card">
            <div className="label">{copy.stats[3].label}</div>
            <div className="metric">{copy.stats[3].value}</div>
          </article>
        </div>

        <section className="panel">
          <h2>{copy.filtersTitle}</h2>
          <div className="archive-filters">
            <label className="field">
              <span>{copy.yearLabel}</span>
              <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
                <option value="all">{copy.allYears}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{copy.monthLabel}</span>
              <select value={monthFilter} onChange={(event) => setMonthFilter(event.target.value)}>
                <option value="all">{copy.allMonths}</option>
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    {copy.monthNames[month]}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{copy.sectionLabel}</span>
              <select value={sectionFilter} onChange={(event) => setSectionFilter(event.target.value)}>
                <option value="all">{copy.allSections}</option>
                {sectionOptions.map((section) => (
                  <option key={section} value={section}>
                    {copy.sectionNames[section]}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{copy.clientLabel}</span>
              <input
                value={clientFilter}
                onChange={(event) => setClientFilter(event.target.value)}
                placeholder={locale === "ru" ? "Например: Семья Брауэрс" : "Bijvoorbeeld: Familie Brouwers"}
              />
            </label>
          </div>

          <div className="panel-actions">
            <button className="ghost-button" type="button" onClick={resetFilters}>
              {copy.resetFilters}
            </button>
          </div>

          <div className="draft-status archive-status">
            <div>
              <span className="label">{copy.resultsLabel}</span>
              <div className="metric">{filteredEntries.length}</div>
            </div>
            <div>
              <span className="label">{copy.yearLabel}</span>
              <div className="metric">{yearFilter === "all" ? copy.allYears : yearFilter}</div>
            </div>
            <div>
              <span className="label">{copy.sectionLabel}</span>
              <div className="metric">
                {sectionFilter === "all"
                  ? copy.allSections
                  : copy.sectionNames[sectionFilter as ArchiveSection]}
              </div>
            </div>
          </div>
        </section>

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
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <article className="project-card" key={entry.title}>
                <div className="project-topline">
                  <span className={entry.status === "return" ? "status status-current" : "status status-archive"}>
                    {entry.status === "return" ? copy.ready : copy.archiveTag}
                  </span>
                  <span className="direction">{copy.sectionNames[entry.section]}</span>
                </div>
                <h3>{entry.title}</h3>
                <p className="project-note">{entry.note}</p>
                <dl className="project-meta">
                  <div>
                    <dt>{copy.yearLabel}</dt>
                    <dd>{entry.year}</dd>
                  </div>
                  <div>
                    <dt>{copy.monthLabel}</dt>
                    <dd>{copy.monthNames[entry.month as keyof typeof copy.monthNames]}</dd>
                  </div>
                  <div>
                    <dt>{copy.clientLabel}</dt>
                    <dd>{entry.client}</dd>
                  </div>
                </dl>
              </article>
            ))
          ) : (
            <article className="panel archive-empty">
              <h2>{copy.emptyTitle}</h2>
              <p className="entity-note">{copy.emptyText}</p>
              <div className="panel-actions">
                <button className="ghost-button" type="button" onClick={resetFilters}>
                  {copy.resetFilters}
                </button>
              </div>
            </article>
          )}
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
