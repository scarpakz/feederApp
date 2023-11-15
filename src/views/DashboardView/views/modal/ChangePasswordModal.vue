<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title class="text-center">Change Password</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="confirm" :strong="true">Confirm</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-input type="password" label-placement="stacked" label="Enter your new password" v-model="password" placeholder="Your password"></ion-input>
        </ion-item>
    </ion-content>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    modalController,
    toastController
} from '@ionic/vue';
import { ref } from 'vue';
import axios from 'axios';

export default {
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonButton,
        IonItem,
        IonInput
    },
    setup() {
        const password = ref();
        const cancel = () => modalController.dismiss(null, 'cancel')
        const confirm = async () => {
            await changePassword()
            modalController.dismiss(password.value, 'confirm')
            presentToast('top')
        }

        const changePassword = async () => {
            await axios.post('http://localhost:3000/update-password', {
                password: password.value,
            });
        }

        /**
         * 'top' | 'middle' | 'bottom'
         * @param {*} position 
         */
        async function presentToast(position) {
            const toast = await toastController.create({
                message: 'Password was changed successfully!',
                duration: 1500,
                position: position,
                cssClass: 'password-toast',
                color: 'success',
                header: "Change Password",
                animated: true
            })

            await toast.present()
        }

        return {
            password,
            cancel,
            confirm,
            presentToast
        }
    }
}
</script>

<style>
.text-center {
    text-align: center;
}
.password-toast.toast-wrapper {
    background-color: green !important;
}
</style>