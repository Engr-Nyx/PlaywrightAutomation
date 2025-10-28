import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
  const titleScreenshot = await page.screenshot({
    path: "./artifacts/hasTitle.png",
    fullPage: true,
  });
  allure.attachment("Manual Screenshot", titleScreenshot, "image/png");
});
