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
            <ion-badge color="danger">4</ion-badge>
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
import { ref } from 'vue'

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonBadge },
    setup () {
      const rotateRight = ref(false)
      
      const showConfiguration = () => {
        setRotate()
      }

      const setRotate = () => {
        rotateRight.value = !rotateRight.value
      }

      return {
        notificationsOutline,
        homeOutline,
        timerOutline,
        settingsOutline,
        addOutline,
        showConfiguration,
        rotateRight
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

.rotate-45 {
  transform: rotate(45deg);
}
.rotate-0 {
  transform: rotate(0deg);
}
</style>
  