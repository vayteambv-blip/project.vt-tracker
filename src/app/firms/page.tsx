"use client";

import { AppShell } from "@/components/app-shell";
import { FirmStoragePanel } from "@/components/firm-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { getFirmOverview, type FirmCard } from "@/lib/firm-overview";

const content = {
  ru: {
    title: "Субподрядчики",
    description:
      "Здесь живут субподрядчики с рабочими, контрактами, ролями в проекте и оплатой через финансы проекта.",
    ruleTitle: "Правила субподрядчиков в работе",
    actionTitle: "Основные действия",
    workers: "Рабочие",
    projects: "Фактуры",
    status: {
      Active: "Активная",
      Linked: "Привязана",
    },
    role: {
      Executor: "Субподрядчик",
      Customer: "Клиент-фирма",
    },
    ruleItems: [
      "Субподрядчик не хранит отдельный финансовый блок.",
      "Роль субподрядчика задается внутри проекта, а не отдельно.",
      "Рабочие, контракты и файлы живут в карточке субподрядчика.",
      "Поиск по субподрядчикам должен оставаться быстрым и понятным.",
    ],
    actionItems: [
      "Создать нового субподрядчика и назначить роль.",
      "Открыть проекты, где субподрядчик уже участвует.",
      "Проверить текущие контракты и рабочие записи.",
      "Смотреть оплату только через расходы проекта.",
    ],
  },
  nl: {
    title: "Onderaannemers",
    description:
      "Hier staan onderaannemers met vakmensen, contracten, projectrollen en betaling via de projectfinanciën.",
    ruleTitle: "Regels voor onderaannemers",
    actionTitle: "Belangrijkste acties",
    workers: "Werknemers",
    projects: "Facturen",
    status: {
      Active: "Actief",
      Linked: "Gekoppeld",
    },
    role: {
      Executor: "Onderaannemer",
      Customer: "Klantbedrijf",
    },
    ruleItems: [
      "Een onderaannemer heeft geen aparte financiële sectie.",
      "De rol van de onderaannemer wordt binnen het project bepaald.",
      "Werknemers, contracten en bestanden leven in de kaart van de onderaannemer.",
      "Zoeken op onderaannemers moet snel en duidelijk blijven.",
    ],
    actionItems: [
      "Maak een nieuwe onderaannemer aan en wijs een rol toe.",
      "Open projecten waaraan de onderaannemer al meedoet.",
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

