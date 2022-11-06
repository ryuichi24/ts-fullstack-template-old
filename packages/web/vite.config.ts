import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
// https://vitejs.dev/config/server-options.html
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3333,
    },
    // https://stackoverflow.com/a/68250175/13723015
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
});
