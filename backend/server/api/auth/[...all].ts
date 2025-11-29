import { defineEventHandler } from "h3";
import serverAuth from "~/utils/auth";

export default defineEventHandler((event) => {
    const auth = serverAuth();
    return auth.handler(toWebRequest(event));
});