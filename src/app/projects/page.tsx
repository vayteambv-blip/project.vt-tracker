"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ProjectStoragePanel } from "@/components/project-storage-panel";
import { useLocale } from "@/components/locale-provider";
import { getProjectOverview, type ProjectCard } from "@/lib/project-overview";

const content = {
  ru: {
    title: "Проекты",
    description:
      "Центральная рабочая единица приложения. Этот раздел держит один проект привязанным к одному направлению и связывает его с клиентом, фирмами, датой старта, документами, отчетами, финансами и архивом.",
    flowTitle: "Поток проекта",
    focusTitle: "Что этот экран всегда должен показывать",
    stateTag: "Рабочее состояние",
    stateTitle: "Проект не должен ощущаться как набор разрозненных записей.",
    stateText:
      "Карточка проекта держит активное направление на виду, а вся остальная информация остается привязанной к той же работе.",
    previewTag: "Примерочная",
    previewTitle: "Сравнивай изменения дизайна или компоновки перед переносом назад.",
    previewText:
      "Используй отдельную примерочную страницу, чтобы сначала проверить изменения и только потом переносить одобренный результат на основные экраны проекта.",
    actionsTitle: "Приоритеты проекта",
    phasesTitle: "Фазы проекта",
    projectLinks: "Проект:",
    client: "Клиент",
    start: "Start",
    firms: "Фирмы",
    status: {
      Preparation: "Подготовка",
      Current: "Текущий",
      Future: "Будущий",
      Archive: "Архив",
    },
    checkItems: [
      "Проект должен пройти проверку полноты перед сохранением.",
      "Клиент, фирмы, файлы и финансы должны быть видны в одном месте.",
      "Завершенный проект можно перенести в архив вручную.",
      "Архивный проект можно вернуть как тот же самый проект с новой датой старта.",
    ],
    actions: [
      "Открыть проект и проверить полноту перед сохранением.",
      "Видеть клиента, фирмы, файлы и финансы в одном месте.",
      "Переносить завершенный проект в архив вручную.",
      "Возвращать архивный проект как тот же самый проект с новой датой старта.",
    ],
    phases: [
      "Подготовка: смета, клиент и дата еще уточняются.",
      "Текущий: активная работа с привязанными фирмами, документами и финансами.",
      "Будущий: запланированный проект, который ждет свою дату старта.",
      "Архив: завершенный проект с сохраненной историей.",
    ],
    openPreview: "Открыть примерочную",
  },
  nl: {
    title: "Projecten",
    description:
      "De centrale werkeenheid van de applicatie. Deze sectie houdt één project gekoppeld aan één richting en verbindt het met klant, bedrijven, startdatum, documenten, rapporten, financiën en archief.",
    flowTitle: "Projectstroom",
    focusTitle: "Wat dit scherm altijd moet tonen",
    stateTag: "Werkstatus",
    stateTitle: "Een project mag niet aanvoelen als losse, verspreide gegevens.",
    stateText:
      "De projectkaart houdt de actieve richting zichtbaar, terwijl alle andere informatie aan dezelfde opdracht gekoppeld blijft.",
    previewTag: "Proefruimte",
    previewTitle: "Vergelijk ontwerp- of lay-outwijzigingen voordat je ze terugplaatst.",
    previewText:
      "Gebruik de aparte proefruimte om eerst wijzigingen te testen en pas daarna het goedgekeurde resultaat naar de hoofdschermen te brengen.",
    actionsTitle: "Projectprioriteiten",
    phasesTitle: "Projectfases",
    projectLinks: "Project:",
    client: "Klant",
    start: "Старт",
    firms: "Bedrijven",
    status: {
      Preparation: "Voorbereiding",
      Current: "Actief",
      Future: "Toekomstig",
      Archive: "Archief",
    },
    checkItems: [
      "Het project moet volledig worden gecontroleerd vóór opslaan.",
      "Klant, bedrijven, bestanden en financiën moeten op één plek zichtbaar zijn.",
      "Een afgerond project kan handmatig naar het archief worden verplaatst.",
      "Een gearchiveerd project kan terugkomen als hetzelfde project met een nieuwe startdatum.",
    ],
    actions: [
      "Open het project en controleer de volledigheid vóór het opslaan.",
      "Bekijk klant, bedrijven, bestanden en financiën op één plek.",
      "Verplaats een afgerond project handmatig naar het archief.",
      "Breng een gearchiveerd project terug als hetzelfde project met een nieuwe startdatum.",
    ],
    phases: [
      "Voorbereiding: offerte, klant en datum worden nog afgerond.",
      "Actief: lopend werk met gekoppelde bedrijven, documenten en financiën.",
      "Toekomstig: gepland project dat op zijn startdatum wacht.",
      "Archief: afgerond project met bewaarde geschiedenis.",
    ],
    openPreview: "Open proefruimte",
  },
} as const;

type ProjectStatus = ProjectCard["status"];

export default function ProjectsPage() {
  const { locale } = useLocale();
  const overview = getProjectOverview(locale);
  const copy = content[locale];

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          {overview.projectStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>{copy.flowTitle}</h2>
            <ol className="bullet-list">
              {overview.projectFlowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>

          <article className="panel">
            <h2>{copy.focusTitle}</h2>
            <ul className="check-list">
              {copy.checkItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="feature-grid">
          <article className="feature-card">
            <div className="tag">{copy.stateTag}</div>
            <h3>{copy.stateTitle}</h3>
            <p>{copy.stateText}</p>
          </article>

          <article className="feature-card">
            <div className="tag">{copy.previewTag}</div>
            <h3>{copy.previewTitle}</h3>
            <p>{copy.previewText}</p>
            <div className="panel-actions">
              <Link className="ghost-link" href="/preview">
                {copy.openPreview}
              </Link>
            </div>
          </article>
        </section>

        <section className="panel-grid">
          <article className="panel">
            <h2>{copy.actionsTitle}</h2>
            <ul className="check-list">
              {copy.actions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>{copy.phasesTitle}</h2>
            <ul className="bullet-list">
              {copy.phases.map((phase) => (
                <li key={phase}>{phase}</li>
              ))}
            </ul>
          </article>
        </section>

        <ProjectStoragePanel />

        <section className="project-grid">
          {overview.projectCards.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-topline">
                <span className={`status ${projectStatusTone(project.status)}`}>{copy.status[project.status as ProjectStatus]}</span>
                <span className="direction">{project.direction}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-note">{project.note}</p>

              <dl className="project-meta">
                <div>
                  <dt>{copy.client}</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>{copy.start}</dt>
                  <dd>{project.startDate}</dd>
                </div>
                <div>
                  <dt>{copy.firms}</dt>
                  <dd>{project.firms.join(", ")}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <p className="shell-note">
          {locale === "ru"
            ? "Экран проекта — это опорная точка всего приложения: если он выстроен правильно, остальные разделы можно держать в общей логике."
            : "Het projectscherm is de ankerpunt van de hele applicatie: als dit goed staat, kunnen de andere secties in dezelfde logica blijven."}
        </p>
      </section>
    </AppShell>
  );
}

function projectStatusTone(status: ProjectStatus) {
  switch (status) {
    case "Preparation":
      return "status-prep";
    case "Current":
      return "status-current";
    case "Future":
      return "status-future";
    case "Archive":
      return "status-archive";
    default:
      return "status-current";
  }
}
