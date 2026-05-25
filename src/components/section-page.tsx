import Link from "next/link";
import { AppShell } from "./app-shell";

type SectionPageProps = {
  title: string;
  description: string;
  focus: string[];
  nextSteps: string[];
  backHref?: string;
};

export function SectionPage({
  title,
  description,
  focus,
  nextSteps,
  backHref = "/",
}: SectionPageProps) {
  return (
    <AppShell title={title} description={description}>
      <section className="panel-grid">
        <article className="panel">
          <h2>What this area covers</h2>
          <ul className="bullet-list">
            {focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Next build steps</h2>
          <ul className="bullet-list">
            {nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="panel-actions">
            <Link className="ghost-link" href={backHref}>
              Back to overview
            </Link>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
