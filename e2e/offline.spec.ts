import { expect, test } from "@playwright/test";

// The production build registers a service worker for offline use. The rest of the
// suite blocks service workers for determinism; this file opts back in to verify the
// offline behavior for real, in the browser.
test.use({ serviceWorkers: "allow" });

test("registers a service worker and serves the page offline", async ({ page, context }) => {
  await page.goto("/");

  // The worker installs, activates, and calls clients.claim() — wait until it controls
  // this page.
  await page.waitForFunction(() => navigator.serviceWorker?.controller != null, null, {
    timeout: 15_000,
  });

  // Reload once while online now that the worker controls the page, so the shell and
  // its assets get cached (install precaches "/", the fetch handler caches the rest).
  await page.reload();
  await page.waitForLoadState("networkidle");

  // Cut the network and reload — the worker must serve the cached page.
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Free, polished tools for high-power rocketry." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /HPR Motor Finder/ })).toBeVisible();

  await context.setOffline(false);
});
