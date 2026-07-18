import type { Project } from "../types";
import { getProductLabel } from "../templates";

type DashboardActions = {
  createProduct: () => void;
  openProject: (projectId: string) => void;
};

export function renderDashboard(
  app: HTMLDivElement,
  projects: Project[],
  actions: DashboardActions,
): void {
  app.innerHTML = `
    <main class="app">
      <header class="topbar">
        <div>
          <p class="eyebrow">DIGITAL PUBLISHING WORKSPACE</p>
          <h1>PageSmith</h1>
        </div>

        <button id="new-product-button" class="primary-button">
          New Product
        </button>
      </header>

      <section class="hero compact-hero">
        <p class="eyebrow">YOUR WORKSPACE</p>
        <h2>Create and manage your digital products.</h2>
      </section>

      <section class="projects-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">YOUR WORK</p>
            <h3>Projects</h3>
          </div>

          <span class="project-count">
            ${projects.length}
            ${projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div id="project-list">
          ${renderProjectList(projects)}
        </div>
      </section>
    </main>
  `;

  document
    .querySelector<HTMLButtonElement>("#new-product-button")
    ?.addEventListener("click", actions.createProduct);

  document
    .querySelector<HTMLButtonElement>("#empty-create-button")
    ?.addEventListener("click", actions.createProduct);

  document
    .querySelectorAll<HTMLButtonElement>("[data-project-id]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const projectId = button.dataset.projectId;

        if (projectId) {
          actions.openProject(projectId);
        }
      });
    });
}

function renderProjectList(projects: Project[]): string {
  if (projects.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-icon">P</div>
        <h4>No projects yet</h4>

        <p>
          Create your first product and PageSmith will build its
          starting structure.
        </p>

        <button id="empty-create-button" class="primary-button">
          Create a Product
        </button>
      </div>
    `;
  }

  const cards = projects
    .map(
      (project) => `
        <button
          class="project-card project-card-button"
          data-project-id="${project.id}"
        >
          <div class="project-card-icon">P</div>

          <div class="project-card-content">
            <p class="project-label">
              ${escapeHtml(getProductLabel(project.productType))}
            </p>

            <h4>${escapeHtml(project.name)}</h4>

            <p class="project-meta">
              ${project.outline.length} sections · ${project.status}
            </p>
          </div>
        </button>
      `,
    )
    .join("");

  return `<div class="project-grid">${cards}</div>`;
}

function escapeHtml(value: string): string {
  return value
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#039;");
}