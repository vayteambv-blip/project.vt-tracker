export type SiteSection = {
  label: string;
  href: string;
  summary: string;
};

export const primarySections: SiteSection[] = [
  {
    label: "Clients",
    href: "/clients",
    summary: "Private clients and company customers with project links.",
  },
  {
    label: "Firms",
    href: "/firms",
    summary: "Subcontractors, workers, contracts, and firm files.",
  },
  {
    label: "Projects",
    href: "/projects",
    summary: "Project core, start dates, firms, docs, photos, and finances.",
  },
  {
    label: "Calendar",
    href: "/calendar",
    summary: "Planning view for start dates and upcoming work.",
  },
  {
    label: "Finances",
    href: "/finances",
    summary: "Costs, invoice flow, profit, and firm payments.",
  },
  {
    label: "Documents",
    href: "/documents",
    summary: "Current files, archive versions, and template files.",
  },
  {
    label: "Reports",
    href: "/reports",
    summary: "Progress reports with text, dates, and photos.",
  },
  {
    label: "Archive",
    href: "/archive",
    summary: "Closed projects kept searchable by year and client.",
  },
];

export const projectFlow = [
  "Create or open a project.",
  "Check client, address, quote, and contacts.",
  "Assign a start date and calendar presence.",
  "Add firms, documents, photos, reports, and materials.",
  "Track costs and result in finances.",
  "Close the project and return it from archive when needed.",
];
