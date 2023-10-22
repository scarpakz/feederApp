<template>
    <ion-page>
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12">
                    <h1>History</h1>
                </ion-col>
                <ion-col size="12">
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage
} from '@ionic/vue';

export default {
    components: { IonGrid, IonRow, IonCol, IonPage },
    setup() {
        return {
            
        }
    }
}
</script>


<style>
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
.notification-container {
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
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