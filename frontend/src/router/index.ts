import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import { Preferences } from '@capacitor/preferences';
import { useAuthClient } from '@/composables/useAuthClient';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        meta: { requiresAuth: true },
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupPage
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;

    let { value: authToken } = await Preferences.get({ key: 'auth_token' });
    if (!authToken) {
        const authClient = useAuthClient();
        const session = await authClient.getSession();
        authToken = session?.data?.session?.token || null;
    }

    if (requiresAuth && !authToken) {
        // If the route requires auth AND we don't have a token, redirect to login
        console.log('Access blocked. Redirecting to landing.');
        next('/login');
    } else if (!requiresAuth && authToken) {
        // If the route is login/register AND we already have a token, redirect to home
        console.log('Already logged in. Redirecting to home.');
        next('/');
    } else {
        // Otherwise, allow navigation to proceed
        next();
    }
});

export default router
