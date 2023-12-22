<template>
    <ion-page class="flex-direction-unset">
        <ion-grid class="content-max-height">
            <ion-row class="ion-justify-content-start">
                <ion-col size="12">
                    <h1>Notifications</h1>
                </ion-col>
                <ion-col size="12">
                <template v-for="item in activeDataList" :key="item.id">
                    <div class="notification-container">
                    <div>
                        <div class="active-detail">{{ item.message }}</div>
                        <div class="active-detail">{{ item.header }}</div>
                        <div class="active-detail">{{ item.date }}</div>
                        <div class="active-detail">{{ item.time }}</div>
                    </div>
                    </div>
                </template>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-page>
    
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage
} from '@ionic/vue';
import axios from 'axios';

export default defineComponent({
    name: "Notification",
    components: { IonGrid, IonRow, IonCol, IonPage },
    setup () {
        const activeDataList = ref([])

        const loadNotifications = async () => {
            const response = await axios.get('https://feeder-backend.onrender.com/notifications')
            activeDataList.value = response.data
        }

        onMounted(() => {
            loadNotifications()
        })

        return {
            activeDataList
        }
    }
})
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
  background-color: #ebebeb;
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
