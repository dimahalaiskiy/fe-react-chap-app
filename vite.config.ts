import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import replace from "@rollup/plugin-replace";
import path from "path";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    replace({
      "process.env.ENV_TYPE": JSON.stringify(process.env.NODE_ENV || "development"),
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
      preventAssignment: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
