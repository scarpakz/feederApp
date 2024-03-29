<template>
    <ion-page class="content-bg">
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/dashboard/home">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="notification" href="/dashboard/notification">
            <ion-icon :icon="notificationsOutline" />
            <ion-label>Notification</ion-label>
            <ion-badge color="danger">{{ notifLength }}</ion-badge>
          </ion-tab-button>
<!--   
          <ion-tab-button tab="history" href="/history">
            <ion-icon :icon="timerOutline" />
            <ion-label>History</ion-label>
          </ion-tab-button> -->
  
          <ion-tab-button tab="settings" href="/dashboard/settings">
            <ion-icon :icon="settingsOutline" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
      <div class="schedule-overlay" v-if="rotateRight">
        <div class="button-group">
          <button class="main-btn" @click.prevent="showFeeder = !showFeeder">Feeder Tank</button>
          <div class="feeder-content" v-if="showFeeder">
            <button class="feeder-btn" @click="goToFeederManualConfig()">
              Manual
            </button>
            <button class="feeder-btn" @click="goToFeederAutomaticConfig()">
              Automatic
            </button>
          </div>
          <button class="main-btn" @click.prevent="showWater = !showWater">Water Blocker</button>
          <div class="feeder-content" v-if="showWater">
            <button class="feeder-btn" @click="goToWaterManualConfig()">
              Manual
            </button>
            <button class="feeder-btn" @click="goToWaterAutomaticConfig()">
              Automatic
            </button>
          </div>
        </div>
      </div>
      <div class="set-schedule-container">
        <button @click.prevent="showConfiguration" :class="rotateRight ? 'rotate-45' : 'rotate-0' " class="schedule-btn-float">
          <ion-icon :icon="addOutline" />
        </button>
      </div>
    </ion-page>
</template>   
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonBadge } from '@ionic/vue';
import { homeOutline, notificationsOutline, timerOutline, settingsOutline, addOutline } from 'ionicons/icons';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonBadge },
    setup () {
      const rotateRight = ref(false)
      const showFeeder = ref(false)
      const showWater = ref(false)
      const router = useRouter()
      const notifLength = ref(0)
      
      const showConfiguration = () => {
        setRotate()
      }

      const setRotate = () => {
        rotateRight.value = !rotateRight.value
        if (!rotateRight.value) {
          resetFeederConfig()
        }
      }

      const resetFeederConfig = () => {
        showFeeder.value = false
        showWater.value = false
      }

      const resetRotateBtn = () => {
        rotateRight.value = false
      }

      const goToWaterManualConfig = () => {
        // Reset the button to actual state
        resetRotateBtn()
        resetFeederConfig()
        router.push({ name: 'WaterManual' })
      }

      const goToFeederManualConfig = () => {
        // Reset the button to actual state
        resetRotateBtn()
        resetFeederConfig()
        router.push({ name: 'FeederManual' })
      }

      const goToFeederAutomaticConfig = () => {
        // Reset the button to actual state
        resetRotateBtn()
        resetFeederConfig()
        router.push({ name: 'FeederAutomatic' })
      }

      const goToWaterAutomaticConfig = () => {
        // Reset the button to actual state
        resetRotateBtn()
        resetFeederConfig()
        router.push({ name: 'WaterAutomatic' })
      }

      const loadNotifications = async () => {
        const response = await axios.get('https://feeder-backend.onrender.com/notifications')
        notifLength.value = response.data.length
      }

      onMounted(() => {
          loadNotifications()
      })

      return {
        notificationsOutline,
        homeOutline,
        timerOutline,
        settingsOutline,
        addOutline,
        showConfiguration,
        rotateRight,
        showFeeder,
        showWater,
        goToWaterManualConfig,
        goToFeederManualConfig,
        goToFeederAutomaticConfig,
        goToWaterAutomaticConfig,
        notifLength
      }
    }
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.brand-container {
  display: flex;
  margin-top: 80px;
  justify-content: center;
}
.content-bg {
  background: rgb(140,140,255);
  background: linear-gradient(317deg, rgba(140,140,255,1) 14%, rgba(0,216,255,1) 85%);
}
.input-login {
  box-sizing: border-box;
  padding: 0 15px;
  margin: 10px 0;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
.login-btn {
  margin-top: 20px;
  width: 100%;
  padding: 0 10px;
}
.set-schedule-container {
  position: fixed;
  bottom: 100px;
  right: 30px;
}
.schedule-btn-float {
  font-size: 36px;
  background-color: #000;
  border-radius: 100%;
  border: unset;
  padding: 10px 13px;
  box-shadow: -1px 1px 10px 10px #00ff00;
  transition: .2s;
  animation: glowing 1.5s infinite;
}
.rotate-45 {
  transform: rotate(45deg);
}
.rotate-0 {
  transform: rotate(0deg);
}

.schedule-overlay {
  position: absolute;
  background-color: rgba(0,0,0, .8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 40px;
  bottom: 200px;
}
.button-group .main-btn {
  width: 250px;
  font-size: 24px;
  background-color: #CD6161;
  padding: 15px;
  border-radius: 5px 5px 0 0;
  font-weight: bold;
  margin-top: 10px;
  box-shadow: 1px 1px 5px 0px #8c8c8c;
}

.feeder-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.feeder-btn {
  padding: 10px;
  background-color: #EB6363;
  color: #fff;
  font-weight: 600;
}
.feeder-btn:hover {
  background-color: #393939;
}
/**
* Animation Keyframes
*/
@keyframes glowing {
  0% {
    box-shadow: 0 0 10px #00ff00; /* Start with a green glow */
  }
  50% {
    box-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; /* Intensify the glow */
  }
  100% {
    box-shadow: 0 0 10px #00ff00; /* Return to the initial glow */
  }
}
</style>
  