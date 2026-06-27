import { expect, test } from "@playwright/test";

test("home page renders the hero and the flagship project", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Fusion Space");
  await expect(
    page.getByRole("heading", { name: "Free, polished tools for high-power rocketry." }),
  ).toBeVisible();
  // The hero CTA links straight into the tool.
  await expect(page.getByRole("link", { name: /Open Motor Finder/ })).toHaveAttribute(
    "href",
    "https://motor.fusionspace.co",
  );
});

test("a project card navigates to its detail page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /HPR Motor Finder/ }).first().click();
  await expect(page).toHaveURL(/\/projects\/motor-finder\/?$/);
  await expect(page.getByRole("heading", { level: 1, name: "HPR Motor Finder" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What it does" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Visit motor\.fusionspace\.co/ }).first(),
  ).toHaveAttribute("href", "https://motor.fusionspace.co");
});

test("the theme toggle cycles System, Light, Dark", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /Color theme/ });
  await expect(toggle).toHaveText(/System/);
  await toggle.click();
  await expect(toggle).toHaveText(/Light/);
  await toggle.click();
  await expect(toggle).toHaveText(/Dark/);
});
