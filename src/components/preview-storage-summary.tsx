"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";

const STORAGE_KEYS = [
  { key: "vt-tracker:projects", ru: "Проекты", nl: "Projecten" },
  { key: "vt-tracker:clients", ru: "Клиенты", nl: "Klanten" },
  { key: "vt-tracker:firms", ru: "Фирмы", nl: "Bedrijven" },
  { key: "vt-tracker:calendar", ru: "Календарь", nl: "Agenda" },
  { key: "vt-tracker:finances", ru: "Финансы", nl: "Financiën" },
  { key: "vt-tracker:documents", ru: "Документы", nl: "Documenten" },
  { key: "vt-tracker:reports", ru: "Отчеты", nl: "Rapporten" },
  { key: "vt-tracker:archive", ru: "Архив", nl: "Archief" },
  { key: "vt-tracker:preview-draft", ru: "Черновик примерочной", nl: "Proefruimteconcept" },
] as const;

type StorageState = {
  key: string;
  label: string;
  count: number;
};

function countItems(key: string): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return 0;
    }

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.length : 1;
  } catch {
    return 0;
  }
}

function readSnapshot(locale: "ru" | "nl"): StorageState[] {
  return STORAGE_KEYS.map((entry) => ({
    key: entry.key,
    label: locale === "ru" ? entry.ru : entry.nl,
    count: countItems(entry.key),
  }));
}

export function PreviewStorageSummary() {
  const { locale } = useLocale();
  const [, forceRefresh] = useState(0);

  useEffect(() => {
    const sync = () => {
      forceRefresh((value) => value + 1);
    };

    window.addEventListener("storage", sync);
    window.addEventListener("vt-tracker-storage-change", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("vt-tracker-storage-change", sync);
    };
  }, [locale]);

  const items = readSnapshot(locale);
  const total = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="panel">
      <h2>{locale === "ru" ? "Сводка хранилища" : "Opslagsoverzicht"}</h2>
      <p className="entity-note">
        {locale === "ru"
          ? "Этот блок показывает, что уже хранится в браузере по каждой зоне. Так можно проверять фронтенд без backend."
          : "Dit blok toont wat er al in de browser per zone is opgeslagen. Zo kun je de frontend testen zonder backend."}
      </p>

      <div className="draft-status">
        <div>
          <span className="label">{locale === "ru" ? "Отслеживаемых зон" : "Bijgehouden zones"}</span>
          <div className="metric">{STORAGE_KEYS.length}</div>
        </div>
        <div>
          <span className="label">{locale === "ru" ? "Всего сохранено" : "Totaal opgeslagen"}</span>
          <div className="metric">{total}</div>
        </div>
        <div>
          <span className="label">{locale === "ru" ? "Тип хранилища" : "Opslagtype"}</span>
          <div className="metric">Browser localStorage</div>
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
