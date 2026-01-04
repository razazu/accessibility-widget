import { defineConfig } from "tsup";

export default defineConfig([
  // React build (ESM + CJS with TypeScript declarations)
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom"],
    injectStyle: false,
    outDir: "dist",
  },
  // Vanilla JS build (IIFE for browser script tag)
  {
    entry: { "accessibility-widget": "src/vanilla.ts" },
    format: ["iife"],
    globalName: "AccessibilityWidget",
    splitting: false,
    sourcemap: true,
    clean: false,
    minify: true,
    outDir: "dist",
    outExtension: () => ({ js: ".min.js" }),
  },
]);
