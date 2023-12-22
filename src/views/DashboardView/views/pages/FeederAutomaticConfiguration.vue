<template>
    <ion-page class="flex-direction-unset">
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12">
                    <h1 class="config-title">Feeder Automatic Settings</h1>
                </ion-col>
                <ion-col size="12">
                    <div class="configuration-container">
                        <div><button class="back-btn" @click="router.push({name: 'Home'})"><ion-icon :icon="arrowBackOutline"></ion-icon> Back</button></div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="date" name="" v-model="data.dateInput" id="">
                            </div>
                            <div class="input-group">
                                <input type="time" name="" v-model="data.timeInput" placeholder="02:03 AM" id="">
                            </div>
                            <div class="input-group">
                                <ion-button @click="save()">Save</ion-button>
                            </div>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>

<script>
import { arrowBackOutline } from 'ionicons/icons';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonPage,
    IonItem,
    IonLabel,
    IonSpinner,
    IonIcon,
    IonButton,
    toastController
} from '@ionic/vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { reactive } from 'vue';

export default {
    components: { IonPage, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonSpinner, IonIcon, IonButton },
    setup() {
        const router = useRouter()
        const data = reactive({
            dateInput: '',
            timeInput: '',
        })

        const save = () => {

            // Combine date and time inputs into a single datetime string
            const datetimeString = `${data.dateInput} ${data.timeInput}`;
            
            // Use axios or another HTTP library to send the data to your server
            // Replace 'your-api-endpoint' with your actual API endpoint
            axios.post('https://feeder-backend.onrender.com/add-feeder-schedule', {
                date: datetimeString,
            })
            .then(response => {
                // Handle the response if needed
                presentToast('top')
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
            
        }

        /**
         * 'top' | 'middle' | 'bottom'
         * @param {*} position 
         */
         async function presentToast(position) {
            const toast = await toastController.create({
                message: 'No errors were encountered during the process.',
                duration: 3000,
                position: position,
                color: 'primary',
                header: "Success!",
                animated: true
            })
            setTimeout(() => {
                location.reload()
            }, 3000)
            await toast.present()
            
        }

        return {
            arrowBackOutline,
            router,
            save,
            data
        }
    }
}
</script>

<style>
.configuration-container {
    background-color: #fff;
    padding: 30px 20px;
    border-radius: 30px;
}
.back-btn {
    font-size: 24px;
    display: flex;
    align-items: center;
    background: unset;
    color: #000;
}
.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
.input-group {
    margin: 10px 0;
}
.input-group input {
    width: 300px;
    background-color: #17bab7;
    color: #000;
    border: solid 1px #22d69d;
    border-radius: 5px;
    font-size: 24px;
    padding: 15px;
}
</style>