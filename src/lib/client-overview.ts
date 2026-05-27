export type ClientCard = {
  name: string;
  type: "Private" | "Company";
  status: "Complete" | "In progress";
  address: string;
  phone: string;
  email: string;
  projects: number;
};

export const clientStats = [
  { label: "Clients total", value: "18" },
  { label: "Private clients", value: "11" },
  { label: "Company customers", value: "7" },
  { label: "Needs review", value: "3" },
];

export const clientCards: ClientCard[] = [
  {
    name: "Brouwers Family",
    type: "Private",
    status: "Complete",
    address: "Antwerp, Belgium",
    phone: "+32 470 11 22 33",
    email: "brouwers@example.com",
    projects: 2,
  },
  {
    name: "Van Dijk Properties",
    type: "Company",
    status: "In progress",
    address: "Ghent, Belgium",
    phone: "+32 470 44 55 66",
    email: "contact@vandijkproperties.be",
    projects: 4,
  },
  {
    name: "Mertens Residence",
    type: "Private",
    status: "Complete",
    address: "Bruges, Belgium",
    phone: "+32 470 77 88 99",
    email: "mertens@example.com",
    projects: 1,
  },
  {
    name: "De Smet Group",
    type: "Company",
    status: "In progress",
    address: "Leuven, Belgium",
    phone: "+32 470 12 34 56",
    email: "office@desmetgroup.be",
    projects: 3,
  },
];
