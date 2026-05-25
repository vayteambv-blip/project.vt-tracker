import { SectionPage } from "@/components/section-page";

export default function FirmsPage() {
  return (
    <SectionPage
      title="Firms"
      description="Subcontractors, contracts, workers, and project roles in one separate workspace."
      focus={[
        "Keep firm records separate from clients.",
        "Show workers, contracts, and linked projects.",
        "Keep firm payments inside project finance.",
        "Avoid fixed specialization on the firm itself.",
      ]}
      nextSteps={[
        "Build the firm overview layout.",
        "Connect worker history to the firm card.",
        "Add firm search and completeness checks.",
      ]}
    />
  );
}
