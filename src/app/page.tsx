"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getProjectFlow } from "@/lib/site-map";
import { useLocale } from "@/components/locale-provider";

const content = {
  ru: {
    title: "Центр управления проектом",
    description:
      "Удобная стартовая точка для готового приложения: понятная структура, сильная навигация и отдельные зоны для клиентов, фирм, проектов, финансов, документов, календаря, отчетов и архива.",
    metrics: [
      { label: "Разделов", value: "9" },
      { label: "Спек-слоев", value: "6" },
      { label: "Режим работы", value: "Frontend" },
      { label: "Стек", value: "Next.js + TS" },
    ],
    developmentTitle: "Порядок разработки",
    overviewTitle: "Это станет отдельной рабочей зоной со своими фильтрами, пустыми состояниями и видами сущностей.",
    openSection: "Открыть раздел",
    nextStep:
      "Следующий шаг: подключать реальные данные к каждому разделу и затем доводить систему дизайна вокруг правил, уже записанных в `Specs`.",
  },
  nl: {
    title: "Projectbeheercentrum",
    description:
      "Een handige startpagina voor de uiteindelijke applicatie: duidelijke structuur, sterke navigatie en aparte zones voor klanten, bedrijven, projecten, financiën, documenten, agenda, rapporten en archief.",
    metrics: [
      { label: "Secties", value: "9" },
      { label: "Spec-lagen", value: "6" },
      { label: "Werkmodus", value: "Frontend" },
      { label: "Stack", value: "Next.js + TS" },
    ],
    developmentTitle: "Ontwikkelvolgorde",
    overviewTitle: "Dit wordt een aparte werkzone met eigen filters, lege staten en entiteitsweergaven.",
    openSection: "Open sectie",
    nextStep:
      "Volgende stap: echte data koppelen aan elke sectie en daarna het designsysteem afwerken rond de regels die al in `Specs` staan.",
  },
} as const;

export default function HomePage() {
  const { locale } = useLocale();
  const copy = content[locale];
  const flow = getProjectFlow(locale);

  return (
    <AppShell title={copy.title} description={copy.description}>
      <section className="dashboard">
        <div className="summary-grid">
          {copy.metrics.map((metric) => (
            <article className="summary-card" key={metric.label}>
              <div className="label">{metric.label}</div>
              <div className="metric">{metric.value}</div>
            </article>
          ))}
        </div>

        <section className="panel">
          <h2>{copy.developmentTitle}</h2>
          <ol className="bullet-list">
            {flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="feature-grid">
          {[
            { label: locale === "ru" ? "Обзор" : "Overzicht", href: "/projects", summary: copy.overviewTitle },
            { label: locale === "ru" ? "Примерочная" : "Proefruimte", href: "/preview", summary: locale === "ru" ? "Отдельная комната для проверки дизайна и разработки." : "Een aparte ruimte om ontwerp en ontwikkeling te controleren." },
            { label: locale === "ru" ? "Календарь" : "Agenda", href: "/calendar", summary: locale === "ru" ? "Планирование дат старта и ближайших работ." : "Planning van startdata en aankomende werkzaamheden." },
          ].map((section) => (
            <article className="feature-card" key={section.href}>
              <div className="tag">{section.label}</div>
              <h3>{section.summary}</h3>
              <p>{copy.nextStep}</p>
              <div className="panel-actions">
                <Link className="ghost-link" href={section.href}>
                  {copy.openSection} {section.label}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <p className="shell-note">{copy.nextStep}</p>
      </section>
    </AppShell>
  );
}

