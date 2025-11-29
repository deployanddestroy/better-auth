import { createAuthClient } from "better-auth/vue";
import { Preferences } from '@capacitor/preferences';

export const useAuthClient = () => {
    return createAuthClient({
        baseURL: 'http://localhost:3025', // point this to where your nitro server with better auth is running
        basePath: '/api/auth',
        fetchOptions: {
            credentials: 'include',
            onSuccess: async (ctx) => {
                const authToken = ctx.response.headers.get('set-auth-token');
                if (authToken) {
                    await Preferences.set({ key: 'auth_token', value: authToken });
                }
            },
            auth: {
                type: 'Bearer',
                token: async () => (await Preferences.get({ key: 'auth_token' }))?.value || ''
            }
        },
    });
}