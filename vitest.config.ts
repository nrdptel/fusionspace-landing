import { defineConfig } from "vitest/config";

// Unit tests for the framework-free logic (the project catalog + the live-stats
// formatter). Node environment — these don't need a DOM. End-to-end browser
// coverage lives in e2e/ (Playwright).
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
