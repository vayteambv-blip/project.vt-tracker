import type { ReactNode } from "react";
import Link from "next/link";
import { AppShell } from "./app-shell";

type SectionPageProps = {
  title: string;
  description: string;
  children?: ReactNode;
  backHref?: string;
};

export function SectionPage({
  title,
  description,
  children,
  backHref = "/",
}: SectionPageProps) {
  return (
    <AppShell title={title} description={description}>
      {children}
      <div className="panel-actions">
        <Link className="ghost-link" href={backHref}>
          Назад к обзору
        </Link>
      </div>
    </AppShell>
  );
}
