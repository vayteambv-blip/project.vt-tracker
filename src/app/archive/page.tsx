import { SectionPage } from "@/components/section-page";

export default function ArchivePage() {
  return (
    <SectionPage
      title="Archive"
      description="Closed projects kept searchable by year, month, client, and direction."
      focus={[
        "Move finished projects to archive manually.",
        "Restore a project as the same project with a new start date.",
        "Search archived projects by year and client.",
        "Keep archive separate from current work.",
      ]}
      nextSteps={[
        "Build archive filters and grouping by direction.",
        "Add year and month navigation.",
        "Open archived projects with their full closing state.",
      ]}
    />
  );
}
