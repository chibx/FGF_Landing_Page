import { cpSync, rmSync } from "fs";
import { build } from "vite";
import build$1 from "@hono/vite-build";

// Default Vue.js frontend
await build({
  configFile: "vite.config.ts",
});

cpSync("./dist", "./static", { recursive: true });
rmSync("./dist", { recursive: true });
cpSync("./static", "./dist/static", { recursive: true });
rmSync("./static", { recursive: true });

// Hono Build

await build({
  plugins: [
    build$1({
      emptyOutDir: false,
      entry: "backend/server.ts",
      output: "index.js",
    }),
  ],
  appType: "custom",
  build: {
    outDir: "dist/api",
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});

console.log("DONE!!!!");
