import { defineNitroConfig } from "nitropack/config"

// https://nitro.build/config
export default defineNitroConfig({
    compatibilityDate: "latest",
    srcDir: "server",
    imports: {},
    experimental: {
        database: true,
        asyncContext: true
    },
    database: {
        default: {
            connector: 'postgresql',
            options: {
                url: process.env.DATABASE_URL
            }
        }
    },
    routeRules: { // this is required for api server to work with ionic dev server
        "/api/**": {
            cors: true,
            headers: {
                'access-control-allow-methods': 'GET,POST,OPTIONS,PUT,DELETE',
                'access-control-allow-origin': 'http://localhost:8100',
                'access-control-allow-headers': '*',
                'access-control-allow-credentials': 'true'
            }
        }
    }
});
