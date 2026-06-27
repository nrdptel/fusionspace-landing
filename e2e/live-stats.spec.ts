import { expect, test } from "@playwright/test";

// The live stat line is fetched client-side from the Motor Finder API. Mock that
// response so the test verifies *our* rendering (and never depends on the live
// service being up).
test("renders the live stat line from the API response", async ({ page }) => {
  await page.route("**/api/v1/meta.json", (route) =>
    route.fulfill({
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ counts: { motors: 1234, in_stock: 567, vendors: 9 } }),
    }),
  );

  await page.goto("/projects/motor-finder");
  await expect(
    page.getByText("1,234 motors · 567 in stock now · 9 vendors · updated hourly"),
  ).toBeVisible();
});

// If the API fails, the line must simply be absent — the page still reads fine.
test("omits the stat line when the API fails", async ({ page }) => {
  await page.route("**/api/v1/meta.json", (route) => route.fulfill({ status: 500, body: "" }));

  await page.goto("/projects/motor-finder");
  await expect(page.getByRole("heading", { level: 1, name: "HPR Motor Finder" })).toBeVisible();
  await expect(page.getByText(/updated hourly/)).toHaveCount(0);
});
