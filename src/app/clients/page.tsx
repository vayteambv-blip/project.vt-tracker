import { SectionPage } from "@/components/section-page";

export default function ClientsPage() {
  return (
    <SectionPage
      title="Clients"
      description="Private clients and company customers with project links and completeness checks."
      focus={[
        "Create and update private clients or company customers.",
        "Check completeness before save.",
        "Show linked projects from the client card.",
        "Keep client data separate from documents.",
      ]}
      nextSteps={[
        "Add a client list with search and filters.",
        "Connect the client card to project creation.",
        "Build empty states and validation messages.",
      ]}
    />
  );
}
