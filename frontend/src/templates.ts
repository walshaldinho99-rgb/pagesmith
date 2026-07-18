import type { ProductType } from "./types";

export function getProductLabel(
  productType: ProductType,
): string {
  const labels: Record<ProductType, string> = {
    journal: "Journal",
    planner: "Planner",
    workbook: "Workbook",
    guide: "Guide",
  };

  return labels[productType];
}

export function createOutline(
  productType: ProductType,
): string[] {
  const templates: Record<ProductType, string[]> = {
    journal: [
      "Cover Page",
      "Welcome",
      "How to Use This Journal",
      "Personal Goals",
      "Daily Entry Template",
      "Weekly Reflection",
      "Final Reflection",
    ],

    planner: [
      "Cover Page",
      "Planner Overview",
      "Goals",
      "Yearly Overview",
      "Monthly Planning Page",
      "Weekly Planning Page",
      "Daily Planning Page",
      "Notes",
    ],

    workbook: [
      "Cover Page",
      "Introduction",
      "Learning Goals",
      "Section One",
      "Section One Activity",
      "Section Two",
      "Section Two Activity",
      "Review Exercise",
      "Next Steps",
    ],

    guide: [
      "Cover Page",
      "Introduction",
      "Who This Guide Is For",
      "Getting Started",
      "Main Topic One",
      "Main Topic Two",
      "Main Topic Three",
      "Practical Checklist",
      "Conclusion",
    ],
  };

  return [...templates[productType]];
}