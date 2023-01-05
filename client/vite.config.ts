import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
    ],
  };
});
