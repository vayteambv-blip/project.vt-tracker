import { AppShell } from "@/components/app-shell";
import {
  projectCards,
  projectFlowSteps,
  projectStats,
} from "@/lib/project-overview";

const statusTone: Record<(typeof projectCards)[number]["status"], string> = {
  Preparation: "status status-prep",
  Current: "status status-current",
  Future: "status status-future",
  Archive: "status status-archive",
};

export default function ProjectsPage() {
  return (
    <AppShell
      title="Projects"
      description="The main work unit of the app. This view keeps the project centered and ties together client, direction, start date, firms, documents, reports, materials, finance, and archive."
    >
      <section className="dashboard">
        <div className="summary-grid">
          {projectStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>Project flow</h2>
            <ul className="bullet-list">
              {projectFlowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h2>Project priorities</h2>
            <ul className="check-list">
              <li>Show completeness before save.</li>
              <li>Keep the current project state obvious.</li>
              <li>Keep the archive route separate from active work.</li>
              <li>Prevent duplicated totals inside the project card.</li>
            </ul>
          </article>
        </section>

        <section className="project-grid">
          {projectCards.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-topline">
                <span className={statusTone[project.status]}>{project.status}</span>
                <span className="direction">{project.direction}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-note">{project.note}</p>

              <dl className="project-meta">
                <div>
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>Start</dt>
                  <dd>{project.startDate}</dd>
                </div>
                <div>
                  <dt>Firms</dt>
                  <dd>{project.firms.join(", ")}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      </section>
    </AppShell>
  );
}
