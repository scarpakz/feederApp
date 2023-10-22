<template>
    <ion-page>
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12" class="height-90vh d-flex align-center flex-column justify-center">
                    <h1>Settings</h1>
                    <div class="settings-container">
                        <div class="settings-btn-group">
                            <ion-button shape="round" size="large" id="open-modal" expand="block">Change Password</ion-button>
                            <ion-button shape="round" size="large" color="danger" href="/login">Log Out</ion-button>
                        </div>
                    </div>
                </ion-col>
            </ion-row>
            <ion-modal v-if="isShowModal" ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                <ion-header>
                    <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="cancel()">Cancel</ion-button>
                    </ion-buttons>
                    <ion-title style="text-align: center;">Change Password</ion-title>
                    <ion-buttons slot="end">
                        <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
                    </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-item>
                        <ion-input
                            label="New Password"
                            label-placement="stacked"
                            ref="input"
                            type="text"
                            placeholder="Enter your new password"
                        ></ion-input>
                    </ion-item>
                    <ion-button class="d-flex justify-center" style="margin-top: 20px;">Save</ion-button>
                </ion-content>
            </ion-modal>
        </ion-grid>
    </ion-page>
</template>

<script>
import { ref } from 'vue';
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
  IonToolbar
} from '@ionic/vue';

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
        IonHeader
    },
    setup() {
        const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

        const modal = ref();
        const input = ref();
        const isShowModal = ref(false)

        const cancel = () => modal.dismiss(null, 'cancel');

        const confirm = () => {
            isShowModal.value = false
        };

        const onWillDismiss = (ev) => {
            if (ev.detail.role === 'confirm') {
            message.value = `Hello, ${ev.detail.data}!`;
            }
        };

        return {
            cancel,
            confirm,
            onWillDismiss    
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