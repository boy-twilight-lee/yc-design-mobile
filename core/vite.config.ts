import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    cssCodeSplit: true,
  },
  plugins: [vue(), dts()],
});