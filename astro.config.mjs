// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
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
