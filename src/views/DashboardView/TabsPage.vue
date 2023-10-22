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
    </ion-page>
</template>   
  
<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonBadge } from '@ionic/vue';
import { homeOutline, notificationsOutline, timerOutline, settingsOutline } from 'ionicons/icons';

export default {
    components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon, IonBadge },
    setup () {
      return {
        notificationsOutline,
        homeOutline,
        timerOutline,
        settingsOutline
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
</style>
  