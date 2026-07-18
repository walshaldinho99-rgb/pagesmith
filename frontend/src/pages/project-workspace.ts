import type { Project } from "../types";
import { getProductLabel } from "../templates";

type WorkspaceActions = {
  back: () => void;
  addSection: (projectId: string) => void;
};

export function renderProjectWorkspace(
  app: HTMLDivElement,
  project: Project,
  actions: WorkspaceActions,
): void {
  app.innerHTML = `
    <main class="app">
      <header class="project-header">
        <button id="dashboard-button" class="text-button">
          ← All projects
        </button>

        <div class="project-title-row">
          <div>
            <p class="eyebrow">
              ${escapeHtml(getProductLabel(project.productType))}
            </p>

            <h1>${escapeHtml(project.name)}</h1>
          </div>

          <span class="status-badge">${project.status}</span>
        </div>

        <p class="project-purpose">
          ${escapeHtml(project.purpose)}
        </p>
      </header>

      <div class="workspace-grid">
        <aside class="project-summary">
          <p class="eyebrow">PRODUCT DETAILS</p>

          <dl>
            <div>
              <dt>Type</dt>
              <dd>
                ${escapeHtml(getProductLabel(project.productType))}
              </dd>
            </div>

            <div>
              <dt>Audience</dt>
              <dd>${escapeHtml(project.audience)}</dd>
            </div>

            <div>
              <dt>Sections</dt>
              <dd>${project.outline.length}</dd>
            </div>
          </dl>
        </aside>

        <section class="outline-panel">
          <div class="section-heading">
            <div>
              <p class="eyebrow">BLUEPRINT</p>
              <h3>Product Structure</h3>
            </div>

            <button
              id="add-section-button"
              class="secondary-button"
            >
              Add Section
            </button>
          </div>

          <div class="outline-list">
            ${renderOutline(project)}
          </div>
        </section>
      </div>
    </main>
  `;

  document
    .querySelector<HTMLButtonElement>("#dashboard-button")
    ?.addEventListener("click", actions.back);

  document
    .querySelector<HTMLButtonElement>("#add-section-button")
    ?.addEventListener("click", () => {
      actions.addSection(project.id);
    });
}

function renderOutline(project: Project): string {
  return project.outline
    .map(
      (section, index) => `
        <article class="outline-item">
          <span class="outline-number">${index + 1}</span>

          <div>
            <p class="project-label">SECTION</p>
            <h4>${escapeHtml(section)}</h4>
          </div>
        </article>
      `,
    )
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#039;");
}