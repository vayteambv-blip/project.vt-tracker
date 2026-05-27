"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

export default function NotFound() {
  const { locale } = useLocale();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          padding: "28px",
          border: "1px solid var(--line)",
          borderRadius: "24px",
          background: "var(--bg-panel-strong)",
          boxShadow: "var(--shadow)",
        }}
      >
        <p className="eyebrow">{locale === "ru" ? "Не найдено" : "Niet gevonden"}</p>
        <h1 style={{ margin: "12px 0" }}>
          {locale === "ru" ? "Этой страницы пока не существует." : "Deze pagina bestaat nog niet."}
        </h1>
        <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
          {locale === "ru"
            ? "Вернись на главную панель и продолжай работу с разделами проекта оттуда."
            : "Ga terug naar het startpaneel en werk van daaruit verder met de projectsecties."}
        </p>
        <div style={{ marginTop: "18px" }}>
          <Link className="ghost-link" href="/">
            {locale === "ru" ? "Назад на главную" : "Terug naar start"}
          </Link>
        </div>
      </div>
    </main>
  );
}

