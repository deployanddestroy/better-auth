import { betterAuth } from "better-auth";
import { bearer } from 'better-auth/plugins';
import { Pool } from "pg";
import { getRequestURL } from "h3";

// Define the return type for the auth instance
let _auth: ReturnType<typeof betterAuth> | null = null;

// Function to initialize (if null) and return the auth instance
export default function serverAuth() {
    if (!_auth) {
        _auth = betterAuth({
            database: new Pool({
                connectionString: process.env.DATABASE_URL
            }),
            baseUrl: getBaseURL(),
            emailAndPassword: {
                enabled: true
            },
            plugins: [bearer()],
            trustedOrigins: [process.env.IONIC_ORIGIN || 'http://localhost:8100']
        });
    }
    return _auth;
}

// Get base URL from env config if exists, otherwise determine from request URL
function getBaseURL() {
    let baseURL = process.env.BETTER_AUTH_URL
    if (!baseURL) {
        try {
            baseURL = getRequestURL(useEvent()).origin
        }
        catch (e) { }
    }
    return baseURL
}