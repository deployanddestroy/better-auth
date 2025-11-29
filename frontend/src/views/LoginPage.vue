<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Log In</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input label-placement="floating" placeholder="Email" v-model="state.email" type="text"
                label="Email Address" value=""></ion-input>
            <ion-input label-placement="floating" placeholder="Password" v-model="state.password" type="password"
                label="Password" value="">
            </ion-input>
            <ion-button @click="logIn" expand="block">Log in</ion-button>
            <p>or <RouterLink to="/signup">Sign Up</RouterLink>
            </p>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { IonPage, IonContent, IonButton, IonInput, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { useAuthClient } from '@/composables/useAuthClient';

const client = useAuthClient();

const state = reactive({
    email: 'dnd@deployanddestroy.xyz',
    password: 'abcd1234!'
});

const logIn = async () => {

    const { error } = await client.signIn.email({
        email: state.email,
        password: state.password,
        rememberMe: true,
        callbackURL: '/'
    })

    if (error) {
        console.error('Login error:', error.message);
    } else {
        const token = (await client.getSession()).data?.session?.token;
        await Preferences.set({
            key: 'auth_token',
            value: token || ''
        });
    }
}
</script>