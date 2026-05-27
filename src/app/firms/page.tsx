import { AppShell } from "@/components/app-shell";
import { firmCards, firmStats } from "@/lib/firm-overview";

const firmTone: Record<(typeof firmCards)[number]["status"], string> = {
  Active: "status status-current",
  Linked: "status status-future",
};

export default function FirmsPage() {
  return (
    <AppShell
      title="Firms"
      description="Subcontractors and firm customers live here with workers, contracts, project roles, and payment flow through project finance."
    >
      <section className="dashboard">
        <div className="summary-grid">
          {firmStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>Firm rules in practice</h2>
            <ul className="bullet-list">
              <li>Firms are separate from clients.</li>
              <li>Workers belong to a firm, not to a project.</li>
              <li>Firm payments go through project expenses.</li>
              <li>No fixed specialization lives on the firm itself.</li>
            </ul>
          </article>

          <article className="panel">
            <h2>Key actions</h2>
            <ul className="check-list">
              <li>Open the firm card for contracts and workers.</li>
              <li>See which projects the firm already touched.</li>
              <li>Keep current workers and history separate.</li>
              <li>Search firms quickly by name or contract context.</li>
            </ul>
          </article>
        </section>

        <section className="entity-grid">
          {firmCards.map((firm) => (
            <article className="entity-card" key={firm.name}>
              <div className="entity-topline">
                <span className={firmTone[firm.status]}>{firm.status}</span>
                <span className="direction">{firm.role}</span>
              </div>
              <h3>{firm.name}</h3>
              <p className="entity-note">{firm.paymentPath}</p>
              <dl className="project-meta">
                <div>
                  <dt>Workers</dt>
                  <dd>{firm.workers}</dd>
                </div>
                <div>
                  <dt>Projects</dt>
                  <dd>{firm.projects}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      </section>
    </AppShell>
  );
}
