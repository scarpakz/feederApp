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
                    <div class="active-detail active-title">{{ item.id == 1 ? 'Water Blocker' : 'Feeder Tank' }}</div>
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
import { ref, onUnmounted, onMounted } from 'vue';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPage
} from '@ionic/vue';
import axios from 'axios';

export default {
  components: { IonGrid, IonRow, IonCol, IonPage },
  setup() {
    const currentTime = ref('')
    const currentDate = ref('')
    const activeDataList = ref([])

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

    const loadSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/schedules');
        console.log(response)
        activeDataList.value = response.data
      } catch (e) { return e }
    };

    // Update the time and date initially
    updateTimeAndDate()

    // Update the time and date every second
    const intervalId = setInterval(updateTimeAndDate, 1000);

    // Stop the interval when the component is unmounted
    onUnmounted(async () => {
      clearInterval(intervalId)
    });
    
    onMounted(async () => {
      await loadSchedules()
    })

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