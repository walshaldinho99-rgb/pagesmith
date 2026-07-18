import type { ProductType, Project } from "../types";
import { createOutline } from "../templates";

type CreateProductActions = {
  cancel: () => void;
  save: (project: Project) => void;
};

export function renderCreateProduct(
  app: HTMLDivElement,
  actions: CreateProductActions,
): void {
  app.innerHTML = `
    <main class="app narrow-app">
      <header class="simple-header">
        <button id="back-button" class="text-button">
          ← Back to projects
        </button>

        <p class="eyebrow">NEW PRODUCT</p>
        <h1>Create your product</h1>

        <p>
          Give PageSmith the information it needs to build your
          starting structure.
        </p>
      </header>

      <form id="create-product-form" class="creation-form">
        <div class="form-group">
          <label for="product-name">Product name</label>

          <input
            id="product-name"
            name="productName"
            type="text"
            placeholder="For example: 30 Days of Peace"
            required
            maxlength="100"
          />
        </div>

        <div class="form-group">
          <label for="product-type">Product type</label>

          <select
            id="product-type"
            name="productType"
            required
          >
            <option value="journal">Journal</option>
            <option value="planner">Planner</option>
            <option value="workbook">Workbook</option>
            <option value="guide">Guide</option>
          </select>
        </div>

        <div class="form-group">
          <label for="audience">Who is it for?</label>

          <input
            id="audience"
            name="audience"
            type="text"
            placeholder="For example: Busy parents"
            required
            maxlength="150"
          />
        </div>

        <div class="form-group">
          <label for="purpose">
            What should it help them achieve?
          </label>

          <textarea
            id="purpose"
            name="purpose"
            rows="4"
            required
            maxlength="500"
          ></textarea>
        </div>

        <div class="form-actions">
          <button
            type="button"
            id="cancel-button"
            class="secondary-button"
          >
            Cancel
          </button>

          <button type="submit" class="primary-button">
            Create Product
          </button>
        </div>
      </form>
    </main>
  `;

  document
    .querySelector<HTMLButtonElement>("#back-button")
    ?.addEventListener("click", actions.cancel);

  document
    .querySelector<HTMLButtonElement>("#cancel-button")
    ?.addEventListener("click", actions.cancel);

  document
    .querySelector<HTMLFormElement>("#create-product-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const name = String(
        formData.get("productName") ?? "",
      ).trim();

      const productType = String(
        formData.get("productType") ?? "journal",
      ) as ProductType;

      const audience = String(
        formData.get("audience") ?? "",
      ).trim();

      const purpose = String(
        formData.get("purpose") ?? "",
      ).trim();

      if (!name || !audience || !purpose) {
        return;
      }

      const project: Project = {
        id: crypto.randomUUID(),
        name,
        productType,
        audience,
        purpose,
        status: "Blueprint",
        createdAt: new Date().toISOString(),
        outline: createOutline(productType),
      };

      actions.save(project);
    });
}
