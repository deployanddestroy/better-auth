import { defineEventHandler } from "h3";

// Default origin in case env var is missing
const defaultOrigin = 'http://localhost:8100';

export default defineEventHandler((event) => {
    const req = event.node.req;
    const res = event.node.res;

    // Set the Access-Control-Allow-Origin header to allow for the Ionic app
    res.setHeader('Access-Control-Allow-Origin', process.env.IONIC_ORIGIN || defaultOrigin);

    // Set the headers that the Ionic app is allowed to send
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Set the HTTP methods the Ionic app is allowed to use
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // If OPTIONS, immediately respond to short circuit
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
    }
});