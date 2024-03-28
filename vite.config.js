import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        basicSsl()
    ],
    server: {
        hmr: false,
        // port: 80
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
})