import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    exclude: ["app/**/*.e2e.test.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["vitest/register-jest-dom.ts", "vitest/cleanup-after-each.ts"],
  },
});
