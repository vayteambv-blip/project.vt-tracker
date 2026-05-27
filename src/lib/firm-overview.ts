export type FirmCard = {
  name: string;
  role: "Executor" | "Customer";
  status: "Active" | "Linked";
  workers: number;
  projects: number;
  paymentPath: string;
};

export const firmStats = [
  { label: "Firms total", value: "14" },
  { label: "Active firms", value: "9" },
  { label: "Workers tracked", value: "27" },
  { label: "Contracts linked", value: "11" },
];

export const firmCards: FirmCard[] = [
  {
    name: "Apex Roofing",
    role: "Executor",
    status: "Active",
    workers: 6,
    projects: 4,
    paymentPath: "Paid through project costs",
  },
  {
    name: "SkyLift",
    role: "Executor",
    status: "Linked",
    workers: 3,
    projects: 2,
    paymentPath: "Linked to one current project",
  },
  {
    name: "UrbanCraft",
    role: "Executor",
    status: "Active",
    workers: 5,
    projects: 3,
    paymentPath: "Paid through project costs",
  },
  {
    name: "FrameWorks",
    role: "Customer",
    status: "Active",
    workers: 4,
    projects: 1,
    paymentPath: "Uses project expense flow",
  },
];
