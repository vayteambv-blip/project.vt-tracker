"use client";

import { AppShell } from "@/components/app-shell";
import { ClientStoragePanel } from "@/components/client-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { getClientOverview, type ClientCard } from "@/lib/client-overview";

const content = {
  ru: {
    title: "Клиенты",
    description:
      "Здесь живут частные клиенты и клиенты-фирмы. Этот раздел держит контактные данные, полноту заполнения и связанные проекты раздельно и понятно.",
    rulesTitle: "Правила клиентов в работе",
    actionsTitle: "Основные действия",
    projectLinks: "Проекты связаны: ",
    address: "Адрес",
    phone: "Телефон",
    email: "Эл. почта",
    openProject: "Открыть связанные проекты",
    ruleItems: [
      "Один проект связан с одним клиентом.",
      "Документы не хранятся на клиенте.",
      "Перед сохранением должна быть видна полнота данных.",
      "Поиск должен быстро приводить к нужному клиенту.",
    ],
    actionItems: [
      "Создать нового частного клиента или клиента-фирму.",
      "Открыть связанные проекты из карточки клиента.",
      "Продолжить заполнение незавершенных данных позже.",
      "Держать список клиентов чистым и удобным для поиска.",
    ],
    status: {
      Complete: "Полный",
      "In progress": "В работе",
    },
    type: {
      Private: "Частный",
      Company: "Клиент-фирма",
    },
  },
  nl: {
    title: "Klanten",
      description:
      "Hier staan particuliere klanten en bedrijfsklanten. Deze sectie houdt contactgegevens, volledigheid en gekoppelde projecten gescheiden en duidelijk.",
    rulesTitle: "Klantregels in gebruik",
    actionsTitle: "Belangrijkste acties",
    projectLinks: "Gekoppelde projecten: ",
    address: "Adres",
    phone: "Telefoon",
    email: "E-mail",
    openProject: "Open gekoppelde projecten",
    ruleItems: [
      "Eén project hoort bij één klant.",
      "Documenten worden niet op de klant zelf opgeslagen.",
      "Voor het opslaan moet de volledigheid zichtbaar zijn.",
      "Zoeken moet snel naar de juiste klant leiden.",
    ],
    actionItems: [
      "Maak een nieuwe particuliere klant of bedrijfsklant aan.",
      "Open gekoppelde projecten vanuit de klantkaart.",
      "Ga later verder met onvolledige gegevens.",
      "Houd de klantenlijst schoon en makkelijk doorzoekbaar.",
    ],
    status: {
      Complete: "Volledig",
      "In progress": "In bewerking",
    },
    type: {
      Private: "Particulier",
      Company: "Bedrijfsklant",
    },
  },
} as const;

type ClientStatus = ClientCard["status"];

export default function ClientsPage() {
  const { locale } = useLocale();
  const overview = getClientOverview(locale);
  const copy = content[locale];

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          {overview.clientStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>{copy.rulesTitle}</h2>
            <ul className="bullet-list">
              {copy.ruleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>{copy.actionsTitle}</h2>
            <ul className="check-list">
              {copy.actionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="entity-grid">
          {overview.clientCards.map((client) => (
            <article className="entity-card" key={client.name}>
              <div className="entity-topline">
                <span className={client.status === "Complete" ? "status status-current" : "status status-prep"}>
                  {copy.status[client.status as ClientStatus]}
                </span>
                <span className="direction">{copy.type[client.type]}</span>
              </div>
              <h3>{client.name}</h3>
              <p className="entity-note">
                {copy.projectLinks}
                {client.projects}
              </p>
              <dl className="project-meta">
                <div>
                  <dt>{copy.address}</dt>
                  <dd>{client.address}</dd>
                </div>
                <div>
                  <dt>{copy.phone}</dt>
                  <dd>{client.phone}</dd>
                </div>
                <div>
                  <dt>{copy.email}</dt>
                  <dd>{client.email}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <ClientStoragePanel />
      </section>
    </AppShell>
  );
}
