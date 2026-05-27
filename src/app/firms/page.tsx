"use client";

import { AppShell } from "@/components/app-shell";
import { FirmStoragePanel } from "@/components/firm-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { getFirmOverview, type FirmCard } from "@/lib/firm-overview";

const content = {
  ru: {
    title: "Фирмы",
    description:
      "Здесь живут субподрядчики и фирмы-заказчики с рабочими, контрактами, ролями в проекте и оплатой через финансы проекта.",
    ruleTitle: "Правила фирм в работе",
    actionTitle: "Основные действия",
    workers: "Рабочие",
    projects: "Проекты",
    status: {
      Active: "Активная",
      Linked: "Привязана",
    },
    role: {
      Executor: "Исполнитель",
      Customer: "Заказчик",
    },
    ruleItems: [
      "Фирма не хранит отдельный финансовый блок.",
      "Роль фирмы задается внутри проекта, а не отдельно.",
      "Рабочие, контракты и файлы живут в карточке фирмы.",
      "Поиск по фирмам должен оставаться быстрым и понятным.",
    ],
    actionItems: [
      "Создать новую фирму и назначить роль.",
      "Открыть проекты, где фирма уже участвует.",
      "Проверить текущие контракты и рабочие записи.",
      "Смотреть оплату только через расходы проекта.",
    ],
  },
  nl: {
    title: "Bedrijven",
    description:
      "Hier staan onderaannemers en opdrachtgevers met vakmensen, contracten, projectrollen en betaling via de projectfinanciën.",
    ruleTitle: "Bedrijfsregels in gebruik",
    actionTitle: "Belangrijkste acties",
    workers: "Werknemers",
    projects: "Projecten",
    status: {
      Active: "Actief",
      Linked: "Gekoppeld",
    },
    role: {
      Executor: "Uitvoerder",
      Customer: "Opdrachtgever",
    },
    ruleItems: [
      "Een bedrijf heeft geen aparte financiële sectie.",
      "De rol van het bedrijf wordt binnen het project bepaald.",
      "Werknemers, contracten en bestanden leven in de bedrijfskaart.",
      "Zoeken op bedrijven moet snel en duidelijk blijven.",
    ],
    actionItems: [
      "Maak een nieuw bedrijf aan en wijs een rol toe.",
      "Open projecten waaraan het bedrijf al meedoet.",
      "Controleer lopende contracten en werknemers.",
      "Bekijk betalingen alleen via de projectkosten.",
    ],
  },
} as const;

type FirmStatus = FirmCard["status"];

export default function FirmsPage() {
  const { locale } = useLocale();
  const overview = getFirmOverview(locale);
  const copy = content[locale];

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          {overview.firmStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>{copy.ruleTitle}</h2>
            <ul className="bullet-list">
              {copy.ruleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>{copy.actionTitle}</h2>
            <ul className="check-list">
              {copy.actionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="entity-grid">
          {overview.firmCards.map((firm) => (
            <article className="entity-card" key={firm.name}>
              <div className="entity-topline">
                <span className={firm.status === "Active" ? "status status-current" : "status status-future"}>
                  {copy.status[firm.status as FirmStatus]}
                </span>
                <span className="direction">{copy.role[firm.role]}</span>
              </div>
              <h3>{firm.name}</h3>
              <p className="entity-note">{firm.paymentPath}</p>
              <dl className="project-meta">
                <div>
                  <dt>{copy.workers}</dt>
                  <dd>{firm.workers}</dd>
                </div>
                <div>
                  <dt>{copy.projects}</dt>
                  <dd>{firm.projects}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <FirmStoragePanel />
      </section>
    </AppShell>
  );
}

