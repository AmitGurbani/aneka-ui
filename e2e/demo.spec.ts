import { test, expect } from "@playwright/test";

test.describe("Demo App", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check that the page loaded successfully
    await expect(page).toHaveTitle(/Aneka UI/i);
  });

  test("should display components", async ({ page }) => {
    await page.goto("/");

    // Check for buttons
    const buttons = page.locator("button");
    await expect(buttons.first()).toBeVisible();
  });
});
