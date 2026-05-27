"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocale } from "@/components/locale-provider";
import { getPrimarySections } from "@/lib/site-map";

type AppShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  const { locale, setLocale } = useLocale();
  const sections = getPrimarySections(locale);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">VT</div>
          <div>
            <div className="brand-name">VT Tracker</div>
            <div className="brand-subtitle">
              {locale === "ru" ? "Локальный фронтенд на Next.js + TypeScript" : "Lokale frontend op Next.js + TypeScript"}
            </div>
          </div>
        </div>

        <nav className="nav">
          {sections.map((section) => (
            <Link key={section.href} className="nav-item" href={section.href}>
              <span>{section.label}</span>
              <small>{section.summary}</small>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="hero">
          <div className="hero-topline">
            <div className="eyebrow">{locale === "ru" ? "Панель управления проектом" : "Projectpaneel"}</div>
            <div className="language-switch" role="group" aria-label="Language switch">
              <button
                className={locale === "ru" ? "language-button active" : "language-button"}
                type="button"
                onClick={() => setLocale("ru")}
              >
                RU
              </button>
              <button
                className={locale === "nl" ? "language-button active" : "language-button"}
                type="button"
                onClick={() => setLocale("nl")}
              >
                NL
              </button>
            </div>
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        {children}
      </main>
    </div>
  );
}
