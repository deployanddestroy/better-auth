import { defineEventHandler } from "h3";

export default defineEventHandler({
    onRequest: [requireAuth],
    handler: async (event) => {
        return 'Hello from index.get.ts!';
    }
});
