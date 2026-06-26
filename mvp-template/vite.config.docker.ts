/**
 * Docker / Node.js server: no Cloudflare plugin, node preset so Nitro emits
 * dist/server/server.js (a real Node HTTP server) alongside dist/client/ (static assets).
 * The Node server handles both API routes and static file serving.
 */
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
    ],
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: {
        preset: "node",
      },
    }),
    viteReact(),
  ],
});
