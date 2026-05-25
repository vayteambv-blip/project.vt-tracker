import { SectionPage } from "@/components/section-page";

export default function DocumentsPage() {
  return (
    <SectionPage
      title="Documents"
      description="Project and firm files with current versions, archive versions, and email sending."
      focus={[
        "Separate project files from firm files.",
        "Keep the current version and archive versions visible.",
        "Allow open, download, restore, and email actions.",
        "Keep templates as neutral starting points.",
      ]}
      nextSteps={[
        "Build the document list and detail card.",
        "Add version history controls.",
        "Connect project and firm context switching.",
      ]}
    />
  );
}
