export type ProductType =
  | "journal"
  | "planner"
  | "workbook"
  | "guide";

export type ProjectStatus = "Blueprint";

export type Project = {
  id: string;
  name: string;
  productType: ProductType;
  audience: string;
  purpose: string;
  status: ProjectStatus;
  createdAt: string;
  outline: string[];
};