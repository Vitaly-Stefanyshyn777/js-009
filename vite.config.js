import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import SortCss from "postcss-sort-media-queries";

export default defineConfig(async ({ command }) => {
  const inputFiles = await glob("./src/*.html");

  return {
    // Вказуємо базовий шлях для коректної роботи на GitHub Pages
    base: "/js-009/", // Замініть на назву вашого репозиторію
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src",
    build: {
      sourcemap: true,
      rollupOptions: {
        input: inputFiles.length ? inputFiles : "./src/index.html",
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".html")) {
              return "[name].[ext]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      outDir: "../dist",
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(["./src/**/*.html"]),
      SortCss({
        sort: "mobile-first",
      }),
    ],
    optimizeDeps: {
      include: ["vite-plugin-html-inject", "vite-plugin-full-reload"],
      exclude: ["fsevents"],
    },
    logLevel: "info",
  };
});
