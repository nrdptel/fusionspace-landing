import { expect, test } from "@playwright/test";

test("home page renders the hero and projects", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Fusion Space");
  await expect(
    page.getByRole("heading", { name: "Free, polished tools for high-power rocketry." }),
  ).toBeVisible();
  // The hero CTA points at the projects section (neutral, not a single tool).
  await expect(page.getByRole("link", { name: "Browse the tools" })).toHaveAttribute(
    "href",
    "#projects",
  );
  // The live projects are listed...
  await expect(page.getByRole("link", { name: /HPR Motor Finder/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Charge/ })).toBeVisible();
  // ...and the in-development one is shown with its status.
  await expect(page.getByRole("link", { name: /^Debrief/ })).toBeVisible();
  await expect(page.getByText("In development").first()).toBeVisible();
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

test("the theme choice persists across a reload", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /Color theme/ });
  await toggle.click(); // -> Light
  await toggle.click(); // -> Dark
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);

  await page.reload();
  // The inline script in layout.tsx re-applies the stored choice before paint.
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  await expect(page.getByRole("button", { name: /Color theme/ })).toHaveText(/Dark/);
});

test("unknown routes render the 404 page", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Back home/ })).toHaveAttribute("href", "/");
});
