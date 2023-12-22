<template>
  <ion-page class="content-bg">
    <ion-grid :fullscreen="true">
      <div class="brand-container">
        <img src="./../FWsLOGO.png" width="140" height="140" alt="">
      </div>
      <div id="container">
        <ion-list class="list-container">
          <ion-item>
            <ion-input class="input-login" placeholder="Enter your username" id="username-id" autofocus=""></ion-input>
          </ion-item>
          <ion-item>
            <ion-input class="input-login" type="password" placeholder="Enter your password" id="password-id"></ion-input>
          </ion-item>
          <ion-button class="login-btn" @click="validateLogin" size="large">Log In</ion-button>
        </ion-list>
      </div>
    </ion-grid>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonInput, IonItem, IonList, IonButton, IonToast, IonGrid, toastController } from '@ionic/vue'
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  components: {IonContent, IonPage, IonInput, IonItem, IonList, IonButton, IonToast, IonGrid},
  setup () {
    const router = useRouter()
    const modelUsername = ref("")
    const modelPassword = ref("")
    const userProfile = reactive({
      username: "",
      password: ""
    })

    const validateLogin = async () => {
      modelUsername.value = document.getElementById("username-id").value
      modelPassword.value = document.getElementById("password-id").value
      if (userProfile.username === modelUsername.value && userProfile.password === modelPassword.value) {
        // Route to dashboard
        router.push({ name: 'Home' })
      } else {
        // toast
        loginError('top')
      }
    }

    /**
     * 'top' | 'middle' | 'bottom'
     * @param {*} position 
     */
      async function loginError(position) {
        const toast = await toastController.create({
            message: 'Username or password is incorrect!',
            duration: 1500,
            position: position,
            color: 'danger',
            header: "Invalid credentials",
            animated: true
        })

        await toast.present()
    }

    const loadUserCredentials = async () => {
      const response = await axios.get('https://feeder-backend.onrender.com/users')

      userProfile.username = response.data[0].username
      userProfile.password = response.data[0].password
    }

    onMounted(async () => {
      await loadUserCredentials()
    })

    return {
      userProfile,
      modelUsername,
      modelPassword,
      validateLogin
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
  margin: 0 20px;
  transform: translateY(-50%);
}
.brand-container {
  display: flex;
  margin-top: 80px;
  justify-content: center;
}
.input-login {
  box-sizing: border-box;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
.content-bg {
  background: rgb(140,140,255);
  background: linear-gradient(317deg, rgba(140,140,255,1) 14%, rgba(0,216,255,1) 85%);
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
.list-container {
  border-radius: 10px;
  padding: 20px;
}
</style>
