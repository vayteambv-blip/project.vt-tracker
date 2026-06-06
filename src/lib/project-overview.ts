import type { Locale } from "@/lib/locale";
import { getWorkspaceSnapshot } from "@/lib/workspace-store";

export type ProjectCard = {
  name: string;
  direction: string;
  status: "Draft" | "Ready" | "Active" | "Archive";
  client: string;
  startDate: string;
  subcontractors: string[];
  note: string;
};

type ProjectOverview = {
  projectStats: Array<{ label: string; value: string }>;
  projectCards: ProjectCard[];
  projectFlowSteps: string[];
};

export function getProjectOverview(locale: Locale): ProjectOverview {
  const projects = getWorkspaceSnapshot().projects;

  const projectCards = projects.map((project) => ({
    name: project.name,
    direction: project.direction,
    status: project.status,
    client: project.client,
    startDate: project.startDate,
    subcontractors: project.subcontractors,
    note: project.note,
  }));

  const totals = {
    all: projects.length,
    ready: projects.filter((project) => project.status === "Ready").length,
    draft: projects.filter((project) => project.status === "Draft").length,
    archive: projects.filter((project) => project.status === "Archive").length,
  };

  return {
    projectStats:
      locale === "ru"
        ? [
            { label: "Проекты в фокусе", value: String(totals.all) },
            { label: "Готово к работе", value: String(totals.ready) },
            { label: "Ждут смету", value: String(totals.draft) },
            { label: "В архиве", value: String(totals.archive) },
          ]
        : [
            { label: "Projecten in focus", value: String(totals.all) },
            { label: "Klaar voor werk", value: String(totals.ready) },
            { label: "Wachten op offerte", value: String(totals.draft) },
            { label: "In archief", value: String(totals.archive) },
          ],
    projectCards,
    projectFlowSteps:
      locale === "ru"
        ? [
            "Создать проект и проверить основные данные.",
            "Привязать клиента, субподрядчиков, даты и смету.",
            "Синхронизировать дату старта с календарем.",
            "Добавить документы, фото, отчеты и материалы.",
            "Сохранить расходы и итог в финансах проекта.",
            "Перенести завершенный проект в архив и при необходимости вернуть его обратно.",
          ]
        : [
            "Maak een project aan en controleer de basisgegevens.",
            "Koppel klant, onderaannemers, data en offerte.",
            "Synchroniseer de startdatum met de agenda.",
            "Voeg documenten, foto's, rapporten en materialen toe.",
            "Bewaar kosten en het resultaat in de projectfinanciën.",
            "Verplaats het afgeronde project naar het archief en haal het indien nodig terug.",
          ],
  };
}

