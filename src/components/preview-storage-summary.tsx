"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import { buildCalendarItemsFromProjects, useWorkspaceSelector } from "@/lib/workspace-store";

const PREVIEW_DRAFT_KEY = "vt-tracker:preview-draft";

function countPreviewDraft(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const raw = window.localStorage.getItem(PREVIEW_DRAFT_KEY);
    if (!raw) {
      return 0;
    }

    return JSON.parse(raw) ? 1 : 0;
  } catch {
    return 0;
  }
}

export function PreviewStorageSummary() {
  const { locale } = useLocale();
  const [, forceRefresh] = useState(0);
  const workspace = useWorkspaceSelector((snapshot) => snapshot);

  useEffect(() => {
    const sync = () => {
      forceRefresh((value) => value + 1);
    };

    window.addEventListener("storage", sync);
    window.addEventListener("vt-tracker-storage-change", sync);
    window.addEventListener("vt-tracker-workspace-change", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("vt-tracker-storage-change", sync);
      window.removeEventListener("vt-tracker-workspace-change", sync);
    };
  }, [locale]);

  const items = [
    {
      key: "clients",
      label: locale === "ru" ? "Клиенты" : "Klanten",
      count: workspace.clients.length,
    },
    {
      key: "firms",
      label: locale === "ru" ? "Субподрядчики" : "Onderaannemers",
      count: workspace.firms.length,
    },
    {
      key: "projects",
      label: locale === "ru" ? "Проекты" : "Projecten",
      count: workspace.projects.length,
    },
    {
      key: "calendar",
      label: locale === "ru" ? "Календарь" : "Agenda",
      count: buildCalendarItemsFromProjects(workspace.projects, workspace.calendar).length,
    },
    {
      key: "finances",
      label: locale === "ru" ? "Финансы" : "Financiën",
      count: workspace.finances.length,
    },
    {
      key: "documents",
      label: locale === "ru" ? "Документы" : "Documenten",
      count: workspace.documents.length,
    },
    {
      key: "reports",
      label: locale === "ru" ? "Отчёты" : "Rapporten",
      count: workspace.reports.length,
    },
    {
      key: "archive",
      label: locale === "ru" ? "Архив" : "Archief",
      count: workspace.archive.length,
    },
  ];
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const previewDraftCount = countPreviewDraft();

  return (
    <section className="panel">
      <h2>{locale === "ru" ? "Сводка хранилища" : "Opslagsoverzicht"}</h2>
      <p className="entity-note">
        {locale === "ru"
          ? "Этот блок показывает, что уже хранится в общем workspace-хранилище по каждой зоне. Так можно проверять фронтенд без backend."
          : "Dit blok toont wat al in het gezamenlijke workspace-opslag is bewaard. Zo kun je de frontend testen zonder backend."}
      </p>

      <div className="draft-status">
        <div>
          <span className="label">{locale === "ru" ? "Отслеживаемых зон" : "Bijgehouden zones"}</span>
          <div className="metric">{items.length}</div>
        </div>
        <div>
          <span className="label">{locale === "ru" ? "Всего сохранено" : "Totaal opgeslagen"}</span>
          <div className="metric">{total}</div>
        </div>
        <div>
          <span className="label">{locale === "ru" ? "Черновик превью" : "Proefruimteconcept"}</span>
          <div className="metric">{previewDraftCount}</div>
        </div>
      </div>

      <section className="entity-grid">
        {items.map((item) => (
          <article className="entity-card" key={item.key}>
            <div className="entity-topline">
              <span className="status status-current">{item.count}</span>
              <span className="direction">{locale === "ru" ? "локальные данные" : "lokale data"}</span>
            </div>
            <h3>{item.label}</h3>
            <p className="entity-note">
              {item.count > 0
                ? locale === "ru"
                  ? "Данные уже сохранены."
                  : "Gegevens zijn al opgeslagen."
                : locale === "ru"
                  ? "Пока ничего не сохранено."
                  : "Er is nog niets opgeslagen."}
            </p>
          </article>
        ))}
      </section>
    </section>
  );
}
