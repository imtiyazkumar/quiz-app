import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
    base: "/quiz-app/", // Set to your repo name if it's different
    plugins: [
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: './node_modules/.bin/eslint "./src/**/*.{ts,tsx}"',
            },
        })
    ],
});
