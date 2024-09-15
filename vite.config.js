import { defineConfig } from "vite";
import path from "path"; // Додано імпорт модуля path

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/js-009/" : "/",
  root: "src",
  build: {
    sourcemap: true,
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/index.html"), // Оновлено шлях до index.html
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
  },
  define: {
    [command === "serve" ? "global" : "_global"]: {},
  },
  plugins: [],
  optimizeDeps: {
    exclude: ["fsevents"],
  },
  logLevel: "info",
}));
