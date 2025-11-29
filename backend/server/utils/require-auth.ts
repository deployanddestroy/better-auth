import { EventHandler, H3Event, createError } from "h3";
import serverAuth from "./auth";

/**
 * Middleware used to require authentication for a route.
 * Currently just checks if there's a session...
 * ...but can be extended to check for specific roles or permissions.
 */
export const requireAuth: EventHandler = async (event: H3Event) => {
    const auth = serverAuth();
    const headers = event.headers;
    const session = await auth.api.getSession({
        headers: headers,
    });
    if (!session)
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    // Save the session to the event context for later use
    event.context.auth = session;
};