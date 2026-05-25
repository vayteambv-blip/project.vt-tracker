import Link from "next/link";
import type { ReactNode } from "react";
import { primarySections } from "@/lib/site-map";

type AppShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">VT</div>
          <div>
            <div className="brand-name">VT Tracker</div>
            <div className="brand-subtitle">Next.js + TypeScript</div>
          </div>
        </div>

        <nav className="nav">
          {primarySections.map((section) => (
            <Link key={section.href} className="nav-item" href={section.href}>
              <span>{section.label}</span>
              <small>{section.summary}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="hero">
          <div className="eyebrow">Project control surface</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        {children}
      </main>
    </div>
  );
}
