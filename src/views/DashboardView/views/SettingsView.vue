<template>
    <ion-page>
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12" class="height-90vh d-flex align-center flex-column justify-center">
                    <h1>Settings</h1>
                    <div class="settings-container">
                        <div class="settings-btn-group">
                            <ion-button shape="round" size="large" id="open-modal" expand="block" @click="openModal">Change Password</ion-button>
                            <ion-button shape="round" size="large" color="danger" @click="logoutToast('top')">Log Out</ion-button>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>

<script>
import { ref } from 'vue';
import Modal from './modal/ChangePasswordModal.vue'
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonButton,
  IonContent,
  IonItem,
  IonButtons,
  IonTitle,
  IonModal,
  IonHeader,
  IonToolbar,
  IonInput,
  modalController,
  toastController
} from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
    components: { 
        IonGrid, 
        IonRow, 
        IonCol, 
        IonPage, 
        IonButton,
        IonContent,
        IonItem,
        IonToolbar,
        IonButtons,
        IonTitle,
        IonModal,
        IonHeader,
        IonInput,
        Modal
    },
    setup() {
        const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');
        const router = useRouter()
        const isShowModal = ref(false)

        const openModal = async () => {
            const modal = await modalController.create({
                component: Modal,
            });

            modal.present();

            const { data, role } = await modal.onWillDismiss();

            if (role === 'confirm') {
            message.value = `Hello, ${data}!`;
            }
        }

        /**
         * 'top' | 'middle' | 'bottom'
         * @param {*} position 
         */
         async function logoutToast(position) {
            const toast = await toastController.create({
                message: 'You have been logged out successfully!',
                duration: 1500,
                position: position,
                color: 'danger',
                header: "Logged out",
                animated: true
            })
            router.push({name: 'Login'})
            await toast.present()
            
        }

        return {
            isShowModal,
            openModal,
            logoutToast
        }
    }
}
</script>


<style>
.d-flex {
    display: flex;
}
.justify-center {
    justify-content: center;
}
.align-center {
    align-items: center;
}
.flex-column {
    flex-direction: column;
}
.height-90vh {
    height: 90vh;
}
.settings-btn-group {
    display: flex;
    flex-direction: column;
}
div {
    color: #000;
}
.success {
    font-weight: 600;
    color: #22c933;
}
.error {
    font-weight: 600;
    color: #f83535;
}
.settings-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  margin: 10px 0;
  transition: .2s;
}
.notification-container:hover {
  background-color: #aaedfb;
}
.active-detail {
  padding:5px 0;
}
.content-max-height {
  height: 100vh;
  overflow-y: auto;
}
.flex-direction-unset {
    flex-direction: unset;
}
</style>