// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    server: {
        port: 8500,
    },
    env: {
        schema: {
            PUBLIC_API_BASE_URL: envField.string({
                context: 'client',
                access: 'public',
                optional: false,
            }),
        },
    },

    integrations: [react()],
});
