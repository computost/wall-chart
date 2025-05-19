import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ["app/**/*.e2e.test.ts"],
    projects: [
      {
        extends: true,
        test: {
          environment: "jsdom",
          include: ["app/**/*.client.test.{ts,tsx}"],
          name: "client",
          setupFiles: ["vitest/register-jest-dom.ts"],
        },
      },
      {
        extends: true,
        test: {
          environment: "node",
          include: ["app/**/*.server.test.ts"],
          name: "server",
        },
      },
    ],
    setupFiles: ["vitest/cleanup-after-each.ts"],
  },
});
