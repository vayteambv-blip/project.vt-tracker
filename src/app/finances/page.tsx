"use client";

import { AppShell } from "@/components/app-shell";
import { FinanceStoragePanel } from "@/components/finance-storage-panel";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Финансы",
    description: "Расходы, оплаты субподрядчикам, остаток и расчет прибыли живут здесь.",
    stats: [
      { label: "Общие расходы", value: "€128k" },
      { label: "Прибыль", value: "€34k" },
      { label: "Связанных субподрядчиков", value: "7" },
      { label: "Открытых записей", value: "3" },
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
    description: "Kosten, betalingen aan onderaannemers, saldo en winstberekening leven hier.",
    stats: [
      { label: "Totale kosten", value: "€128k" },
      { label: "Winst", value: "€34k" },
      { label: "Gekoppelde onderaannemers", value: "7" },
      { label: "Open regels", value: "3" },
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

        <FinanceStoragePanel />
      </section>
    </AppShell>
  );
}

