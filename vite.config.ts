import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/main.tsx", // Main entry point of your widget
      name: "MyWidget", // The global name of your widget
      fileName: "my-widget", // The output filename
      formats: ["umd"], // Universal Module Definition format for compatibility
    },
    rollupOptions: {
      // Externalize dependencies if needed
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
