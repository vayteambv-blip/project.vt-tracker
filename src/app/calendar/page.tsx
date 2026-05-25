import { SectionPage } from "@/components/section-page";

export default function CalendarPage() {
  return (
    <SectionPage
      title="Calendar"
      description="Planning view for project start dates, working ranges, and reminder timing."
      focus={[
        "Show projects by direction and by month.",
        "Sync start date with the project card.",
        "Hide projects without a start date.",
        "Keep notifications tied to the project date.",
      ]}
      nextSteps={[
        "Create month navigation and filters.",
        "Add current and future calendar states.",
        "Link calendar rows to the project detail page.",
      ]}
    />
  );
}
