import { createRouter, createWebHistory } from '@ionic/vue-router'
import LoginPage from '../views/LoginPage.vue'
import TabsPage from '../views/DashboardView/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: TabsPage,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/DashboardView/views/HomeView.vue')
      },
      {
        path: 'notification',
        name: 'Notification',
        component: () => import('../views/DashboardView/views/NotificationView.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/DashboardView/views/SettingsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
