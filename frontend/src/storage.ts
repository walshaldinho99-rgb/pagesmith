import type { Project } from "./types";

const STORAGE_KEY = "pagesmith-projects";

export function loadProjects(): Project[] {
  const storedProjects = localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    return [];
  }

  try {
    return JSON.parse(storedProjects) as Project[];
  } catch {
    console.error("PageSmith could not read saved projects.");
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projects),
  );
}