import "./styles.css";

import type { Project } from "./types";

import {
  loadProjects,
  saveProjects,
} from "./storage";

import { renderDashboard } from "./pages/dashboard";
import { renderCreateProduct } from "./pages/create-product";
import { renderProjectWorkspace } from "./pages/project-workspace";

const app = document.querySelector<HTMLDivElement>("#app")!;

if (!app) {
  throw new Error(
    "PageSmith could not find the application container.",
  );
}

let projects: Project[] = loadProjects();

function showDashboard(): void {
  renderDashboard(app, projects, {
    createProduct: showCreateProduct,
    openProject: showProject,
  });
}

function showCreateProduct(): void {
  renderCreateProduct(app, {
    cancel: showDashboard,

    save: (project) => {
      projects.unshift(project);
      saveProjects(projects);
      showProject(project.id);
    },
  });
}

function showProject(projectId: string): void {
  const project = projects.find(
    (item) => item.id === projectId,
  );

  if (!project) {
    showDashboard();
    return;
  }

  renderProjectWorkspace(app, project, {
    back: showDashboard,
    addSection,
  });
}

function addSection(projectId: string): void {
  const project = projects.find(
    (item) => item.id === projectId,
  );

  if (!project) {
    return;
  }

  const sectionName = window.prompt(
    "Enter the section name:",
  );

  if (!sectionName?.trim()) {
    return;
  }

  project.outline.push(sectionName.trim());

  saveProjects(projects);
  showProject(project.id);
}

showDashboard();
