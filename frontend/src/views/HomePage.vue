<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Blank</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Blank</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <p>Hello, this is the Home Page.</p>
                <p>{{ greeting }}</p>
                <ion-button @click="signOut">Sign Out</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { useAuthClient } from '@/composables/useAuthClient';
import { Preferences } from '@capacitor/preferences';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const authClient = useAuthClient();
const router = useRouter();
const greeting = ref('');

const signOut = async () => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: async () => {
                await Preferences.remove({ key: 'auth_token' });
                router.push('/login');
            }
        }
    });
}

const fetchGreeting = async () => {
    const authToken = await Preferences.get({ key: 'auth_token' });
    const options: HttpOptions = {
        url: 'http://localhost:3025/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken.value}`
        }
    }

    const response: HttpResponse = await CapacitorHttp.get(options);
    greeting.value = response.data;
}

onMounted(async () => {
    await fetchGreeting();
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
