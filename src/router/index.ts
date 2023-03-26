import { useUserStore } from '@/stores/user'
import CalendarView from '@/views/CalendarView.vue'
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/calendar/:calenderId',
      name: 'Calendar',
      component: CalendarView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach(async(to, from, next) => {
    const userStore = useUserStore()
    const user = await userStore.autoSignIn()
    if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      next('/login')
    }else{
      next()
    }
})
export default router
