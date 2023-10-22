<template>
  <ion-page>
    <ion-grid class="content-max-height">
        <ion-row class="ion-justify-content-start">
            <ion-col size="12">
                <div class="time-container">
                    <h1 class="time-value">{{ currentTime }}</h1>
                    <h5 class="date-value">{{ currentDate }}</h5>
                </div>
            </ion-col>
            <ion-col size="12">
              <template v-for="item in activeDataList" :key="item.id">
                <div class="active-schedule-container">
                  <div>
                    <div class="active-detail active-title">{{ item.title }}</div>
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
import { ref, onUnmounted } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage
} from '@ionic/vue';

export default {
  components: { IonGrid, IonRow, IonCol, IonPage },
  setup() {
    const currentTime = ref('')
    const currentDate = ref('')
    const activeDataList = ref([
      {
          title: "Feeder Tank",
          date: "October 10, 2023",
          time: "1:30 PM",
          status: 'success'
      },
      {
          title: "Water Blocker",
          date: "November 5, 2023",
          time: "9:45 AM",
          status: 'success'
      },
      {
          title: "Water Blocker",
          date: "December 15, 2023",
          time: "4:15 PM",
          status: 'success'
      },
      {
          title: "Feeder Tank",
          date: "January 20, 2024",
          time: "7:00 PM",
          status: 'error'
      }
    ])

    const updateTimeAndDate = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      currentTime.value = timeString;
      currentDate.value = dateString;
    }

    // Update the time and date initially
    updateTimeAndDate()

    // Update the time and date every second
    const intervalId = setInterval(updateTimeAndDate, 1000);

    // Stop the interval when the component is unmounted
    onUnmounted(() => {
      clearInterval(intervalId)
    });

    return {
      currentTime,
      currentDate,
      activeDataList
    };
  },
};
</script>

<style>
div {
    color: #000;
}
.time-container {
    text-align: center;
}
.time-value {
    font-size: 48px;
}
.active-title {
  font-weight: 600;
}
.active-schedule-container {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  cursor: pointer;
  transition: .2s;
  box-shadow: -2px 2px 5px #565656;
}
.active-schedule-container:hover {
  background-color: #ebebeb;
}
.active-detail {
  padding:5px 0;
}
.content-max-height {
  height: 100vh;
  overflow-y: auto;
}
</style>