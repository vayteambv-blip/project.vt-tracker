import { SectionPage } from "@/components/section-page";

export default function ProjectsPage() {
  return (
    <SectionPage
      title="Projects"
      description="The main work unit: client, one direction, start date, firms, documents, photos, reports, materials, and finances."
      focus={[
        "Create a project with an approved quote.",
        "Show project status and start date clearly.",
        "Show firms, docs, reports, and materials inside the project.",
        "Move finished projects to archive and back again.",
      ]}
      nextSteps={[
        "Build the project shell and detail layout.",
        "Add the create-project flow with validation.",
        "Connect project cards to the calendar and finance views.",
      ]}
    />
  );
}
