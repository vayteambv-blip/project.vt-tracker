"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { FinanceStoragePanel } from "@/components/finance-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Финансы",
    description: "Расходы, поток фактуры, оплаты субподрядчикам, остаток и расчет прибыли живут здесь.",
    stats: [
      { label: "Общие расходы", value: "€128k" },
      { label: "Прибыль", value: "€34k" },
      { label: "Связанных субподрядчиков", value: "7" },
      { label: "Открытых счетов", value: "3" },
    ],
    rulesTitle: "Правила финансов в работе",
    stepsTitle: "Следующие шаги разработки",
    compare: "Сравнить финансовую компоновку в примерочной",
    back: "Назад к проектам",
    note:
      "Финансы — это единственное место, где должны жить общие суммы, остаток и прибыль. Карточка проекта должна ссылаться на результат, а не дублировать его.",
    focusItems: [
      "Держать финансы как единственное место для итогов и прибыли.",
      "Отслеживать оплаты субподрядчикам через расходы проекта.",
      "Не дублировать суммы внутри карточки проекта.",
      "Держать фактуру и реальные расходы в одном финансовом потоке.",
    ],
    stepItems: [
      "Открыть финансовый вид проекта.",
      "Добавить расходы и оплаты.",
      "Проверить текущий баланс и прибыль.",
      "Сравнить результат с карточками проекта и субподрядчика.",
    ],
    entries: [
      {
        label: "Базовая смета",
        note: "Одобренная оценка, связанная со стартом проекта.",
        amount: "€68k",
      },
      {
        label: "Непредвиденные расходы",
        note: "Расходы, которые не входили в основной расчет и должны учитываться отдельно.",
        amount: "€14k",
      },
      {
        label: "Оплаты субподрядчикам",
        note: "Оплаты, проходящие через расходы проекта.",
        amount: "€36k",
      },
    ],
  },
  nl: {
    title: "Financiën",
    description: "Kosten, factuurstroom, betalingen aan onderaannemers, saldo en winstberekening leven hier.",
    stats: [
      { label: "Totale kosten", value: "€128k" },
      { label: "Winst", value: "€34k" },
      { label: "Gekoppelde onderaannemers", value: "7" },
      { label: "Open rekeningen", value: "3" },
    ],
    rulesTitle: "Financiële regels in gebruik",
    stepsTitle: "Volgende ontwikkelstappen",
    compare: "Vergelijk financiële indeling in de proefruimte",
    back: "Terug naar projecten",
    note:
      "Financiën is de enige plek waar totale bedragen, saldo en winst leven. De projectkaart moet naar het resultaat verwijzen en het niet dupliceren.",
    focusItems: [
      "Houd financiën als enige plek voor totalen en winst.",
      "Volg betalingen aan onderaannemers via de projectkosten.",
      "Dupliceer bedragen niet in de projectkaart.",
      "Houd facturen en echte kosten in één financiële stroom.",
    ],
    stepItems: [
      "Open de financiële weergave van het project.",
      "Voeg kosten en betalingen toe.",
      "Controleer het huidige saldo en de winst.",
      "Vergelijk het resultaat met de project- en onderaannemerskaarten.",
    ],
    entries: [
      {
        label: "Basisofferte",
        note: "Goedgekeurde schatting gekoppeld aan de projectstart.",
        amount: "€68k",
      },
      {
        label: "Onvoorziene kosten",
        note: "Kosten die niet in de basisberekening zaten en apart moeten worden bijgehouden.",
        amount: "€14k",
      },
      {
        label: "Betalingen aan onderaannemers",
        note: "Betalingen die via de projectkosten lopen.",
        amount: "€36k",
      },
    ],
  },
} as const;

export default function FinancesPage() {
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
                <span className="status status-current">{entry.amount}</span>
                <span className="direction">{locale === "ru" ? "финансовая строка" : "financiële regel"}</span>
              </div>
              <h3>{entry.label}</h3>
              <p className="project-note">{entry.note}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <h2>{locale === "ru" ? "Связь с финансами" : "Koppeling met financiën"}</h2>
          <p className="entity-note">{copy.note}</p>
          <div className="panel-actions">
            <Link className="ghost-link" href="/projects">
              {copy.back}
            </Link>
          </div>
        </section>

        <FinanceStoragePanel />
      </section>
    </AppShell>
  );
}

