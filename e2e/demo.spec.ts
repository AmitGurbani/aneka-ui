import { test, expect } from "@playwright/test";

test.describe("Demo App", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check that the page loaded successfully
    await expect(page).toHaveTitle(/Aneka UI/i);
  });

  test("should display Material Design components", async ({ page }) => {
    await page.goto("/material");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check for button components
    const buttons = page.locator("button");
    await expect(buttons.first()).toBeVisible();

    // Check for heading
    await expect(
      page.getByRole("heading", { name: "Material Design" })
    ).toBeVisible();
  });
});
