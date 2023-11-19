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
            <ion-col size="12" v-if="activeDataList.length > 0">
              <template v-for="item in activeDataList" :key="item.id">
                <div class="active-schedule-container">
                  <div>
                    <div class="active-detail active-title">{{ item.name }} <button @click="deleteSchedule(item.id, item.name)">Delete</button></div>
                    <div class="active-detail">{{ item.date }}</div>
                    <div class="active-detail">{{ item.time }}</div>
                  </div>
                </div>
              </template>
            </ion-col>
            <ion-col size="12" v-else>
              <div class="active-schedule-container">
                <span>Set a schedule by clicking the + icon below</span>
              </div>
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
  IonPage,
  toastController
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

    const deleteSchedule = async (id, type) => {
      if (type == 'Water Blocker') {
        axios.post('http://localhost:3000/delete-blocker-schedule', {
          id: id,
        })
        .then(async () => {
          // Handle the response if needed
          presentToast('top')
          await loadSchedules()
        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
      } else {
        axios.post('http://localhost:3000/delete-feeder-schedule', {
          id: id,
        })
        .then(async ()=> {
          // Handle the response if needed
          presentToast('top')
          await loadSchedules()
        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
      }
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
          header: "Deleted!",
          animated: true
      })
      setTimeout(() => {
          location.reload()
      }, 3000)
      await toast.present()
        
    }

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
      activeDataList,
      deleteSchedule
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
  display: flex;
  justify-content: space-between;
}
.active-title button {
  background-color: rgb(246, 48, 48);
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 5px;
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