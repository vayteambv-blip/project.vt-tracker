import { AppShell } from "@/components/app-shell";
import { clientCards, clientStats } from "@/lib/client-overview";

const clientTone: Record<(typeof clientCards)[number]["status"], string> = {
  Complete: "status status-current",
  "In progress": "status status-prep",
};

export default function ClientsPage() {
  return (
    <AppShell
      title="Clients"
      description="Private clients and company customers live here. This workspace keeps contact data, completeness, and linked projects clearly separated."
    >
      <section className="dashboard">
        <div className="summary-grid">
          {clientStats.map((stat) => (
            <article className="summary-card" key={stat.label}>
              <div className="label">{stat.label}</div>
              <div className="metric">{stat.value}</div>
            </article>
          ))}
        </div>

        <section className="panel-grid">
          <article className="panel">
            <h2>Client rules in practice</h2>
            <ul className="bullet-list">
              <li>One project links to one client.</li>
              <li>Documents are not stored on the client.</li>
              <li>Completeness must be visible before save.</li>
              <li>Search should get me to the right client fast.</li>
            </ul>
          </article>

          <article className="panel">
            <h2>Key actions</h2>
            <ul className="check-list">
              <li>Create a new private client or company customer.</li>
              <li>Open linked projects from the client card.</li>
              <li>Continue editing unfinished client data later.</li>
              <li>Keep the client list clean and searchable.</li>
            </ul>
          </article>
        </section>

        <section className="entity-grid">
          {clientCards.map((client) => (
            <article className="entity-card" key={client.name}>
              <div className="entity-topline">
                <span className={clientTone[client.status]}>{client.status}</span>
                <span className="direction">{client.type}</span>
              </div>
              <h3>{client.name}</h3>
              <p className="entity-note">Projects linked: {client.projects}</p>
              <dl className="project-meta">
                <div>
                  <dt>Address</dt>
                  <dd>{client.address}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{client.phone}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{client.email}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      </section>
    </AppShell>
  );
}
