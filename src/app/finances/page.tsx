import { SectionPage } from "@/components/section-page";

export default function FinancesPage() {
  return (
    <SectionPage
      title="Finances"
      description="Costs, invoice flow, firm payments, remaining balance, and profit calculation."
      focus={[
        "Keep financial data inside finance only.",
        "Show total cost, remaining balance, and profit.",
        "Track firm payments through project expenses.",
        "Keep the project card free of duplicated totals.",
      ]}
      nextSteps={[
        "Build categories for costs and additional work.",
        "Add the summary block and totals.",
        "Connect firm payments to the project finance stream.",
      ]}
    />
  );
}
