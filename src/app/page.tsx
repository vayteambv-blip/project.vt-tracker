import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { projectFlow, primarySections } from "@/lib/site-map";

const metrics = [
  { label: "Core sections", value: "8" },
  { label: "Spec layers", value: "6" },
  { label: "Working mode", value: "Frontend" },
  { label: "Stack", value: "Next.js + TS" },
];

export default function HomePage() {
  return (
    <AppShell
      title="Project control center"
      description="A focused starting point for the finished app: clear structure, strong navigation, and separate areas for clients, firms, projects, finance, documents, calendar, reports, and archive."
    >
      <section className="dashboard">
        <div className="summary-grid">
          {metrics.map((metric) => (
            <article className="summary-card" key={metric.label}>
              <div className="label">{metric.label}</div>
              <div className="metric">{metric.value}</div>
            </article>
          ))}
        </div>

        <section className="panel">
          <h2>Build order</h2>
          <ol className="bullet-list">
            {projectFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="feature-grid">
          {primarySections.map((section) => (
            <article className="feature-card" key={section.href}>
              <div className="tag">{section.label}</div>
              <h3>{section.summary}</h3>
              <p>
                This area will become a dedicated workspace with its own
                filters, empty states, and entity views.
              </p>
              <div className="panel-actions">
                <Link className="ghost-link" href={section.href}>
                  Open {section.label}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <p className="shell-note">
          Next step: wire each section to real data and then refine the design
          system around the project rules already written in Specs.
        </p>
      </section>
    </AppShell>
  );
}
