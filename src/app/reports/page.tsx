import { SectionPage } from "@/components/section-page";

export default function ReportsPage() {
  return (
    <SectionPage
      title="Reports"
      description="Project progress reports with title, text, photos, and creation date."
      focus={[
        "Create and edit project reports.",
        "Keep report photos separate from process photos.",
        "Sort reports by creation date.",
        "Open and remove reports from the report list.",
      ]}
      nextSteps={[
        "Build report cards with quick access.",
        "Add text and photo inputs.",
        "Connect reports to the project overview.",
      ]}
    />
  );
}
