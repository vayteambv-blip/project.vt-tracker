export type ProjectCard = {
  name: string;
  direction: string;
  status: "Preparation" | "Current" | "Future" | "Archive";
  client: string;
  startDate: string;
  firms: string[];
  note: string;
};

export const projectStats = [
  { label: "Projects in focus", value: "12" },
  { label: "Ready for work", value: "4" },
  { label: "Waiting on quote", value: "3" },
  { label: "Archived", value: "28" },
];

export const projectCards: ProjectCard[] = [
  {
    name: "North Roof Renovation",
    direction: "Roof",
    status: "Current",
    client: "Brouwers Family",
    startDate: "27 May 2026",
    firms: ["Apex Roofing", "Nord Timber"],
    note: "Start date synced with calendar and progress report open.",
  },
  {
    name: "Brussels Facade Repair",
    direction: "Facade",
    status: "Preparation",
    client: "Van Dijk Properties",
    startDate: "Pending",
    firms: ["SteelFix", "SkyLift"],
    note: "Quote approved, waiting on final start date.",
  },
  {
    name: "Loft Interior Finish",
    direction: "Interior",
    status: "Future",
    client: "Mertens Residence",
    startDate: "12 June 2026",
    firms: ["UrbanCraft"],
    note: "Materials list and document archive already linked.",
  },
  {
    name: "House Frame Build",
    direction: "Global construction",
    status: "Archive",
    client: "De Smet Group",
    startDate: "Closed",
    firms: ["FrameWorks", "BetonPlus"],
    note: "Archived as a full closed project with version history intact.",
  },
];

export const projectFlowSteps = [
  "1. Validate client and firm data.",
  "2. Attach an approved quote and project direction.",
  "3. Set the start date and sync the calendar.",
  "4. Add documents, reports, photos, and materials.",
  "5. Track costs and profit inside finance.",
  "6. Close the project and restore it from archive if needed.",
];
