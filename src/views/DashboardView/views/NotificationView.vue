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
                        <div class="active-detail" :class="item.status == 'success' ? 'success' : 'error'">{{ item.description }}</div>
                        <div class="active-detail">{{ item.title }}</div>
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
import { defineComponent, ref } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage
} from '@ionic/vue';

export default defineComponent({
    name: "Notification",
    components: { IonGrid, IonRow, IonCol, IonPage },
    setup () {
        const activeDataList = ref([
            {
                title: "Feeder Tank",
                description: "Successfully Set",
                date: "October 10, 2023",
                time: "1:30 PM",
                status: 'success'
            },
            {
                title: "Water Blocker",
                description: "Water successfully closed",
                date: "November 5, 2023",
                time: "9:45 AM",
                status: 'success'
            },
            {
                title: "Water Blocker",
                description: "Barrier successfully opened",
                date: "December 15, 2023",
                time: "4:15 PM",
                status: 'success'
            },
            {
                title: "Feeder Tank",
                description: "Error Feeder Process",
                date: "January 20, 2024",
                time: "7:00 PM",
                status: 'error'
            }
        ])

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
