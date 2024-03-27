import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        basicSsl()
    ],
    server: {
        hmr: false,
        // port: 80
    },
})