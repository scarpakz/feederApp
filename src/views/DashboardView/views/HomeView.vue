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
            <div class="statuses">
              <ion-col size="12">
                <div>
                  Blocker Status: <b :class="waterBlockerStatus == 'open' ? 'green' : 'red'">{{ waterBlockerStatus }}</b>
                </div>
              </ion-col>
              <ion-col size="12">
                <div>
                  Feeder Status: <b :class="feederMotorStatus == 'open' ? 'green' : 'red'">{{ feederMotorStatus }}</b>
                </div>
              </ion-col>
            </div>
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
    const waterBlockerStatus = ref('Loading')
    const feederMotorStatus = ref('Loading')

    async function checkDateTime(jsonData) {
    // Loop through each entry in the JSON array
      for (let i = 0; i < jsonData.length; i++) {
        const entry = jsonData[i];
        
        // Parse the date and time strings to create a Date object
        const entryDateTime = new Date(`${entry.date} ${entry.time}`);
        
        // Get the current date and time
        const currentDateTime = new Date();
        
        // Check if the entry's date and time are in the past
        if (entryDateTime < currentDateTime) {
          /** TODO: Create process for this below. */
          // Update the status of the motor
          if (entry.name === "Water Blocker") {
            const blockerStatus = await axios.get('https://feeder-backend.onrender.com/blocker/status')

            if (blockerStatus.data[0].status === "close") {
              await axios.post('https://feeder-backend.onrender.com/update-blocker-status', {status: "open"})
              .then(async () => {
                await axios.post('https://feeder-backend.onrender.com/add/notification', {
                  header: "Water Blocker",
                  message: "The water blocker opened."
                })
                presentToast('top', 'Water Blocker', 'The water blocker opened.')
              })
              .catch(e => e.message)
              .finally(async () => {
                await axios.post('https://feeder-backend.onrender.com/delete-blocker-schedule', { id:entry.id })
              })
            } else {
              await axios.post('https://feeder-backend.onrender.com/update-blocker-status', {status: "close"})
              .then(async () => {
                await axios.post('https://feeder-backend.onrender.com/add/notification', {
                  header: "Water Blocker",
                  message: "The water blocker closed."
                })
                presentToast('top', 'Water Blocker', 'The water blocker closed.')
              })
              .catch(e => e.message)
              .finally(async () => {
                  await axios.post('https://feeder-backend.onrender.com/delete-blocker-schedule', { id: entry.id })
              })
            }

          } else { // Feeder
            const feederStatus = await axios.get('https://feeder-backend.onrender.com/feeder/status')
            if (feederStatus.data[0].status === "close") {
              await axios.post('https://feeder-backend.onrender.com/update-feeder-status', {status: "open"})
              .then(async () => {
                await axios.post('https://feeder-backend.onrender.com/add/notification', {
                  header: "Feeder Tank",
                  message: "The feeder tank opened."
                })
                presentToast('top', 'Feeder Tank', 'The feeder tank opened.')
                .then(async () => {
                  await axios.post('https://feeder-backend.onrender.com/delete-feeder-schedule', { id: entry.id })
                })
              })
            } else {
              await axios.post('https://feeder-backend.onrender.com/update-feeder-status', {status: "close"})
              .then(async () => {
                await axios.post('https://feeder-backend.onrender.com/add/notification', {
                  header: "Feeder Tank",
                  message: "The feeder tank closed."
                })
                presentToast('top', 'Feeder Tank', 'The feeder tank closed.')
                .then(async () => {
                  await axios.post('https://feeder-backend.onrender.com/delete-feeder-schedule', { id: entry.id })
                })
              })
            }
          }
        }
      }
    }

    // Get request here

    // Run the function every second
    setInterval(function() {
      checkDateTime(activeDataList.value);
    }, 10000);


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
        const response = await axios.get('https://feeder-backend.onrender.com/schedules');
        activeDataList.value = response.data
      } catch (e) { return e }
    };

    const deleteSchedule = async (id, type) => {
      if (type == 'Water Blocker') {
        axios.post('https://feeder-backend.onrender.com/delete-blocker-schedule', {
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
        axios.post('https://feeder-backend.onrender.com/delete-feeder-schedule', {
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
    async function presentToast(position, header = "Deleted!", message = "No errors were encountered during the process.") {
      const toast = await toastController.create({
          message: message,
          duration: 3000,
          position: position,
          color: 'primary',
          header: header,
          animated: true
      })
      setTimeout(() => {
          location.reload()
      }, 5000)
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
      const blockerStatus = await axios.get('https://feeder-backend.onrender.com/blocker/status')
      const feederData = await axios.get('https://feeder-backend.onrender.com/feeder/status')
      waterBlockerStatus.value = blockerStatus.data[0].status
      feederMotorStatus.value = feederData.data[0].status
    })

    return {
      currentTime,
      currentDate,
      activeDataList,
      deleteSchedule,
      waterBlockerStatus,
      feederMotorStatus
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
.statuses {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.green {
  color: #4bdb09;
}
.red {
  color: #d50909;
}
</style>