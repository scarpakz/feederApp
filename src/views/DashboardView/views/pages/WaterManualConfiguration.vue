<template>
    <ion-page class="flex-direction-unset">
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12">
                    <h1 class="config-title">Water Manual Settings</h1>
                </ion-col>
                <ion-col size="12">
                    <div class="configuration-container">
                        <div><button class="back-btn" v-if="showBlock || !isCountdown" @click="router.push({name: 'Home'})"><ion-icon :icon="arrowBackOutline"></ion-icon> Back</button></div>
                        <div class="config-countdown">
                            <div v-if="showBlock" class="message">Press block to close the barrier</div>
                            <div v-else>
                                
                            <div class="message" v-if="!isCountdown">
                                Press unblock to open the barrier
                            </div>
                        </div>
                        <div v-if="isCountdown" class="d-flex-center">
                            <ion-spinner color="danger" name="bubbles" class="spinner"></ion-spinner>
                            Countdown {{ countdown }} sec..
                        </div>
                            
                        </div>
                        <div class="config-button">
                            <button class="block-btn" v-if="showBlock && !isBlockerClose" @click="startCountdown('block')">BLOCK</button>
                            <template v-else>
                                <button class="unblock-btn" v-if="!isCountdown" @click="startCountdown('unblock')">UNBLOCK</button>
                            </template>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>

<script>
import {  onMounted, ref } from 'vue';
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
  toastController
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    components: { IonPage, IonRow, IonCol, IonGrid, IonItem, IonLabel, IonSpinner, IonIcon },
    setup() {
        const showBlock = ref(true)
        const isCountdown = ref(false)
        const countdown = ref(9)
        const router = useRouter()
        const isBlockerClose = ref(false)

        const startCountdown = async (command) => {
            if (command == 'block') {
                showBlock.value = false
                isCountdown.value = true
                await axios.post('http://localhost:3000/update-blocker-status', {
                    status: 'close'
                });
                const timer = setInterval(async () => {
                    countdown.value--;
                    if (countdown.value === 0) {
                        isCountdown.value = false
                        clearInterval(timer) // Stop the countdown when it reaches 0
                        await getBlockerStatus()
                        presentToast('top')
                    }
                }, 1000) // Update the countdown every second
            } else {
                showBlock.value = false
                isCountdown.value = true
                const test = await axios.post('http://localhost:3000/update-blocker-status', {
                    status: 'open'
                });
                console.log(test)
                const timer = setInterval(async () => {
                    countdown.value--;
                    if (countdown.value === 0) {
                        isCountdown.value = false
                        clearInterval(timer) // Stop the countdown when it reaches 0
                        showBlock.value = true
                        await getBlockerStatus()
                        presentToast('top')
                    }
                }, 1000) // Update the countdown every second
                
            }
            
            // reset to 9 for countdown
            countdown.value = 9
        }

        /**
         * 'top' | 'middle' | 'bottom'
         * @param {*} position 
         */
         async function presentToast(position) {
            const toast = await toastController.create({
                message: 'No errors were encountered during the process.',
                duration: 5000,
                position: position,
                color: 'primary',
                header: "Success!",
                animated: true
            })

            await toast.present()
        }

        const getBlockerStatus = async () => {
            const response = await axios.get('http://localhost:3000/blocker/status')
            response.data[0].status == 'close' ? isBlockerClose.value = true : isBlockerClose.value = false
        }

        onMounted(async () => {
            // Check the status from the backend if water is open or not
            await getBlockerStatus()
        })

        return {
            showBlock,
            arrowBackOutline,
            isCountdown,
            startCountdown,
            countdown,
            router,
            isBlockerClose
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
.config-countdown {
    display: flex;
    justify-content: center;
    color: #000;
    height: 30vh;
    align-items: center;
}
.config-button {
    display: flex;
    justify-content: center;
}
.block-btn {
    background-color: #EE5252;
    padding: 10px 40px;
    font-weight: 600;
    border-radius: 10px;
    transition: .2s;
    border: solid 1px #EE5252;
}
.block-btn:hover {
    background-color: #fff;
    color:#EE5252;
    border: solid 1px #EE5252;
}
.unblock-btn {
    background-color: #ffffff;
    padding: 10px 40px;
    color: #EE5252;
    font-weight: 600;
    border-radius: 10px;
    transition: .2s;
    border: solid 1px #EE5252;
}
.unblock-btn:hover {
    background-color: #EE5252;
    color: #fff;
}
.back-btn {
    font-size: 24px;
    display: flex;
    align-items: center;
    background: unset;
    color: #000;
}
.message {
    font-weight: bold;
}
.d-flex-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.spinner {
    width: 100px;
    height: 100px;
}
.config-title {
    color: #000;
}
</style>