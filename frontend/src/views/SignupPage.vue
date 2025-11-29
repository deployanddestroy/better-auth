<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Sign Up</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input label-placement="floating" placeholder="Email" v-model="state.email" type="text"
                label="Email Address" value=""></ion-input>
            <ion-input label-placement="floating" placeholder="Password" v-model="state.password" type="password"
                label="Password" value="">
            </ion-input>
            <ion-button @click="signUp" expand="block">Sign Up</ion-button>
            <p>or <RouterLink to="/login">Log in</RouterLink>
            </p>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { IonPage, IonContent, IonButton, IonInput, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';
import { useAuthClient } from '@/composables/useAuthClient';
import { useRouter } from 'vue-router';

const client = useAuthClient();
const router = useRouter();

const state = reactive({
    email: '',
    password: ''
});

const signUp = async () => {

    const { error } = await client.signUp.email({
        name: state.email, // gotta pass this in for some reason...
        email: state.email,
        password: state.password,
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
        router.push('/');
    }
}
</script>