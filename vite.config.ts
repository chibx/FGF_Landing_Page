import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import devServer from "@hono/vite-dev-server";
import { build } from "@hono/vite-build/node";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    devServer({
      entry: "backend/server.ts",
    }),
    build({
      // Defaults are `src/index.ts`,`./src/index.tsx`,`./app/server.ts`
      entry: "./src/index.tsx",
      // port option is only for Node.js adapter. Default is 3000
      port: 3001,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
