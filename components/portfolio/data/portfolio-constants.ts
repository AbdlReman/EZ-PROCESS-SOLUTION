import { projects } from "@/lib/projects";

export const portfolioCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];
